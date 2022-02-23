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
    NotFoundPage,
    ProductCreate,
    ProductUpdate,
    CategoryCreate,
    CategoryUpdate,
    AccountCreate,
    AccountUpdate
} from "./pages";
import { RequireAuth } from "./features/Authentication/RequireAuth";
import { AuthStatus } from "./features/Authentication/AuthStatus";
import { Footer, Navbar } from "./components";
import { useAuth } from "./features/Authentication/AuthContext";

const Main = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="flex flex-1 flex-col h-full">
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/" element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />

                {/*Products*/}
                <Route path="/products" element={
                    <RequireAuth>
                        <Products />
                    </RequireAuth>
                } />
                <Route path="/products/create" element={
                    <RequireAuth>
                        <ProductCreate />
                    </RequireAuth>
                } />
                <Route path="/products/:id" element={
                    <RequireAuth>
                        <ProductUpdate />
                    </RequireAuth>
                } />

                {/*Categories*/}
                <Route path="/categories" element={
                    <RequireAuth>
                        <Categories />
                    </RequireAuth>
                } />
                <Route path="/categories/create" element={
                    <RequireAuth>
                        <CategoryCreate />
                    </RequireAuth>
                } />
                <Route path="/categories/:id" element={
                    <RequireAuth>
                        <CategoryUpdate />
                    </RequireAuth>
                } />

                {/*Accounts*/}
                <Route path="/accounts" element={
                    <RequireAuth>
                        <Accounts />
                    </RequireAuth>
                } />
                <Route path="/accounts/create" element={
                    <RequireAuth>
                        <AccountCreate />
                    </RequireAuth>
                } />
                <Route path="/accounts/:id" element={
                    <RequireAuth>
                        <AccountUpdate />
                    </RequireAuth>
                } />

                {/*Stocks*/}
                <Route path="/stocks" element={
                    <RequireAuth>
                        <Stocks />
                    </RequireAuth>
                } />

                {/*Authentication*/}
                <Route path="/login" element={
                    <AuthStatus>
                        <Login />
                    </AuthStatus>
                } />
                <Route path="/register" element={
                    <AuthStatus>
                        <Register />
                    </AuthStatus>
                } />
                {/*NotFoundPage*/}
                <Route path="*" element={
                    <NotFoundPage />
                } />
            </Routes>
            {isAuthenticated && <Footer />}
        </div>
    )
        ;
}
export default Main;
