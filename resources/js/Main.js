import {
    Route,
    Routes
} from "react-router-dom";

/* Pages */
import {
    Home,
    Login,
    Register,
    Products,
    Categories,
    Accounts,
    Stocks,
    NotFoundPage
} from "./pages";
import {RequireAuth} from "./features/Authentication/RequireAuth";
import {AuthStatus} from "./features/Authentication/AuthStatus";
import {Footer, Navbar} from "./components";
import {useAuth} from "./features/Authentication/AuthContext";

const Main = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className="flex flex-1 flex-col h-full">
            {isAuthenticated && <Navbar/>}
            <Routes>
                <Route path="/" element={
                    <RequireAuth>
                        <Home/>
                    </RequireAuth>
                }/>
                <Route path="/products" element={
                    <RequireAuth>
                        <Products/>
                    </RequireAuth>
                }/>
                <Route path="/categories" element={
                    <RequireAuth>
                        <Categories/>
                    </RequireAuth>
                }/>
                <Route path="/accounts" element={
                    <RequireAuth>
                        <Accounts/>
                    </RequireAuth>
                }/>
                <Route path="/stocks" element={
                    <RequireAuth>
                        <Stocks/>
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
            {isAuthenticated && <Footer/>}
        </div>
    )
        ;
}
export default Main;
