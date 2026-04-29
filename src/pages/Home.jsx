import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import { Link } from 'react-router-dom';
import ScheduledEvents from '../components/ScheduledEvents';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="loader">Loading events...</div>;

    return (
        <div className="home-page fade-in">
            <header className="hero">
                <h1>PRO<span>SPORTS</span></h1>
                <p className="tagline">The ultimate destination for UFC and F1 fans. Never miss a moment of the action!</p>
            </header>

            <ScheduledEvents />

            <section className="events-grid">
                {events.length > 0 && events.map(event => (
                        <Link to={`/event/${event._id}`} key={event._id} className="event-card">
                            <div className="event-img">
                                {event.imageUrl ? (
                                    <img src={event.imageUrl} alt={event.title} />
                                ) : (
                                    <div className="img-placeholder">{event.category?.name || 'Event'}</div>
                                )}
                                <span className="category-tag">{event.category?.name}</span>
                            </div>
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p className="event-date">
                                    {new Date(event.date).toLocaleDateString()} • {event.location}
                                </p>
                                <p className="event-desc">{event.description.substring(0, 80)}...</p>
                                <div className="organizer">By {event.organizer?.name}</div>
                            </div>
                        </Link>
                    ))}
            </section>
        </div>
    );
};

export default Home;
