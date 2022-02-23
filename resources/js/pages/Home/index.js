import { Helmet } from "react-helmet";
import { useAuth } from "../../features/Authentication/AuthContext";
import { Content, Loading } from "../../components";
import React from "react";
import { AuthService } from "../../services/AuthService";
import { Doughnut, Line } from 'react-chartjs-2';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);


export default function Home() {
    const { isAuthLoading } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const [statistics, setStatistics] = React.useState({});


    React.useEffect(() => {
        const getStatistics = async () => {
            const response = await AuthService.get('/api/v1/home', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setStatistics(response.data.statistics);
            setIsLoading(false);
        }
        getStatistics();
        return () => {
            setStatistics(null);
        }
    }, [])

    if (isAuthLoading || isLoading) {
        return <Loading />
    }

    return (
        <Content>
            <Helmet>
                <title>CRM - Home</title>
            </Helmet>
            <div className="container">
                <div className="row">

                    <div className="col-md-3 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Categories</h5>
                                <p className="card-text text-2xl font-bold">{statistics.categories}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Products</h5>
                                <p className="card-text text-2xl font-bold">{statistics.products}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Customer</h5>
                                <p className="card-text text-2xl font-bold">{statistics.users}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Operation</h5>
                                <p className="card-text text-2xl font-bold">{statistics.totalOperation}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row my-2">

                    <div className="col-md-6 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Stock</h5>
                                <p className="card-text text-2xl font-bold">{statistics.stock}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 text-center">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Out of Stock</h5>
                                <p className="card-text text-2xl font-bold">{statistics.unStock}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <Doughnut
                                    options={
                                        {
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'right',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Most Popular Categories',
                                                },
                                            },
                                        }
                                    }
                                    data={{
                                        labels: statistics.mostPopularCategories.map(category => category.name),
                                        datasets: [
                                            {
                                                label: 'Categories',
                                                data: statistics.mostPopularCategories.map(category => category.products_count),
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(255, 206, 86, 0.2)',
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                    'rgba(255, 206, 86, 1)',
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(153, 102, 255, 1)',
                                                    'rgba(255, 159, 64, 1)',
                                                ],
                                                borderWidth: 1,
                                            }
                                        ],
                                    }}

                                />
                            </div>
                            <div className="card-footer">
                                <small className="text-muted text-center">Most Popular Category List</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <Doughnut
                                    options={
                                        {
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'left',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'In Stock / Out of Stock List',
                                                },
                                            },
                                        }
                                    }
                                    data={{
                                        labels: ['In Stock', 'Out of Stock'],
                                        datasets: [
                                            {
                                                label: 'Categories',
                                                data: [statistics.stock, statistics.unStock],
                                                backgroundColor: [
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(153, 102, 255, 1)',
                                                    'rgba(255, 159, 64, 1)',
                                                ],
                                                borderWidth: 1,
                                            }
                                        ],
                                    }}

                                />
                            </div>
                            <div className="card-footer">
                                <small className="text-muted text-center"> Stock Status </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <Line
                                    options={
                                        {
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'right',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Most Popular Products',
                                                },
                                            },
                                        }
                                    }
                                    data={{
                                        labels: statistics.mostPopularProducts.map(products => moment(products.created_at, "YYYYMMDD").fromNow()),
                                        datasets: [
                                            {
                                                label: 'Products',
                                                data: statistics.mostPopularProducts.map(products => products.quantity),
                                                backgroundColor: [
                                                    'rgba(54, 162, 235, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(54, 162, 235, 1)',
                                                ],
                                            }
                                        ],
                                    }}

                                />
                            </div>
                            <div className="card-footer">
                                <small className="text-muted text-center">Most Popular Category List</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}
