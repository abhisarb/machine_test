import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/agents', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAgents(data);
        };
        fetchAgents();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Admin Dashboard</h1>
                <div className="nav-links">
                    <Link to="/">Agents</Link>
                    <Link to="/add-agent">Add Agent</Link>
                    <Link to="/upload">Upload Leads</Link>
                    <Link to="/leads">View Leads</Link>
                    <button onClick={handleLogout} className="btn" style={{ marginLeft: '1rem', background: '#e2e8f0' }}>Logout</button>
                </div>
            </nav>
            <div className="container">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Agents</h2>
                        <Link to="/add-agent" className="btn btn-primary">Add New Agent</Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem' }}>Name</th>
                                <th style={{ padding: '0.75rem' }}>Email</th>
                                <th style={{ padding: '0.75rem' }}>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map(agent => (
                                <tr key={agent._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '0.75rem' }}>{agent.name}</td>
                                    <td style={{ padding: '0.75rem' }}>{agent.email}</td>
                                    <td style={{ padding: '0.75rem' }}>{agent.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {agents.length === 0 && <p style={{ textAlign: 'center', marginTop: '1rem' }}>No agents found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
