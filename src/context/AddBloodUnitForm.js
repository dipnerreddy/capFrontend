import React, { useState, useEffect } from 'react';
import { addBloodUnit } from '../context/api';
import QrScanner from 'react-qr-scanner';

const AddBloodUnitForm = ({ onAdd }) => {
    const [bloodType, setBloodType] = useState('');
    const [bid, setBid] = useState('');
    const [quantity] = useState(1); // Fixed quantity
    const [expirationDate, setExpirationDate] = useState('');
    const [qrError, setQrError] = useState(null);
    const [showQrScanner, setShowQrScanner] = useState(false); // State to control QR scanner visibility
    const [showToast, setShowToast] = useState(false); // State to control toast visibility

    useEffect(() => {
        const today = new Date();
        const expiry = new Date(today.setDate(today.getDate() + 15));
        setExpirationDate(expiry.toISOString().split('T')[0]);
    }, []);

    const handleSubmit = async (bloodUnit) => { // Change to accept bloodUnit directly
        try {
            const response = await addBloodUnit(bloodUnit);
            if (response.status === 200) {
                console.log("Successfully added blood unit:", response);
                onAdd(bloodUnit);
                setBloodType('');
                setBid('');
                showSuccessToast(); // Show toast message
            }
        } catch (error) {
            console.error('Error adding blood unit:', error);
        }
    };

    const showSuccessToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false); // Hide toast after 2 seconds
        }, 2000);
    };

    const handleScan = (data) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data.text);
                if (parsedData.bid && parsedData.bloodType) {
                    setBid(parsedData.bid);
                    setBloodType(parsedData.bloodType);
                    setQrError(null);
                    setShowQrScanner(false); // Close scanner after successful scan
                    
                    // Directly call handleSubmit with the new blood unit data
                    const bbName = sessionStorage.getItem('bbName');
                    const bloodUnit = {
                        bloodType: parsedData.bloodType,
                        bid: parsedData.bid,
                        bbName,
                        quantity,
                        expirationDate,
                    };
                    handleSubmit(bloodUnit); // Call handleSubmit with bloodUnit data
                } else {
                    setQrError("Invalid QR code data");
                }
            } catch (error) {
                setQrError("Error parsing QR code data");
            }
        }
    };

    const handleError = (err) => {
        console.error("QR Scanner Error:", err.message);
        setQrError(err.message);
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const bbName = sessionStorage.getItem('bbName');
                const bloodUnit = { bloodType, bid, bbName, quantity, expirationDate };
                handleSubmit(bloodUnit);
            }} className="bg-white p-6 rounded shadow mb-4">
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
                <div className="flex space-x-2 mt-4">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Add Blood Unit
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setShowQrScanner(!showQrScanner)} 
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        {showQrScanner ? 'Hide QR Scanner' : 'Scan QR'}
                    </button>
                </div>
            </form>

            {showQrScanner && (
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Scan QR Code</h2>
                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    {qrError && <p className="text-red-500">{qrError}</p>}
                </div>
            )}

            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-md">
                    Blood unit added successfully!
                </div>
            )}
        </div>
    );
};

export default AddBloodUnitForm;
