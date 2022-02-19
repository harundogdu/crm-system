import {
    Route,
    Routes
} from "react-router-dom";

/* Pages */
import {
    Home,
    Login,
    Register,
    NotFoundPage
} from "./pages";
import {Layout} from "./components";
import {RequireAuth} from "./features/Authentication/RequireAuth";
import {AuthStatus} from "./features/Authentication/AuthStatus";

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <RequireAuth>
                        <Home/>
                    </RequireAuth>
                }/>
                <Route path="/login" element={
                    <AuthStatus>
                        <Login/>
                    </AuthStatus>
                }/>
                <Route path="/register" element={
                    <AuthStatus>
                        <Register/>
                    </AuthStatus>

                }/>
                <Route path="*" element={
                    <NotFoundPage/>
                }/>
            </Routes>
        </div>
    )
        ;
}
export default Main;
