import React, { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, addDoc, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import QRCode from 'qrcode.react';
import { Container, Card } from 'react-bootstrap';
import Navbar from './Navbar';

function Registration() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const qrCodeRef = useRef(null);

    useEffect(() => {
        const eventId = localStorage.getItem('eventId');
        const userId = localStorage.getItem('userId');

        if (eventId && userId) {
            const registerUser = async () => {
                try {
                    const db = getFirestore(app); // Get Firestore database instance
                    const registrationsCollection = collection(db, 'registrations'); // Reference to the 'registrations' collection

                    // Check if the registration entry already exists
                    const q = query(registrationsCollection, where('eventId', '==', eventId), where('userId', '==', userId));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        console.log('Registration data already exists');
                        alert('Registration data already exists');
                        setLoading(false);
                        return; // Exit function if registration entry already exists
                    }

                    // Add registration data to the 'registrations' collection
                    await addDoc(registrationsCollection, {
                        eventId,
                        userId
                    });

                    console.log('Registration data stored successfully');

                    // Check if there are multiple entries with the same user and event ID
                    const duplicateEntriesQuery = query(registrationsCollection, where('eventId', '==', eventId), where('userId', '==', userId));
                    const duplicateEntriesSnapshot = await getDocs(duplicateEntriesQuery);
                    if (duplicateEntriesSnapshot.size > 1) {
                        // Delete one of the duplicate entries
                        const docsToDelete = duplicateEntriesSnapshot.docs.slice(1); // Keep only one document
                        docsToDelete.forEach(async (doc) => {
                            await deleteDoc(doc.ref);
                            console.log('Duplicate registration entry deleted');
                        });
                    }

                    alert("Registration successful");
                    setLoading(false);
                    // window.location.href = "/EventList";

                } catch (error) {
                    console.error('Error storing registration data:', error.message);
                    setLoading(false);
                }
            };

            registerUser();
        } else {
            console.error('Required data not found in local storage');
            setLoading(false);
        }
    }, []); // Empty dependency array to run effect only once when component mounts

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 20));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ background: '#111', minHeight: '100vh', paddingTop: '150px', padding: '100px' }}>
                <Container>
                    {loading ? (
                        <div className="text-center" style={{ color: '#fff' }}>
                            <h4>Loading...</h4>
                            <div className="progress" style={{ width: '200px', margin: 'auto' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ color: '#bbdefb', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', fontSize: '1.5rem' }}>Registration completed</h2>
                            <div className="d-flex justify-content-center">
                                <Card className="bg-white shadow" style={{ maxWidth: '400px', position: 'relative', overflow: 'hidden' }}>
                                    <Card.Body>
                                        <Card.Title className="text-center" style={{ color: '#000', fontWeight: 'bold' }}>Your Ticket</Card.Title>
                                        <div className="ticket">
                                            <div className="ticket-content">
                                                <h3>EventHub Ticket</h3>
                                                <p>Event ID: {localStorage.getItem('eventId')}</p>
                                                <p>User ID: {localStorage.getItem('userId')}</p>
                                                <div className="qr-code-container">
                                                    <QRCode value={`Event ID: ${localStorage.getItem('eventId')}, User ID: ${localStorage.getItem('userId')}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
            <style jsx>{`
                .ticket {
                    border: 2px dashed #000;
                    padding: 20px;
                    margin: 20px 0;
                    position: relative;
                    background: #fff;
                }
                .ticket:before, .ticket:after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    border: 2px solid #000;
                }
                .ticket:before {
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .ticket:after {
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .ticket-content {
                    text-align: center;
                }
                .qr-code-container {
                    margin-top: 20px;
                }
            `}</style>
        </>
    );
}

export default Registration;
