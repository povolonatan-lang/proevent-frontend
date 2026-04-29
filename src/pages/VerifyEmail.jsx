import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { verifyEmail } from '../services/api';
import './Auth.css';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState({ type: 'loading', message: 'Verifying your email...' });
    const navigate = useNavigate();
    const hasRun = React.useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (hasRun.current) return;
            hasRun.current = true;
            
            if (!token) {
                setStatus({ type: 'error', message: 'No verification token provided.' });
                return;
            }

            try {
                const { data } = await verifyEmail(token);
                setStatus({ type: 'success', message: data.message });
                // Redirect after 3 seconds
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                setStatus({ 
                    type: 'error', 
                    message: error.response?.data?.message || 'Verification failed. The link might be expired.' 
                });
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="auth-page fade-in">
            <div className="auth-card">
                <h2>Email Verification</h2>
                <div className={`alert-${status.type}`}>
                    {status.message}
                </div>
                {status.type === 'success' && (
                    <p>Redirecting to login page...</p>
                )}
                {status.type === 'error' && (
                    <Link to="/login" className="btn-primary full-width">Back to Login</Link>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
