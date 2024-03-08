import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { getFirestore } from 'firebase/firestore'; // Import Firestore methods
import app from './FirebaseAuth'; // Import the app object

function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const db = getFirestore(app); // Get the Firestore object
            const eventsCollection = collection(db, 'pendingEvents'); // Reference to the pending events collection

            // Add the event to the pending events collection
            await addDoc(eventsCollection, {
                title: title,
                description: description,
                category: category,
                date: date,
                time: time,
                location: location,
                status: 'pending', // Set status as pending
                // Add more fields as needed
            });

            alert('Event added successfully and pending for approval!');
            setTitle('');
            setDescription('');
            setCategory('');
            setDate('');
            setTime('');
            setLocation('');
        } catch (error) {
            console.error('Error adding event:', error.message);
            alert('Error adding event: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <br /><br />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <br /><br />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                />
                <br /><br />
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                />
                <br /><br />
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={handleTimeChange}
                />
                <br /><br />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={handleLocationChange}
                />
                <br /><br />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

export default AddEvent;
