import React, { useEffect } from 'react';
import { Content, Loading } from "../../components";
import { AuthService } from "../../services/AuthService";
import { MDBDataTableV5 } from 'mdbreact';
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { CgDetailsMore } from 'react-icons/cg';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Products() {
    const MySwal = withReactContent(Swal)
    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const columns = [

        {
            label: 'Name',
            field: 'name',
            width: 150,
        },
        {
            label: 'Category',
            field: 'category',
            width: 270,
        },
        {
            label: 'Barcode',
            field: 'barcode',
            width: 200,
        },
        {
            label: 'Model Code',
            field: 'modelCode',
            width: 200,
        },
        {
            label: 'Brand',
            field: 'brand',
            width: 200,
        },
        {
            label: 'Selling Price',
            field: 'sellingPrice',
            width: 200,
        },
        {
            label: 'Buying Price',
            field: 'buyingPrice',
            sort: 'asc',
            width: 100,
        },
        {
            label: 'Quantity',
            field: 'quantity',
            width: 150,
        },
        {
            label: 'Created At',
            field: 'created_at',
            sortable: 'true',
            sortFunction: (a, b, orderBy) => {
                if (orderBy === 'asc') {
                    return new Date(a.created_at) - new Date(b.created_at);
                }
                return new Date(b.created_at) - new Date(a.created_at);
            },
            width: 100,
        },
        {
            label: 'Delete',
            field: 'delete',
            sort: 'disabled',
            width: 100,
        }, 
        {
            label: 'Detail',
            field: 'detail',
            sort: 'disabled',
        }

    ]
    const rows = products.map(product => {
        return {
            name: product.name,
            category: product.category.name,
            barcode: product.barcode,
            modelCode: product.modelCode,
            brand: product.brand,
            sellingPrice: product.sellingPrice,
            buyingPrice: product.buyingPrice,
            quantity: product.quantity,
            created_at: product.created_at,
            delete: <button onClick={() => deleteProduct(product.id)}><AiOutlineDelete /></button>,
            detail: <NavLink to={`/products/${product.id}`}><CgDetailsMore className="mx-auto" /></NavLink>
        }
    });

    const deleteProduct = async (id) => {
        try {
            const status = await MySwal.fire({
                title: <strong>Are you sure you want to delete this product?</strong>,
                confirmButtonText: 'Yes, delete it!',
                showCancelButton: true,
                cancelButtonText: 'No, keep it',
                html:
                    '<p>You won\'t be able to revert this!</p>',
                icon: 'warning',
            })

            if (status.isConfirmed) {
                const response = await AuthService.delete(`/api/v1/products/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setProducts(products.filter(product => product.id !== id));
                    await MySwal.fire({
                        title: <strong>Product was deleted successfully!</strong>,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            }
        } catch (error) {
            await MySwal.fire({
                title: <strong>{error.response.data.message}</strong>,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }

    useEffect(() => {
        const getProducts = async () => {
            const response = await AuthService.get('/api/v1/products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.data;
        };
        getProducts().then(r =>
            setProducts(r)
        ).catch(e => {
            console.log(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);


    if (isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <Helmet>
                <title>CRM - Product Menagement</title>
            </Helmet>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg mb-2">Products List</h1>
                <NavLink to="/products/create" className="btn bg-orange-400 flex text-white items-center justify-center px-4">
                    <AiOutlinePlus /><span>Add Product</span>
                </NavLink>
            </div>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
                entries={10}
                pagesAmount={4}
                data={{ columns, rows }}
                fullPagination
                responsive
                striped
                bordered
                small
                className="text-center"
            />
        </Content>
    );
}

export default Products;
