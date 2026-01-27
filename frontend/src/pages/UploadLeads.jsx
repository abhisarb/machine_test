import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UploadLeads = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('http://localhost:5000/api/leads/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess(`${data.count} leads distributed successfully!`);
            setFile(null);
            setTimeout(() => navigate('/leads'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Upload Leads</h1>
                <Link to="/" className="btn" style={{ background: '#e2e8f0' }}>Back to Dashboard</Link>
            </nav>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '500px' }}>
                    <h3>Distribute Leads from CSV/XLSX</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        The file should contain: FirstName, Phone, Notes. Leads will be distributed equally among agents.
                    </p>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div style={{ color: 'var(--success)', padding: '0.5rem', background: '#dcfce7', borderRadius: '4px', marginBottom: '1rem' }}>{success}</div>}

                        <div className="form-group">
                            <label>Select File (.csv, .xlsx, .xls)</label>
                            <input
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Upload and Distribute'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadLeads;
