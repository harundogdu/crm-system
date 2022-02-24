import { MDBDataTableV5 } from 'mdbreact';
import React from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { Content, Loading } from "../../components";
import { AuthService } from '../../services/AuthService';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CgDetailsMore} from 'react-icons/cg'

function Customers() {
    const MySwal = withReactContent(Swal)
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [customers, setCustomers] = React.useState([]);
    const columns = [
        {
            label: 'Name',
            field: 'name',
            width: 150,
        },
        {
            label: 'Email',
            field: 'email',
            width: 150,
        },
        {
            label: 'Phone',
            field: 'phone',
            width: 150,
        },
        {
            label: 'Address',
            field: 'address',
            width: 150
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
        }
    ];
    const rows = customers.map(customer => {
        return {
            'name': customer.name,
            'email': customer.email,
            'phone': customer.phone,
            'address': customer.address,
            'created_at': customer.created_at,
            delete: <button onClick={() => deleteCustomer(customer.id)}><AiOutlineDelete /></button>,
            detail: <NavLink to={`/customers/${customer.id}`}><CgDetailsMore className="mx-auto" /></NavLink>
        }
    });

    const deleteCustomer = async (id) => {
        const status = await MySwal.fire({
            title: <strong>Are you sure you want to delete this customer?</strong>,
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            cancelButtonText: 'No, keep it',
            html:
                '<p>You won\'t be able to revert this!</p>',
            icon: 'warning',
        })

        status.isConfirmed &&
            AuthService.delete(`/api/v1/customers/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    if (response.data.success) {
                        setCustomers(customers.filter(customers => customers.id !== id));
                        MySwal.fire({
                            title: <strong>Customer was deleted successfully!</strong>,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        navigate('/customers');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
    }

    React.useEffect(() => {
        const fetchCustomers = async () => {
            const response = await AuthService.get('/api/v1/customers', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCustomers(response.data.data);
            setIsLoading(false);
        }
        fetchCustomers();
        return () => {
            setCustomers([]);
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <Helmet>
                <title>CRM - Customers Menagement</title>
            </Helmet>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg mb-2">Customers List</h1>
                <NavLink to="/customers/create" className="btn bg-orange-400 flex text-white items-center justify-center px-4">
                    <AiOutlinePlus /><span>Add Customer</span>
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

export default Customers;
