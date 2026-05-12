import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        setLoading(true);
        const result = await register(formData);
        if (result.success) {
            setStatus({ type: 'success', message: result.message });
            setFormData({ name: '', email: '', password: '' });
        } else {
            setStatus({ type: 'error', message: result.message });
        }
        setLoading(false);
    };

    return (
        <div className="auth-page fade-in">
            <div className="auth-card">
                <h2>Join ProSports</h2>
                <p>Register to start organizing events</p>
                
                {status.type === 'success' ? (
                    <div className="text-center">
                        <div className="alert-success" style={{fontSize: '1rem', padding: '1.5rem'}}>
                            <h3 style={{marginBottom: '0.5rem'}}>¡Registro Exitoso!</h3>
                            {status.message}
                        </div>
                        <p style={{marginTop: '1.5rem'}}>
                            ¿Ya verificaste? <Link to="/login" style={{color: 'var(--primary)', fontWeight: '600'}}>Inicia sesión aquí</Link>
                        </p>
                    </div>
                ) : (
                    <>
                        {status.message && (
                            <div className={`alert-${status.type}`}>
                                {status.message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    required 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="name@example.com"
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Min. 6 characters"
                                    required 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="btn-primary full-width" disabled={loading}>
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>
                    </>
                )}
                
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
