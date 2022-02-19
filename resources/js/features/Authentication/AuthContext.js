import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [user, setUser] = useState({})

    const login = (user) => {
        setIsAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser({})
    }

    const value = {
        isAuthenticated,
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)


