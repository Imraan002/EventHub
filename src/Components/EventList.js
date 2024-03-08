import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import the app object

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const db = getFirestore(app);
                const eventsCollection = collection(db, 'approvedEvents');
                const querySnapshot = await getDocs(eventsCollection);

                const fetchedEvents = [];
                querySnapshot.forEach((doc) => {
                    fetchedEvents.push({ id: doc.id, ...doc.data() });
                });

                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Approved Events</h2>
            {events.length === 0 ? (
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
                            {/* Add more event details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EventList;
