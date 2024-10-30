import React, { useState, useEffect } from 'react';
import { getUserRequests } from '../context/api'; // Make sure to implement this in your api.js

const RequestsForm = () => {
    const [requests, setRequests] = useState([]);

    // Fetch user requests on component mount
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getUserRequests(); // Fetch requests from API
                setRequests(response.data); // Assuming response.data contains the array of requests
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const handleAccept = (requestId) => {
        // Logic to accept the request, such as making an API call to update the request status
        console.log("Accepted request with ID:", requestId);
        // Here you would also want to update the requests state to reflect the change
    };

    const handleDecline = (requestId) => {
        // Logic to decline the request
        console.log("Declined request with ID:", requestId);
        // Here you would also want to update the requests state to reflect the change
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Requests</h2>
            {requests.length > 0 ? (
                <ul className="space-y-2">
                    {requests.map((request) => (
                        <li key={request.id} className="p-4 border rounded shadow">
                            <div>
                                <p><strong>User:</strong> {request.userName}</p>
                                <p><strong>Phone Number:</strong> {request.phoneNumber}</p>
                                <p><strong>Requested Blood Type:</strong> {request.rBloodType}</p>
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 mr-2"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                >
                                    Decline
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No requests available.</p>
            )}
        </div>
    );
};

export default RequestsForm;
