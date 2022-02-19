import {useAuth} from "./AuthContext";
import { Navigate} from "react-router-dom";

export function AuthStatus({children}) {
    let {isAuthenticated} = useAuth();
    const pathArray = ['/login', '/register'];
    const path = location.pathname;

    if (isAuthenticated && pathArray.includes(path)) {
        return <Navigate to="/"/>
    }

    return children;
}
