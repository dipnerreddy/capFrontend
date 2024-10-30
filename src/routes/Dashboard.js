import React, { useState } from 'react';
import AddBloodUnitForm from '../context/AddBloodUnitForm';
import MakePaymentForm from '../context/MakePaymentForm';

const Dashboard = () => {
    const [databaseInfo, setDatabaseInfo] = useState([]);

    const handleAddBloodUnit = async (bloodUnit) => {
        // Logic to add blood unit (e.g., POST request to your API)
        console.log("Adding Blood Unit:", bloodUnit);
        // Fetch updated database info after adding if needed
    };

    const handleMakePayment = async (paymentDetails) => {
        // Logic to make payment (e.g., POST request to your API)
        console.log("Making Payment:", paymentDetails);
        // Fetch updated database info or show confirmation
    };

    const fetchDatabaseInfo = async () => {
        // Logic to fetch database information (e.g., GET request to your API)
        console.log("Fetching Database Info");
        // Update state with fetched data
    };

    const handleLogout = () => {
        // Logic to handle logout (e.g., clearing session storage, redirecting)
        console.log("Logging out...");
        sessionStorage.clear();
        window.location.href = '/login'; // Adjust the URL to your login page
    };

    return (
        <div className="flex">
            <aside className="w-64 h-screen bg-gray-800 text-white fixed">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">BloodLinks Dashboard</h2>
                    <nav className="mt-4">
                        <ul>
                            <li className="hover:bg-gray-700 p-2 rounded">Add Blood Unit</li>
                            <li className="hover:bg-gray-700 p-2 rounded">Make Payment</li>
                            <li className="hover:bg-gray-700 p-2 rounded" onClick={fetchDatabaseInfo}>View Database Info</li>
                        </ul>
                    </nav>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="absolute bottom-0 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-0"
                >
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-6 bg-gray-200 ml-64">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                
                {/* Add Blood Unit Form */}
                <AddBloodUnitForm onAdd={handleAddBloodUnit} />

                {/* Make Payment Section */}
                <MakePaymentForm onPay={handleMakePayment} />

                {/* Database Info Section */}
                <div className="bg-white p-6 rounded shadow mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Database Info</h2>
                    {databaseInfo.length > 0 ? (
                        <ul>
                            {databaseInfo.map((item, index) => (
                                <li key={index} className="border-b py-2">{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No data available. Fetch information from the database.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
