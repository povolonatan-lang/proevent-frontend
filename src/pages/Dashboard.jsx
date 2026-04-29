import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import EventList from './EventList';
import EventForm from './EventForm';
import './Dashboard.css';

const Dashboard = () => {
    const location = useLocation();

    return (
        <div className="dashboard-page fade-in">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h3>Dashboard</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link 
                        to="/dashboard" 
                        className={location.pathname === '/dashboard' ? 'active' : ''}
                    >
                        My Events
                    </Link>
                    <Link 
                        to="/dashboard/create-event" 
                        className={location.pathname === '/dashboard/create-event' ? 'active' : ''}
                    >
                        Create Event
                    </Link>
                </nav>
            </aside>
            
            <main className="dashboard-content">
                <Routes>
                    <Route path="/" element={<EventList />} />
                    <Route path="/create-event" element={<EventForm />} />
                    <Route path="/edit-event/:id" element={<EventForm isEdit={true} />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
