import React, {useEffect} from 'react';
import {Content} from "../../components";
import {AuthService} from "../../services/AuthService";
import {MDBDataTableV5} from 'mdbreact';

function Products() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const columns = [
        {
            label: 'Name',
            field: 'name',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'Category',
            field: 'category',
            width: 270,
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
            sort: 'disabled',
            width: 100,
        },
    ]
    const rows = [
        {
            id: products.map(p => p.id),
            category: products.map(p => p.category.name),
            name: products.map(p => p.name),
            sellingPrice: products.map(p => p.sellingPrice),
            buyingPrice: products.map(p => p.buyingPrice),
            quantity: products.map(p => p.quantity),
            created_at: products.map(p => p.created_at)
        }
    ]

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
            <h1 className="display-6 mb-2">Products List</h1>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={{columns, rows}}
                fullPagination
            />
        </Content>
    );
}

export default Products;
