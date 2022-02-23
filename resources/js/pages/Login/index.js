import { NavLink, useNavigate } from "react-router-dom";
import LoginImage from '../../assets/images/login.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../features/Authentication/AuthContext";
import { Helmet } from "react-helmet";


/**
 * @class Login
 * @extends {Component}
 * Schema for login form
 */

const schema = yup.object().shape({
    email: yup.string().email().required().min(6),
    password: yup.string().required().min(8)
});

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const { login } = useAuth();

    return (
        <div className="flex justify-center align-items-center h-screen bg-gray-100">
            <Helmet>
                <meta charSet="utf-8" />
                <title>CRM - Login</title>
            </Helmet>
            <div className="row p-4 rounded-lg shadow-lg bg-white col-md-8 w-[500px]">
                <div className="flex flex-col items-center justify-evenly">
                    <img className="h-60" src={LoginImage} alt="Login Image" />
                    <h1 className="h3 text-orange-400">Welcome to Login Page</h1>
                </div>

                <form onSubmit={handleSubmit(login)}>

                    <div className="form-group my-3">
                        <label htmlFor="email" className="form-label">E-Mail*</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="example@example.com"
                            name="email"
                            {...register('email')}
                        />
                        {errors.email &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.email?.message}
                            </div>
                        }
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="password" className="form-label">Password*</label>
                        <input
                            type="password"
                            className="form-control "
                            id="password"
                            placeholder="enter ur password..."
                            name="password"
                            {...register('password')}
                        />
                        {errors.password &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.password?.message}
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-between">
                        <p> did not have an account?
                            <NavLink to="/register" className="text-orange-400"> Register</NavLink>
                        </p>
                        <button
                            disabled={(!touchedFields.email && !touchedFields.password && !isValid)}
                            type={'submit'}
                            className="btn bg-orange-400 text-white font-bold my-2 px-4 py-2"
                        >
                            Login
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
