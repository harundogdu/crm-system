import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <p>This is the Login page</p>
            <Link to="/register">Register</Link>
        </div>
    );
}
