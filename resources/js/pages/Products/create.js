import React, { useState } from 'react';
import { Content } from "../../components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().nullable(),
    barcode: yup.string().nullable(),
    brand: yup.string().nullable(),
    modelCode: yup.string().nullable(),
    category_id: yup.string().required('Category is required'),
    buyingPrice: yup.number().nullable().min(0, 'Buying price must be greater than 0'),
    sellingPrice: yup.number().nullable().min(0, 'Selling price must be greater than 0'),
    taxPrice: yup.number().nullable().min(0, 'Tax price must be greater than 0'),
    quantity: yup.number().nullable().min(0, 'Quantity must be greater than 0'),
    discount: yup.number().nullable().min(0, 'Discount must be greater than 0'),
});

function Create() {
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const MySwal = withReactContent(Swal)
    const [image, setImage] = React.useState(null);
    const [categories, setCategories] = React.useState([]);
    const [generalErrors, setGeneralErrors] = React.useState([]);

    const createProduct = async (data) => {
        try {
            let formData = new FormData();
            if (image) {
                formData.append('image', image[0]);
            }

            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('barcode', data.barcode);
            formData.append('brand', data.brand);
            formData.append('modelCode', data.modelCode);
            formData.append('category_id', data.category_id);
            formData.append('buyingPrice', data.buyingPrice);
            formData.append('sellingPrice', data.sellingPrice);
            formData.append('taxPrice', data.taxPrice);
            formData.append('quantity', data.quantity);
            formData.append('discount', data.discount);


            const response = await AuthService.post('/api/v1/products', formData, {
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
                navigate('/products');
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
        const getCategories = async () => {
            try {
                const response = await AuthService.get('/api/v1/categories', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if (response.data.success) {
                    setCategories(response.data.data);
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
        }
        getCategories();
        return () => {
            setCategories([]);
        }
    }, [])

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
                    onSubmit={handleSubmit(createProduct)}
                    className="col-md-8 mx-auto"
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" onChange={e => setImage(e.target.files)} className="form-control" accept='image/*' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name" />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    {...register('name')}
                                />
                                {errors.name &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.name?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="modelCode" />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="modelCode"
                                    placeholder="modelCode"
                                    {...register('modelCode')}
                                />
                                {errors.modelCode &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.modelCode?.message}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="barcode" />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="barcode"
                                    placeholder="barcode"
                                    {...register('barcode')}
                                />
                                {errors.barcode &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.barcode?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="brand" />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    placeholder="brand"
                                    {...register('brand')}
                                />
                                {errors.brand &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.brand?.message}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id" />
                        <select className="form-control" id="category_id"
                            {...register('category_id')}
                            defaultValue={0}
                        >
                            <option value={0} disabled>Select Category</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        {errors.category_id &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.category_id?.message}
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" />
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            placeholder="Description"
                            {...register('description')}
                        />
                        {errors.description &&
                            <div className="invalid-feedback flex capitalize">
                                {errors.description?.message}
                            </div>
                        }
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="buyingPrice">Buying Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="buyingPrice"
                                    placeholder="buyingPrice"
                                    {...register('buyingPrice')}
                                    defaultValue={0}
                                />
                                {errors.buyingPrice &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.buyingPrice?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="sellingPrice">Selling Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="sellingPrice"
                                    placeholder="sellingPrice"
                                    {...register('sellingPrice')}
                                    defaultValue={0}
                                />
                                {errors.sellingPrice &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.sellingPrice?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="taxPrice">Tax Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="taxPrice"
                                    placeholder="taxPrice"
                                    {...register('taxPrice')}
                                    defaultValue={0}
                                />
                                {errors.taxPrice &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.taxPrice?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="discount">Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="discount"
                                    placeholder="discount"
                                    {...register('discount')}
                                    defaultValue={0}
                                />
                                {errors.discount &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.discount?.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    placeholder="quantity"
                                    {...register('quantity')}
                                    defaultValue={0}
                                />
                                {errors.quantity &&
                                    <div className="invalid-feedback flex capitalize">
                                        {errors.quantity?.message}
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
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </Content>
    );
}

export default Create;
