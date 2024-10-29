// src/components/MakePaymentForm.js
import React, { useState } from 'react';

const MakePaymentForm = ({ onPay }) => {
    const [paymentDetails, setPaymentDetails] = useState({ amount: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onPay(paymentDetails);
        setPaymentDetails({ amount: '' }); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>
            <div className="mb-4">
                <label className="block mb-2">Amount</label>
                <input
                    type="number"
                    value={paymentDetails.amount}
                    onChange={(e) => setPaymentDetails({ amount: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Make Payment</button>
        </form>
    );
};

export default MakePaymentForm;
