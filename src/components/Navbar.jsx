import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const close = () => setMenuOpen(false);

    const handleLogout = () => {
        close();
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={close}>
                    Pro<span>Sports</span>
                </Link>

                {/* Hamburger toggle (visible only on small screens via CSS) */}
                <button
                    id="navbar-toggle-btn"
                    className={`navbar-toggle${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
                    <Link to="/" className="nav-item" onClick={close}>Events</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-item" onClick={close}>Dashboard</Link>
                            <div className="user-menu">
                                <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={handleLogout} className="btn-logout">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item" onClick={close}>Login</Link>
                            <Link to="/register" className="btn-primary" onClick={close}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

