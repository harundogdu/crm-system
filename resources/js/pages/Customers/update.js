import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { Content, Loading } from '../../components';
import { AuthService } from '../../services/AuthService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CKEditor } from 'ckeditor4-react';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    phone: yup.string().required('Phone is required'),
});

function Create() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema)
    });
    let navigate = useNavigate();
    let { id } = useParams();
    const MySwal = withReactContent(Swal)
    const [customer, setCustomer] = React.useState({});
    const [editor, setEditor] = React.useState('');
    const [generalErrors, setGeneralErrors] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const updateCustomer = async (data) => {
        try {
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', editor);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('_method', 'PUT');

            const response = await AuthService.post(`/api/v1/customers/${id}`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data',
                }
            });
            if (response.data.success) {
                await MySwal.fire({
                    title: <strong>{response.data.message}</strong>,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate('/customers');
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
        const fetchCustomer = async () => {
            const response = await AuthService.get(`/api/v1/customers/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            if (response.data.success) {
                setCustomer(response.data.data);
                setEditor(response.data.data.address);
                setIsLoading(false);
            }
        }
        fetchCustomer();
        return () => {
            setCustomer({});
        }
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <h1 className="h3">Update Customer</h1>
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
                    onSubmit={handleSubmit(updateCustomer)}
                    className="col-md-8 mx-auto"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control"
                                    {...register('name')}
                                    defaultValue={customer.name}
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
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" maxLength={10} max={10} name="phone" className="form-control"
                                    {...register('phone')}
                                    defaultValue={customer.phone}
                                />
                                {errors.phone &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.phone?.message}
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" className="form-control"
                                    {...register('email')}
                                    defaultValue={customer.email}
                                />
                                {errors.email &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.email?.message}
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='col-md-12'>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <CKEditor
                                    data={editor}
                                    onChange={(e) => setEditor(e.editor.getData())}
                                    name="address"
                                    className="form-control"
                                    initData={editor}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-end mt-2">
                        <button
                            type="submit"
                            className="btn bg-orange-400 mt-2 text-white w-full"
                        >
                            Update Customer
                        </button>
                    </div>
                </form>
            </div>
        </Content>
    );
}

export default Create;