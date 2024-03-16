import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Import firestore query functions
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'; // Import React Bootstrap components
import { BsClock, BsCalendar, BsGeoAlt, BsCardText } from 'react-icons/bs';
import Navbar from './Navbar';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading state
    const selectedCategory = localStorage.getItem('selectedCategory'); // Retrieve selected category from local storage

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const db = getFirestore(app);
                const eventsCollection = collection(db, 'approvedEvents');
                const q = query(eventsCollection, where('category', '==', selectedCategory)); // Filter events by selected category
                const querySnapshot = await getDocs(q);

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
    }, [selectedCategory]); // Update effect when selectedCategory changes

    const handleRegisterButtonClick = (eventId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            localStorage.setItem('eventId', eventId);
        } else {
            console.error('User not logged in');
        }
    };

    return (
        <>
        <Navbar/>
        <div style={{ background: '#111', minHeight: '100vh', paddingTop: '150px', padding: '100px' }}>
            <Container>
                <h2 className="mt-3" style={{ color: '#bbdefb', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', fontSize: '1.5rem' }}>Events</h2>
                {loading ? (
                    <Spinner animation="border" role="status" variant="light" style={{ marginTop: '20px' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : events.length === 0 ? (
                    <p style={{ color: '#fff', fontSize: '1rem' }}>No events available.</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {events.map((event) => (
                            <Col key={event.id}>
                                <Card className="bg-transparent" style={{ marginBottom: '20px', border: 'none', transition: 'transform 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
                                    <Card.Body style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '10px', transition: 'background-color 0.3s' }}>
                                        <Card.Title style={{ color: '#bbdefb', fontSize: '1.2rem', fontWeight: 'bold' }}>{event.title}</Card.Title>
                                        <Card.Text style={{ color: '#F0F0F0', fontSize: '0.9rem' }}><BsCardText /> Description: {event.description}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0', fontSize: '0.9rem' }}><BsGeoAlt /> Location: {event.location}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0', fontSize: '0.9rem' }}><BsCalendar /> Date: {event.date}</Card.Text>
                                        <Card.Text style={{ color: '#F0F0F0', fontSize: '0.9rem' }}><BsClock /> Time: {event.time}</Card.Text>
                                        <Link to='/registration'>
                                            <Button onClick={() => handleRegisterButtonClick(event.id)} variant="danger" size="sm">Register</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
        </>
    );
}

export default EventList;
