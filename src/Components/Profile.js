import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import maleAvatar from './male.jpg'; // Import male avatar image
import femaleAvatar from './female.jpg'; // Import female avatar image
import backgroundImage from './pic6.jpg'; // Import background image
import Navbar from './Navbar';

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

        const fetchData = async () => {
            try {
                // Fetch user data
                const userDocRef = doc(db, 'users', userId);
                const userSnapshot = await getDoc(userDocRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserInfo(userData);
                } else {
                    console.error('User not found');
                }

                // Fetch user events
                const registrationsCollection = collection(db, 'registrations');
                const userEventsQuery = query(registrationsCollection, where('userId', '==', userId));
                const userEventsSnapshot = await getDocs(userEventsQuery);

                const events = [];
                userEventsSnapshot.forEach((doc) => {
                    events.push(doc.data().eventId);
                });

                setUserEvents(events);

                // Fetch event details for each user event
                const eventDetailsPromises = events.map(async (eventId) => {
                    const eventDocRef = doc(db, 'approvedEvents', eventId);
                    const eventSnapshot = await getDoc(eventDocRef);

                    if (eventSnapshot.exists()) {
                        const eventData = eventSnapshot.data();
                        return { eventId, eventData };
                    } else {
                        console.error(`Event ${eventId} not found`);
                        return null;
                    }
                });

                const resolvedEventDetails = await Promise.all(eventDetailsPromises);
                const filteredEventDetails = resolvedEventDetails.filter(detail => detail !== null);
                const eventDetailsMap = filteredEventDetails.reduce((acc, detail) => {
                    acc[detail.eventId] = detail.eventData;
                    return acc;
                }, {});

                setEventDetails(eventDetailsMap);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [userId, db]);

    // Determine avatar image based on gender
    const avatarImage = userInfo?.gender === 'male' ? maleAvatar : femaleAvatar;

    return (
        <>
        <Navbar />
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            paddingTop: '150px', // Increased paddingTop to ensure content does not overlap with navbar
            backdropFilter: 'blur(5px)', // Glass effect
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color with reduced transparency
            textAlign: 'center'
        }}>
            {loading ? ( // Show loading indicator while data is being fetched
                <div>Loading...</div>
            ) : (
                <div style={{ maxWidth: '800px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#f2f2f2', marginTop: '-150px' }}>
                    {userInfo && (
                        <div style={{ marginBottom: '20px' }}>
                            <img src={avatarImage} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                            <h2 style={{ color: '#2196F3' }}>{userInfo.name}</h2>
                            <p style={{ color: '#777', marginBottom: '20px' }}>{userInfo.institution}</p>
                        </div>
                    )}
                    <h3 style={{ color: '#2196F3', marginBottom: '10px' }}>Registered Events</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#2196F3', color: '#fff' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Event Title</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {userEvents.map((eventId) => (
                                <tr key={eventId} style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd' }}>
                                    {eventDetails[eventId] && (
                                        <>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{eventDetails[eventId].title}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{eventDetails[eventId].date}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{eventDetails[eventId].time}</td>
                                            {/* Add more table cells for additional event details */}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
}

export default Profile;
