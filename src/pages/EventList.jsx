import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchMyEvents = async () => {
        try {
            const { data } = await getEvents({ organizer: user.id });
            setEvents(data);
        } catch (error) {
            console.error('Error fetching my events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, [user.id]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                setEvents(events.filter(e => e._id !== id));
            } catch (error) {
                alert('Failed to delete event');
            }
        }
    };

    if (loading) return <div>Loading your events...</div>;

    return (
        <div className="event-list-view">
            <div className="view-header">
                <h2>My Events</h2>
                <Link to="/dashboard/create-event" className="btn-primary">New Event</Link>
            </div>

            {events.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't created any events yet.</p>
                </div>
            ) : (
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Event Title</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event._id}>
                                    <td>{event.title}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.category?.name}</td>
                                    <td className="table-actions">
                                        <Link to={`/dashboard/edit-event/${event._id}`} className="btn-edit">Edit</Link>
                                        <button onClick={() => handleDelete(event._id)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventList;
