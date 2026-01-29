import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditAgent = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get(`http://localhost:5000/api/agents`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const agent = data.find(a => a._id === id);
                if (agent) {
                    setFormData({ name: agent.name, email: agent.email, mobile: agent.mobile, password: '' });
                } else {
                    setError('Agent not found');
                }
            } catch (err) {
                setError('Failed to fetch agent details');
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (formData.mobile) {
            const phoneRegex = /^\+91\d{10}$/;
            if (!phoneRegex.test(formData.mobile)) {
                setError('Phone number must be in format +91 followed by 10 digits (e.g. +919876543210)');
                return;
            }
        }

        try {
            const token = localStorage.getItem('token');
            // Remove password if empty to not update it
            const dataToUpdate = { ...formData };
            if (!dataToUpdate.password) delete dataToUpdate.password;

            await axios.put(`http://localhost:5000/api/agents/${id}`, dataToUpdate, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update agent');
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div>
            <nav className="navbar">
                <h1>Edit Agent</h1>
                <Link to="/" className="btn" style={{ background: '#e2e8f0' }}>Back to Dashboard</Link>
            </nav>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '500px' }}>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number (with country code)</label>
                            <input type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} placeholder="+91 9876543210" required />
                        </div>
                        <div className="form-group">
                            <label>Password (leave blank to keep current)</label>
                            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Agent</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAgent;
