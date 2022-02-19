import {Link} from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <p>This is the Register page</p>
            <Link to="/login">Go to Login</Link>
        </div>
    );
}
