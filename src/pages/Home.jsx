import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
    const [catalogueCount, setCatalogueCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [recentCatalogue, setRecentCatalogue] = useState(null);
    const [recentCategories, setRecentCategories] = useState(null);
    const productCounting = 20;
    // Fetch catalogue count from backend
    const CountCatalogue = async () => {
        try {
            const response = await axios.get('http://localhost:8800/server/dashboard/countCatalogue');
            setCatalogueCount(response.data.count); // Assuming response is { count: number }
        } catch (error) {
            console.error("Error fetching catalogue count:", error);
        }
    };

    // Fetch category count from backend
    const CountCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8800/server/dashboard/countCategories');
            setProductCount(response.data.count); // Assuming response is { count: number }
        } catch (error) {
            console.error("Error fetching categories count:", error);
        }
    };

    // Fetch the most recent catalogue
    const fetchRecentCatalogue = async () => {
        try {
            const response = await axios.get('http://localhost:8800/server/dashboard/recentCatalogue');
            setRecentCatalogue(response.data); // Assuming response is the recent catalogue object
        } catch (error) {
            console.error("Error fetching recent catalogue:", error);
        }
    };

    // Fetch the most recent categories
    const fetchRecentCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8800/server/dashboard/recentCategories');
            setRecentCategories(response.data); // Assuming response is the recent catalogue object
        } catch (error) {
            console.error("Error fetching recent catalogue:", error);
        }
    };

    // Pie chart data (dynamically populated)
    const pieChartData = [
        { id: 0, value: catalogueCount, label: 'Catalogues'},
        { id: 1, value: productCount, label: 'Categories' },
        { id: 2, value: 100 - (catalogueCount + productCount), label: 'Other' }, // Example
    ];

    useEffect(() => {
        CountCatalogue(); // Call the function to get catalogue count
        CountCategories(); // Call the function to get category count
        fetchRecentCatalogue(); // Call the function to get recent catalogue
        fetchRecentCategories(); //call the function to get recent categories
    }, []);

    const CounterCircle = ({ count }) => {
        const [displayCount, setDisplayCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const end = count;
            const duration = 1000; // Duration of the animation in ms
            const increment = end / duration * 50; // Increment per 50ms
            const timer = setInterval(() => {
                if (start < end) {
                    start += increment;
                    setDisplayCount(Math.floor(start));
                } else {
                    clearInterval(timer);
                    setDisplayCount(end);
                }
            }, 50);

            return () => clearInterval(timer);
        }, [count]);

        return (
            <p className="text-3xl font-semibold text-teal-500 relative inline-block w-28 h-28 flex justify-center items-center" style={{ color: "rgb(0 121 107)" }}>
                <svg className="absolute inset-0 w-full h-full transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
                    {/* Background Circle in Gray */}
                    <circle cx="60" cy="60" r="54" stroke="#F3F3F3" strokeWidth="4" fill="none" />
                    {/* Progress Circle */}
                    <circle cx="60" cy="60" r="54" stroke="#1b8a6b" strokeWidth="4" fill="none" strokeDasharray="339.292" strokeDashoffset={(339.292 * (1 - count / 30))} />
                </svg>
                <span className="relative z-10">{displayCount}</span>
            </p>

        );
    };

    return (
        <main className="p-8 mt-10 sm:mt-14">
            <h1 className="text-2xl font-bold text-gray-700 mb-6" style={{ color: "rgb(0 121 107)" }}>Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Catalogues</h2>
                    <CounterCircle count={catalogueCount} />
                </div>

                <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Categories</h2>
                    <CounterCircle count={productCount} />
                </div>

                <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Total Products</h2>
                    <CounterCircle count={productCounting} />
                </div>


            </div>

            <div className="data-items flex justify-around">
                <div className="recent-class flex flex-col w-3/5 mx-5">
                    {/* Most Recent Catalogue */}
                    <div className="bg-white shadow rounded-lg p-6 my-8 w-full">
                        <h2 className="text-xl font-bold text-gray-700 mb-4" style={{ color: "rgb(0 121 107)" }}>Most Recent Catalogue</h2>
                        {recentCatalogue ? (
                            <table className="w-full text-left border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">S.No</th>
                                        <th className="border border-gray-300 px-4 py-2">Catalogue Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Company Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Company Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">1</td>
                                        {/* <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={`http://localhost:8800/${recentCatalogue.logo}`}
                                        alt="Logo"
                                        className="w-16 h-16"
                                    />
                                </td> */}
                                        <td className="border border-gray-300 px-4 py-2">{recentCatalogue.catalogue_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{recentCatalogue.company_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{recentCatalogue.company_address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-400">Loading recent catalogue...</p>
                        )}
                    </div>

                    {/* Most Recent categories */}
                    <div className="bg-white shadow rounded-lg p-6 my-8 w-full">
                        <h2 className="text-xl font-bold text-gray-700 mb-4 " style={{ color: "rgb(0 121 107)" }}>Most Recent Categories</h2>
                        {recentCategories ? (
                            <table className="w-full text-left border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">S.No</th>
                                        <th className="border border-gray-300 px-4 py-2">Categories Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Catalogue Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">1</td>
                                        {/* <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={`http://localhost:8800/${recentCatalogue.logo}`}
                                        alt="Logo"
                                        className="w-16 h-16"
                                    />
                                </td> */}
                                        <td className="border border-gray-300 px-4 py-2">{recentCategories.category_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{recentCatalogue.catalogue_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-400">Loading recent catalogue...</p>
                        )}
                    </div>
                </div>
                {/* Pie Chart Section */}
                <div className="bg-white shadow rounded-lg p-6 mt-8 w-2/5 text-center mx-5">
                    <h2 className="text-xl font-bold text-gray-700 mb-4" style={{ color: "rgb(0 121 107)" }}>Catalogue & Categories Distribution</h2>
                    <PieChart
                        series={[{ data: pieChartData }]}
                        width={400}
                        height={300}
                        colors={['#5cb2a8', '#2dd4bf', '#00796b']}
                    />

                    {/* Legend Section */}
                    <div style={{ marginTop: 20 }} className='flex justify-around'>
                        {pieChartData.map((item) => (
                        <div key={item.id} style={{ marginBottom: '8px' }}>
                            <span style={{ fontWeight: 'bold', color: item.label === 'Catalogues' ? 'rgb(92 178 168)' : item.label === 'Categories' ? 'rgb(45 212 191)' : '#00796b' }}>
                            {item.label}:
                            </span> 
                            <span>{` ${item.value}`}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>



        </main>
    );
};

export default Dashboard;
