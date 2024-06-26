import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, getDoc } from 'firebase/firestore';
import app from './FirebaseAuth';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { BsClock, BsCalendar, BsGeoAlt, BsCardText } from 'react-icons/bs';
import Navbar from './Navbar';

function AdminDashboard() {
    const [pendingEvents, setPendingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingEvents = async () => {
            try {
                const db = getFirestore(app);
                const eventsRef = collection(db, 'pendingEvents');
                const querySnapshot = await getDocs(eventsRef);

                const pendingEventsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPendingEvents(pendingEventsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pending events:', error);
            }
        };

        fetchPendingEvents();
    }, []);

    const handleAccept = async (eventId) => {
        try {
            const db = getFirestore(app);
            const eventRef = doc(db, 'pendingEvents', eventId);
            const eventSnapshot = await getDoc(eventRef);

            if (!eventSnapshot.exists()) {
                console.error('Event not found');
                return;
            }

            const eventData = eventSnapshot.data();
            // Add status to the eventData
            const approvedEventData = {
                ...eventData,
                status: 'approved'
            };
            await addDoc(collection(db, 'approvedEvents'), approvedEventData);
            await deleteDoc(eventRef);

            setPendingEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error accepting event:', error);
        }
    };

    const handleReject = async (eventId) => {
        try {
            const db = getFirestore(app);
            const eventRef = doc(db, 'pendingEvents', eventId);
            await deleteDoc(eventRef);

            setPendingEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error rejecting event:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div style={{ 
            background: 'linear-gradient(135deg, #E6A4B4, #F3D7CA, #FFF8E3, #F5EEE6)',
            minHeight: '100vh', 
            paddingTop: '150px', 
            padding: '20px' 
        }}>
            <Container>
                <h2 className="mt-3 text-center" style={{ 
                    color: '#333', 
                    marginBottom: '30px', 
                    fontWeight: 'bold', 
                    fontSize: '1.5rem' 
                }}>Pending Events</h2>
                {loading ? (
                    <Spinner animation="border" role="status" variant="light" className="d-block mx-auto" style={{ marginTop: '20px' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : pendingEvents.length === 0 ? (
                    <p style={{ color: '#333', fontSize: '1rem', textAlign: 'center' }}>No pending events.</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {pendingEvents.map((event) => (
                            <Col key={event.id}>
                                <Card className="border-0" style={{ 
                                    marginBottom: '20px', 
                                    transition: 'transform 0.3s',
                                    backgroundColor: 'rgba(230, 164, 180, 0.8)', // Dark pink background
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
                                    <Card.Img variant="top" src={event.imageUrl} alt={event.title} style={{ 
                                        borderTopLeftRadius: '10px', 
                                        borderTopRightRadius: '10px', 
                                        width: '416px', 
                                        height: '264px', 
                                        objectFit: 'cover' 
                                    }} />
                                    <Card.Body style={{ 
                                        padding: '10px', 
                                        transition: 'background-color 0.3s', 
                                        color: '#333' 
                                    }}>
                                        <Card.Title style={{ 
                                            color: '#333', 
                                            fontSize: '1.2rem', 
                                            fontWeight: 'bold' 
                                        }}>{event.title}</Card.Title>
                                        <Card.Text style={{ 
                                            color: '#333', 
                                            fontSize: '0.9rem' 
                                        }}><BsCardText /> Description: {event.description}</Card.Text>
                                        <Card.Text style={{ 
                                            color: '#333', 
                                            fontSize: '0.9rem' 
                                        }}><BsGeoAlt /> Location: {event.location}</Card.Text>
                                        <Card.Text style={{ 
                                            color: '#333', 
                                            fontSize: '0.9rem' 
                                        }}><BsCalendar /> Date: {event.date}</Card.Text>
                                        <Card.Text style={{ 
                                            color: '#333', 
                                            fontSize: '0.9rem' 
                                        }}><BsClock /> Time: {event.time}</Card.Text>
                                        <div className="text-center">
                                            <Button onClick={() => handleAccept(event.id)} variant="success" size="sm" className="me-2">Accept</Button>
                                            <Button onClick={() => handleReject(event.id)} variant="danger" size="sm">Reject</Button>
                                        </div>
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

export default AdminDashboard;
