import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Homepage from './Homepage/Homepage'; // Ensure you have this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/" element={<Login />} /> {/* Redirect to Login by default */}
            </Routes>
        </Router>
    );
}

export default App;
