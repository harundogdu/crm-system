import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        setIsAuthLoading(true)
        if (!localStorage.getItem('token')) {
            setIsAuthLoading(false)
            return;
        }
        setIsAuthenticated(true)
        getUser().then(r => setUser(r.data)).then(() => setIsAuthLoading(false))
    }, [])

    const login = async (user) => {
        const response = await AuthService.post('/api/v1/auth/login', user);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.user.access_token);
            setIsAuthenticated(true);
            setUser(response.data.user);
            navigate('/');
        }
    }

    const register = async (data) => {
        const response = await AuthService.post('/api/v1/auth/register', data);
        if (response.status === 201) {
            localStorage.setItem('token', response.data.user.access_token);
            setIsAuthenticated(true);
            setUser(response.data.user);
            navigate('/');
        }
    }

    const getUser = async () => {
        try {
            return await AuthService.post('/api/v1/auth/user', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {
        await AuthService.post('/api/v1/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setIsAuthenticated(false)
        setUser({})
        localStorage.removeItem('token');
        navigate('/login')
    }

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        register,
        setIsAuthenticated,
        setUser,
        isAuthLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)


