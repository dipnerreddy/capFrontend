import React, { useState, useEffect } from 'react';
import { addBloodUnit } from '../context/api';

const AddBloodUnitForm = ({ onAdd }) => {
    const [bloodType, setBloodType] = useState('');
    const [bid, setBid] = useState('');
    const [quantity] = useState(1); // Fixed quantity
    const [expirationDate, setExpirationDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const expiry = new Date(today.setDate(today.getDate() + 15));
        setExpirationDate(expiry.toISOString().split('T')[0]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the blood bank name from session storage
        const bbName = sessionStorage.getItem('bbName');

        const bloodUnit = {
            bloodType,
            bid,
            bbName, // Include bbName directly
            quantity, // Always 1
            expirationDate, // Expiry date set to 15 days from today
        };

        try {
            const response = await addBloodUnit(bloodUnit);
            if (response.status === 200) {
                console.log("Successfully added blood unit:", response);
                onAdd(bloodUnit);
                setBloodType('');
                setBid('');
            }
        } catch (error) {
            console.error('Error adding blood unit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Add Blood Unit</h2>
            <div className="mb-4">
                <label className="block mb-2">Blood Group</label>
                <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">BID</label>
                <input
                    type="text"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            {/* Remove blood bank name input */}
            {/* Remove quantity input */}
            {/* Remove expiry date input */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add Blood Unit
            </button>
        </form>
    );
};

export default AddBloodUnitForm;
