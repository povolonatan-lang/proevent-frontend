import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvent } from '../services/api';
import './EventDetail.css';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await getEvent(id);
                setEvent(data);
            } catch (err) {
                setError('Event not found or server error');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <div className="loader">Loading details...</div>;
    if (error) return <div className="error-page">{error}</div>;

    return (
        <div className="event-detail-page fade-in">
            <Link to="/" className="back-link">← Back to Events</Link>
            
            <div className="detail-container">
                <div className="detail-header">
                    <div className="detail-img">
                        {event.imageUrl ? (
                            <img src={event.imageUrl} alt={event.title} />
                        ) : (
                            <div className="img-placeholder-lg">{event.category?.name}</div>
                        )}
                    </div>
                    <div className="detail-summary">
                        <span className="category-tag">{event.category?.name}</span>
                        <h1>{event.title}</h1>
                        <div className="meta-info">
                            <div className="info-item">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="info-item">
                                <strong>Location:</strong> {event.location}
                            </div>
                            <div className="info-item">
                                <strong>Organizer:</strong> {event.organizer?.name}
                            </div>
                        </div>
                        <button className="btn-primary join-btn">I'm Interested</button>
                    </div>
                </div>

                <div className="detail-body">
                    <h2>About this event</h2>
                    <p>{event.description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
