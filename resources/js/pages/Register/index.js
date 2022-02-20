import {Link, NavLink} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth} from "../../features/Authentication/AuthContext";
import RegisterImage from "../../assets/images/register.png";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required().min(6),
    password: yup.string().required().min(8),
    password_confirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
});

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid, touchedFields}
    } = useForm({
        resolver: yupResolver(schema)
    });
    const {register: RegisterSubmit} = useAuth();

    return (
        <div className="flex justify-center align-items-center h-screen bg-gray-100">
            <div className="row p-4 rounded-lg shadow-lg bg-white col-md-8 w-[500px]">
                <div className="flex flex-col items-center justify-evenly">
                    <img className="h-60" src={RegisterImage} alt="Login Image"/>
                    <h1 className="h3 text-orange-400">Welcome to Register Page</h1>
                </div>

                <form onSubmit={handleSubmit(RegisterSubmit)}>

                    <div className="form-group my-3">
                        <label htmlFor="name" className="form-label">Name*</label>
                        <input
                            type="name"
                            className="form-control"
                            id="name"
                            placeholder="example@example.com"
                            name="name"
                            {...register('name')}
                        />
                        {errors.name &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.name?.message}
                            </div>
                        }
                    </div>

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

                    <div className="form-group my-3">
                        <label htmlFor="password_confirmation" className="form-label">Password Confirmation*</label>
                        <input
                            type="password"
                            className="form-control "
                            id="password_confirmation"
                            placeholder="enter ur password again..."
                            name="password_confirmation"
                            {...register('password_confirmation')}
                        />
                        {errors.password_confirmation &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.password_confirmation?.message}
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-between">
                        <p> did not have an account?
                            <NavLink to="/login" className="text-orange-400"> Login</NavLink>
                        </p>
                        <button
                            disabled={(!touchedFields.email && !touchedFields.password && !touchedFields.password_confirmation && !touchedFields.name && !isValid)}
                            type={'submit'}
                            className="btn bg-orange-400 text-white font-bold my-2 px-4 py-2"
                        >
                            Register
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
