import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'; // Import React Bootstrap components
import { BsClock, BsCalendar, BsGeoAlt, BsCardText } from 'react-icons/bs';

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
        <div style={{ background: '#111', minHeight: '100vh', padding: '20px' }}>
            <Container>
                <h2 className="mt-3" style={{ color: '#bbdefb', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', fontSize: '2.5rem' }}>Events</h2>
                {loading ? ( // Render loading spinner while data is being fetched
                    <Spinner animation="border" role="status" variant="light" style={{ marginTop: '20px' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : events.length === 0 ? (
                    <p style={{ color: '#fff' }}>No events available.</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {events.map((event) => (
                            <Col key={event.id}>
                                <Card className="bg-transparent" style={{ marginBottom: '20px', border: 'none' }}>
                                    <Card.Body style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '15px' }}>
                                        <Card.Title style={{ color: '#bbdefb', fontSize: '1.8rem', fontWeight: 'bold' }}>{event.title}</Card.Title>
                                        <Card.Text style={{ color: '#F0F0F0' }}><BsCardText /> Description: {event.description}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0' }}><BsGeoAlt /> Location: {event.location}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0' }}><BsCalendar /> Date: {event.date}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0' }}><BsClock /> Time: {event.time}</Card.Text>
                                        <Link to='/registration'>
                                            <Button onClick={() => handleRegisterButtonClick(event.id)} variant="danger">Register</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default EventList;
