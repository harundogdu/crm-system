import { NavLink } from "react-router-dom";
import { Content, Footer, Navbar } from "../../components";
import { Helmet } from "react-helmet";
export default function NotFoundPage() {
    return (
        <Content>
            <Helmet>
                <title>CRM - Not Found!</title>
            </Helmet>
            <div className="flex items-center justify-center h-full flex-col">
                <h1 className="display-1">404</h1>
                <p className="display-2">Page not found</p>
                <NavLink to="/" className="h3 text-orange-400 mt-4">Go to home page</NavLink>
            </div>
        </Content>
    )
}
