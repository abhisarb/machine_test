import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddAgent = () => {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/agents', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add agent');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Add Agent</h1>
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
                            <label>Password</label>
                            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Agent</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAgent;
