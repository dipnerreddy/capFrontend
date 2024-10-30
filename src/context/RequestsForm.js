import React, { useEffect, useState } from 'react';
import { getUserRequests } from '../context/api'; // Import the API function

const RequestsForm = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bbName = sessionStorage.getItem('bbName') || ''; // Get the bbName from session storage

    useEffect(() => {
        const fetchRequests = async () => {
            if (!bbName) {
                setError("Blood bank name is not set."); // Handle case where bbName is not found
                setLoading(false);
                return;
            }

            try {
                const response = await getUserRequests(bbName); // Use the bbName to fetch requests
                setRequests(response.data); // Set the requests from the response
            } catch (err) {
                console.error("Error fetching requests:", err);
                setError("Failed to fetch requests. Please try again."); // Set error state
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchRequests();
    }, [bbName]); // Dependency on bbName

    if (loading) {
        return <div>Loading requests...</div>; // Loading message
    }

    if (error) {
        return <div>{error}</div>; // Display error if exists
    }

    return (
        <div className="requests-form">
            <h2 className="text-2xl font-semibold mb-4">Requests for {bbName}</h2>
            {requests.length > 0 ? (
                <div className="flex flex-col gap-4"> {/* Use flex column to stack cards vertically */}
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white shadow-md rounded-lg border border-gray-200 p-4"
                            style={{ height: '200px' }} // Fixed height for rectangular shape
                        >
                            <div className="font-bold text-lg mb-2">{request.userName}</div>
                            <div className="text-gray-700 mb-1"><strong>Phone Number:</strong> {request.phoneNumber}</div>
                            <div className="text-gray-700 mb-1"><strong>Requested Blood Type:</strong> {request.rBloodType}</div>
                            <div className="text-gray-700"><strong>Blood Bank Name:</strong> {request.bbName}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No requests found for this blood bank.</div> // Message when no requests
            )}
        </div>
    );
};

export default RequestsForm;
