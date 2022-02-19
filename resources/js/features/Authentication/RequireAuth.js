import {useAuth} from "./AuthContext";
import {Navigate} from "react-router-dom";

export function RequireAuth({children}) {
    let {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }
    return children;
}
