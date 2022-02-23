import { MDBDataTableV5 } from 'mdbreact';
import React from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { Content } from "../../components";
import { AuthService } from '../../services/AuthService';

function Accounts() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [accounts, setAccounts] = React.useState([]);
    const columns = [
        {
            label: 'Name',
            field: 'name',
            width: 150,
        },
        {
            label: 'Category Count',
            field: 'categoryCount',
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
    const rows = accounts.map(account => {
        return {
            'name': account.name,
            'categoryCount': account.categories_count,
            'created_at': account.created_at,
            delete: <button onClick={() => deleteAccount(account.id)}><AiOutlineDelete /></button>,
            detail: <NavLink to={`/accounts/${account.id}`}><CgDetailsMore className="mx-auto" /></NavLink>
        }
    });

    const deleteAccount = (id) => {
        window.confirm('Are you sure you want to delete this account?') &&
        AuthService.delete(`/api/v1/accounts/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                if (response.data.success) {
                    setAccounts(accounts.filter(account => account.id !== id));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        const fetchAccounts = async () => {
            const response = await AuthService.get('/api/v1/accounts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAccounts(response.data.data);
            setIsLoading(false);
        }
        fetchAccounts();
        return () => {
            setAccounts([]);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Content>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg mb-2">Account List</h1>
                <NavLink to="/categories/create" className="btn bg-orange-400 flex text-white items-center justify-center px-4">
                    <AiOutlinePlus /><span>Add Account</span>
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

export default Accounts;
