import React, { useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import app from './FirebaseAuth'; // Import app from FirebaseAuth

function Registration() {
    useEffect(() => {

        const eventId = localStorage.getItem('eventId');
        const userId = localStorage.getItem('userId');

        if (eventId && userId) {
            const registerUser = async () => {
                try {
                    const db = getFirestore(app); // Get Firestore database instance
                    const registrationsCollection = collection(db, 'registrations'); // Reference to the 'registrations' collection

                    // Add registration data to the 'registrations' collection
                    await addDoc(registrationsCollection, {

                        eventId,
                        userId
                    });

                    console.log('Registration data stored successfully');

                    // Check if there are any existing duplicate entries and delete them
                    const q = query(registrationsCollection, where('eventId', '==', eventId), where('userId', '==', userId));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(async (doc) => {
                            await deleteDoc(doc.ref);
                        });
                    }

                    alert("Registration successful");
                    window.location.href = "/EventList";

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
        </div>
    );
}

export default Registration;
