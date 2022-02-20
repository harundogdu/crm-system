import {useAuth} from "../../features/Authentication/AuthContext";
import {Navbar, Content, Footer} from "../../components";

export default function Home() {
    const {logout, user, isAuthLoading} = useAuth();

    if (isAuthLoading) {
        return <div>Loading...</div>
    }
    return (
        <Content>
            <h1>Home</h1>
            <p>Welcome {user.name}</p>
            <button onClick={logout}>Logout</button>
        </Content>
    );
}
