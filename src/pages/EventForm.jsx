import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, updateEvent, getEvent, getCategories } from '../services/api';

const EventForm = ({ isEdit = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categoriesError, setCategoriesError] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const { data: cats } = await getCategories();
                if (!Array.isArray(cats) || cats.length === 0) {
                    setCategoriesError(true);
                } else {
                    setCategories(cats);
                    if (isEdit && id) {
                        const { data: event } = await getEvent(id);
                        setFormData({
                            title: event.title,
                            description: event.description,
                            date: new Date(event.date).toISOString().split('T')[0],
                            location: event.location,
                            category: event.category?._id || '',
                            imageUrl: event.imageUrl || ''
                        });
                    } else {
                        setFormData(prev => ({ ...prev, category: cats[0]._id }));
                    }
                }
            } catch (err) {
                setCategoriesError(true);
                setError('Could not connect to the server. Check your network connection.');
            }
        };
        loadInitialData();
    }, [isEdit, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isEdit) {
                await updateEvent(id, formData);
            } else {
                await createEvent(formData);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || err.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="event-form-view">
            <h2>{isEdit ? 'Edit Event' : 'Create New Event'}</h2>
            
            {error && <div className="alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="dashboard-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Event Title</label>
                        <input 
                            type="text" 
                            required 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        {categoriesError ? (
                            <div className="alert-error" style={{fontSize:'0.85rem', padding:'0.5rem 0.75rem'}}>
                                ⚠️ No categories found. Ask an admin to seed the database via
                                <code style={{marginLeft:'4px', fontSize:'0.8rem'}}>
                                    POST /api/categories/seed
                                </code>
                            </div>
                        ) : (
                        <select 
                            required 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            {categories.length === 0 && (
                                <option value="" disabled>Loading categories…</option>
                            )}
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input 
                            type="date" 
                            required 
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input 
                            type="text" 
                            required 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea 
                            required 
                            rows="5"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label>Image URL (Optional)</label>
                        <input 
                            type="url" 
                            value={formData.imageUrl}
                            placeholder="https://example.com/image.jpg"
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
