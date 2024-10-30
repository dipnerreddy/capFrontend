// src/context/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const addBloodUnit = (bloodUnit) => {
    return axios.post(`${API_URL}/bloodunits/add`, bloodUnit);
};

export const addPayment = (paymentDetails) => {
    return axios.post(`${API_URL}/bills/payment`, paymentDetails);
}

// Updated function to get the pie chart data using GET and bbName
export const getPieChartData = (bbName) => {
    return axios.get(`${API_URL}/bloodunits/piechart/${bbName}`);
};

export const getUserRequests = async () => {
    return await axios.get(`${API_URL}/requests`); // Update the endpoint as needed
};