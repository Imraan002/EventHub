import React, { useEffect, useRef } from 'react';
import { getFirestore, collection, addDoc, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth
import QRCode from 'qrcode.react';

function Registration() {
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
                    // window.location.href = "/EventList";

                } catch (error) {
                    console.error('Error storing registration data:', error.message);
                }
            };

            registerUser();
        } else {
            console.error('Required data not found in local storage');
        }
    }, []); // Empty dependency array to run effect only once when component mounts

    return (
        <div>
            <h3>Registration completed</h3>
            {/* You can add more content here if needed */}
            <div ref={qrCodeRef}>
                <QRCode value={`Event ID: ${localStorage.getItem('eventId')}, User ID: ${localStorage.getItem('userId')}`} />
            </div>
        </div>
    );
}

export default Registration;
