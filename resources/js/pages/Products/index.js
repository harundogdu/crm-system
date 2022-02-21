import React, { useEffect } from 'react';
import { Content } from "../../components";
import { AuthService } from "../../services/AuthService";
import { MDBDataTableV5 } from 'mdbreact';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { CgDetailsMore } from 'react-icons/cg';

function Products() {
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
            sort: 'asc',
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
            width: 100,

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
            if (window.confirm('Are you sure you want to delete this product?')) {
                const response = await AuthService.delete(`/api/v1/products/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    alert('Product Deleted Successfully');
                    setProducts(products.filter(product => product.id !== id));
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setIsLoading(true);
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
        return <div>Loading...</div>
    }

    return (
        <Content>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg mb-2">Products List</h1>
                <NavLink to="/products/create" className="btn bg-orange-400 flex text-white items-center justify-center px-4">
                    <AiOutlinePlus /><span>Add Product</span>
                </NavLink>
            </div>
            <MDBDataTableV5
                hover
                entriesOptions={[20, 25, 30, 35, 40, 45, 50]}
                entries={25}
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
