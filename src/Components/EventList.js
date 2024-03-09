import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import { Link } from 'react-router-dom';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const db = getFirestore(app); // Use app directly
                const eventsCollection = collection(db, 'approvedEvents');
                const querySnapshot = await getDocs(eventsCollection);

                const fetchedEvents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setEvents(fetchedEvents);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array to run effect only once when component mounts

    const handleRegisterButtonClick = (eventId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            // Store eventId in local storage along with userId
            localStorage.setItem('eventId', eventId);
        } else {
            console.error('User not logged in');
        }
    };

    return (
        <div>
            <h2>Approved Events</h2>
            {loading ? ( // Render loading indicator while data is being fetched
                <p>Loading...</p>
            ) : events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Category:</strong> {event.category}</p>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <Link to='/registration'>
                                <button onClick={() => handleRegisterButtonClick(event.id)}>Register</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EventList;
