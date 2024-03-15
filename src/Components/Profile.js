import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import maleAvatar from './male.jpg'; // Import male avatar image
import femaleAvatar from './female.jpg'; // Import female avatar image
import backgroundImage from './pic6.jpg'; // Import background image

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(true); // State to track loading state
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

        const fetchData = async () => {
            await Promise.all([fetchUserData(), fetchUserEvents()]);

            // Fetch event details for each user event
            userEvents.forEach((eventId) => {
                fetchEventDetails(eventId);
            });

            setLoading(false); // Set loading to false after data is fetched
        };

        fetchData();
    }, [userId, db, userEvents]);

    // Determine avatar image based on gender
    const avatarImage = userInfo?.gender === 'male' ? maleAvatar : femaleAvatar;

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            paddingTop: '100px', // Add margin top for the navbar
            backdropFilter: 'blur(5px)', // Glass effect
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color with reduced transparency
            textAlign: 'center'
        }}>
            {loading ? ( // Show loading indicator while data is being fetched
                <div>Loading...</div>
            ) : (
                <div style={{ maxWidth: '350px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#f2f2f2' }}>
                    {userInfo && (
                        <div style={{ marginBottom: '20px' }}>
                            <img src={avatarImage} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                            <h2 style={{ color: '#2196F3' }}>{userInfo.name}</h2>
                            <p style={{ color: '#777', marginBottom: '20px' }}>{userInfo.institution}</p>
                        </div>
                    )}
                    <h3 style={{ color: '#2196F3' }}>Registered Events</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {userEvents.map((eventId) => (
                            <div key={eventId} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                                {eventDetails[eventId] && (
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>{eventDetails[eventId].title}</h4>
                                        <p style={{ color: '#777', marginBottom: '5px' }}>Date: {eventDetails[eventId].date}</p>
                                        <p style={{ color: '#777', marginBottom: '5px' }}>Time: {eventDetails[eventId].time}</p>
                                        {/* Add more event details here */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
