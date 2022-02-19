import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>This is the Home page</p>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}
