import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const userId = localStorage.getItem('userId');
    const db = getFirestore(app);

    useEffect(() => {
        if (!userId) {
            console.error('User ID not found in local storage');
            window.location.href = './home';
            return;
        }

        const fetchUserData = async () => {
            try {
                const userDocRef = doc(collection(db, 'users'), userId);
                const userSnapshot = await getDoc(userDocRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserInfo(userData);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        const fetchUserEvents = async () => {
            try {
                const registrationsCollection = collection(db, 'registrations');
                const userEventsQuery = query(registrationsCollection, where('userId', '==', userId));
                const userEventsSnapshot = await getDocs(userEventsQuery);

                const events = [];
                userEventsSnapshot.forEach((doc) => {
                    events.push(doc.data().eventId);
                });

                setUserEvents(events);
            } catch (error) {
                console.error('Error fetching user events:', error.message);
            }
        };

        const fetchEventDetails = async (eventId) => {
            try {
                const eventDocRef = doc(collection(db, 'approvedEvents'), eventId);
                const eventSnapshot = await getDoc(eventDocRef);

                if (eventSnapshot.exists()) {
                    const eventData = eventSnapshot.data();
                    setEventDetails((prevDetails) => ({
                        ...prevDetails,
                        [eventId]: eventData // Store event details with event ID as key
                    }));
                } else {
                    console.error('Event not found');
                }
            } catch (error) {
                console.error('Error fetching event details:', error.message);
            }
        };

        fetchUserData();
        fetchUserEvents();

        // Fetch event details for each user event
        userEvents.forEach((eventId) => {
            fetchEventDetails(eventId);
        });
    }, [userId, db, userEvents]);

    return (
        <div>
            <h2>User Profile</h2>
            {userInfo && (
                <div>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Institution:</strong> {userInfo.institution}</p>
                </div>
            )}
            <h3>Registered Events</h3>
            <ul>
                {userEvents.map((eventId) => (
                    <li key={eventId}>
                        <h4>Event ID: {eventId}</h4>
                        {eventDetails[eventId] && (
                            <div>
                                <p><strong>Title:</strong> {eventDetails[eventId].title}</p>
                                <p><strong>Date:</strong> {eventDetails[eventId].date}</p>
                                <p><strong>Time:</strong> {eventDetails[eventId].time}</p>
                                {/* Add more event details here */}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;
