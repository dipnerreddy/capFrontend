import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Receipt = () => {
    const { state } = useLocation();
    const { paymentDetails, date } = state;
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-4">Payment Receipt</h2>
                <p className="text-gray-700 mb-2"><strong>Date:</strong> {date}</p>
                <p className="text-gray-700 mb-2"><strong>BID:</strong> {paymentDetails.bid}</p>
                <p className="text-gray-700 mb-2"><strong>Patient Name:</strong> {paymentDetails.patientName}</p>
                <p className="text-gray-700 mb-2"><strong>Patient Number:</strong> {paymentDetails.patientNumber}</p>
                <p className="text-gray-700 mb-2"><strong>Blood Bank Name:</strong> {paymentDetails.bbName}</p>
                <p className="text-gray-700 mb-4"><strong>Amount Paid:</strong> ${paymentDetails.amount}</p>
                <p className="text-gray-700 mb-4"><strong>Blood Type:</strong> {paymentDetails.bloodType}</p>
                
                <div className="flex justify-between">
                    <button 
                        onClick={() => navigate('/dashboard')} // Navigate to dashboard
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Back to Dashboard
                    </button>
                    <button 
                        onClick={() => window.print()} 
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
