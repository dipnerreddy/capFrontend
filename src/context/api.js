// src/context/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const addBloodUnit = (bloodUnit) => {
    return axios.post(`${API_URL}/bloodunits/add`, bloodUnit);
};

export const addPayment = (paymentDetails) => {
    return axios.post(`${API_URL}/bills/payment`, paymentDetails);
}
