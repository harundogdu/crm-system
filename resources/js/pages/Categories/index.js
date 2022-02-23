import { MDBDataTableV5 } from 'mdbreact';
import React from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { Content, Loading } from "../../components";
import { AuthService } from '../../services/AuthService';

function Categories() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const columns = [
        {
            label: 'Name',
            field: 'name',
            width: 150,
        },
        {
            label: 'Product Count',
            field: 'productCount',
            width: 270,
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
            }
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
    ];
    const rows = categories.map(category => {
        return {
            'name': category.name,
            'productCount': category.products_count,
            'created_at': category.created_at,
            delete: <button onClick={() => deleteCategory(category.id)}><AiOutlineDelete /></button>,
            detail: <NavLink to={`/categories/${category.id}`}><CgDetailsMore className="mx-auto" /></NavLink>
        }
    });

    const deleteCategory = (id) => {
        window.confirm('Are you sure you want to delete this category?') &&
        AuthService.delete(`/api/v1/categories/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                if (response.data.success) {
                    setCategories(categories.filter(category => category.id !== id));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        const fetchCategories = async () => {
            const response = await AuthService.get('/api/v1/categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCategories(response.data.data);
            setIsLoading(false);
        }
        fetchCategories();
        return () => {
            setCategories([]);
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg mb-2">Category List</h1>
                <NavLink to="/categories/create" className="btn bg-orange-400 flex text-white items-center justify-center px-4">
                    <AiOutlinePlus /><span>Add Category</span>
                </NavLink>
            </div>
            <MDBDataTableV5
                hover
                entriesOptions={[20, 25, 30, 35, 40, 45, 50]}
                entries={30}
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

export default Categories;
