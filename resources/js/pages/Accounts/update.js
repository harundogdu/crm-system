import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { Content } from '../../components';
import { AuthService } from '../../services/AuthService';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
});

function Update() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields }
    } = useForm({
        resolver: yupResolver(schema)
    });
    let navigate = useNavigate();
    let { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentAccount, setCurrentAccount] = React.useState({});
    const [generalErrors, setGeneralErrors] = React.useState([]);

    const updateAccount = async (data) => {
        try {
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('_method', 'PUT');

            const response = await AuthService.post('/api/v1/accounts', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data',
                }
            });
            if (response.data.success) {
                navigate('/accounts');
                return;
            }
        } catch (error) {
            const errors = error.response.data.errors;
            var array = [];
            var keys = Object.keys(errors);
            keys.forEach(function (key) {
                array.push(errors[key]);
            });
            setGeneralErrors(array);
        }
    };

    React.useEffect(() => {
        const fetchAccount = async () => {
            const response = await AuthService.get(`/api/v1/accounts/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setCurrentAccount(response.data.data);
            setIsLoading(false);
        }
        fetchAccount();
        return () => {
            setCurrentAccount({});
        }
    }, []);

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <Content>
            <h1 className="h3">Add Account</h1>
            <div className="row">
                <div className="col-md-8 mx-auto text-center">
                    {
                        generalErrors.length > 0 &&
                        (
                            <div className="alert alert-danger">
                                <ul>
                                    {generalErrors.map((error, index) => {
                                        return (
                                            <li key={index}>{error}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <form
                    onSubmit={handleSubmit(updateAccount)}
                    className="col-md-8 mx-auto"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control"
                                    {...register('name')}
                                    defaultValue={currentAccount.name}
                                />
                                {errors.name &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.name?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col-md-6'>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" className="form-control"
                                    {...register('email')}
                                    defaultValue={currentAccount.email}
                                />
                                {errors.email &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.email?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Password</label>
                                <input type="password" name="password" className="form-control"
                                    {...register('password')}
                                />
                                {errors.password &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.password?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Password Again</label>
                                <input type="password" name="password_confirmation" className="form-control"
                                    {...register('password_confirmation')} />
                                {errors.password_confirmation &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.password_confirmation?.message}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                        <button
                            type="submit"
                            className="btn bg-orange-400 mt-2 text-white w-full"
                        >
                            Add Account
                        </button>
                    </div>
                </form>
            </div>
        </Content>
    );
}

export default Update;