import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { Content, Loading } from '../../components';
import { AuthService } from '../../services/AuthService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
});

function Update() {
    let navigate = useNavigate();
    let { id } = useParams();
    const MySwal = withReactContent(Swal)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [currentCategory, setCurrentCategory] = React.useState({});
    const [generalErrors, setGeneralErrors] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const createCategory = async (data) => {
        try {
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('_method', 'PUT');

            const response = await AuthService.post(`/api/v1/categories/${id}`, formData, {
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
                navigate('/categories');
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
        const fecthCategory = async () => {
            try {
                const response = await AuthService.get(`/api/v1/categories/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if (response.data.success) {
                    setCurrentCategory(response.data.data);
                }
            } catch (error) {
                const errors = error.response.data.errors;
                var array = [];
                var keys = Object.keys(errors);
                keys.forEach(function (key) {
                    array.push(errors[key]);
                });
                setGeneralErrors(array);
            } finally {
                setIsLoading(false);
            }
        }
        fecthCategory();
        return () => {
            setCurrentCategory({});
        }
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <h1 className="h3">Add Product</h1>
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
                    onSubmit={handleSubmit(createCategory)}
                    className="col-md-8 mx-auto"
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control"
                                    {...register('name')}
                                    defaultValue={currentCategory.name}
                                />
                                {errors.name &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.name?.message}
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
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </Content>
    );
}

export default Update;