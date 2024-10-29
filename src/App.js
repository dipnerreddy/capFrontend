// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Home from './routes/Home';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
