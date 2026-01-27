import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LeadList = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchLeads = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/leads', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeads(data);
        };
        fetchLeads();
    }, []);

    return (
        <div>
            <nav className="navbar">
                <h1>Distributed Leads</h1>
                <Link to="/" className="btn" style={{ background: '#e2e8f0' }}>Back to Dashboard</Link>
            </nav>
            <div className="container">
                <div className="card">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem' }}>Name</th>
                                <th style={{ padding: '0.75rem' }}>Phone</th>
                                <th style={{ padding: '0.75rem' }}>Notes</th>
                                <th style={{ padding: '0.75rem' }}>Assigned Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map(lead => (
                                <tr key={lead._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '0.75rem' }}>{lead.firstName}</td>
                                    <td style={{ padding: '0.75rem' }}>{lead.phone}</td>
                                    <td style={{ padding: '0.75rem' }}>{lead.notes}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <strong>{lead.agent?.name}</strong> <br />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.agent?.email}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {leads.length === 0 && <p style={{ textAlign: 'center', marginTop: '1rem' }}>No leads distributed yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default LeadList;
