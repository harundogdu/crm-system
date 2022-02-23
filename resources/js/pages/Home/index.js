import { Helmet } from "react-helmet";
import { useAuth } from "../../features/Authentication/AuthContext";
import { Navbar, Content, Footer, Loading } from "../../components";

export default function Home() {
    const { logout, user, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <Loading />
    }
    return (
        <Content>
            <Helmet>
                <title>CRM - Home</title>
            </Helmet>
            <h1>Home</h1>
            <p>Welcome {user.name}</p>
            <button onClick={logout}>Logout</button>
        </Content>
    );
}
