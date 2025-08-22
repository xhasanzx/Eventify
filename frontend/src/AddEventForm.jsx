import React, { useState } from 'react';
import API from './api';

export function AddEventForm({ newEvent, setNewEvent, setEvents }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/events/create/", newEvent)
            .then((res) => {
                alert("Event created!");
                setEvents((prev) => [...prev, res.data.event]);
                setNewEvent({ title: '', description: '', date: '', location: '', image_url: '', price: 0 });
            })
            .catch((err) => console.error(err));
    };
    
    return (
        <div>
            <h3>Create a new event</h3>

            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="title" value={newEvent.title} onChange={handleChange} />
                <br />
                <label>Description: </label>
                <input type="text" name="description" value={newEvent.description} onChange={handleChange} />
                <br />
                <label>Date: </label>
                <input type="date" name="date" value={newEvent.date} onChange={handleChange} />
                <br />
                <label>Location: </label>
                <input type="text" name="location" value={newEvent.location} onChange={handleChange} />
                <br />
                <label>Image URL: </label>
                <input type="text" name="image_url" value={newEvent.image_url} onChange={handleChange} />
                <br />
                <label>Price: </label>
                <input type="number" name="price" value={newEvent.price} onChange={handleChange} />
                <br />
                <br />

                <button type="submit">Create Event</button>
            </form>
        </div>)
}

