import {useAuth} from "../../features/Authentication/AuthContext";
import {Navbar, Content, Footer} from "../../components";

export default function Home() {
    const {logout, user, isAuthLoading} = useAuth();

    if (isAuthLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="flex flex-col flex-1 min-h-fit h-full">
            <Navbar/>
            <Content>
                <h1>Home</h1>
                <p>Welcome {user.name}</p>
                <button onClick={logout}>Logout</button>
            </Content>
            <Footer/>
        </div>
    );
}
