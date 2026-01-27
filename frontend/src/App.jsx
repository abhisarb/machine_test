import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddAgent from './pages/AddAgent';
import UploadLeads from './pages/UploadLeads';
import LeadList from './pages/LeadList';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/add-agent" element={isAuthenticated ? <AddAgent /> : <Navigate to="/login" />} />
                <Route path="/upload" element={isAuthenticated ? <UploadLeads /> : <Navigate to="/login" />} />
                <Route path="/leads" element={isAuthenticated ? <LeadList /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
