import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Pro<span>Sports</span>
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-item">Events</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-item">Dashboard</Link>
                            <div className="user-menu">
                                <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={logout} className="btn-logout">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
