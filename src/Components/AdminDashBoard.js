import React, { useState, useEffect } from 'react';
import { getFirestore } from 'firebase/firestore';
import app from './FirebaseAuth';
import { collection, getDocs, deleteDoc, addDoc, doc, getDoc } from 'firebase/firestore';

function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const db = getFirestore(app); // Get Firestore object
        const eventsRef = collection(db, 'pendingEvents'); // Reference to pendingEvents collection
        const querySnapshot = await getDocs(eventsRef); // Get all documents in pendingEvents

        const pendingEventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() // Include all attributes of the event
        }));
        setPendingEvents(pendingEventsData);
      } catch (error) {
        console.error('Error fetching pending events:', error);
      }
    };

    fetchPendingEvents();
  }, []);

  const handleAccept = async (eventId) => {
    try {
      const db = getFirestore(app); // Get Firestore object
      const eventRef = doc(db, 'pendingEvents', eventId); // Reference to the event document in pendingEvents
      const eventSnapshot = await getDoc(eventRef); // Get the event document

      if (!eventSnapshot.exists()) {
        console.error('Event not found');
        return;
      }

      const eventData = eventSnapshot.data();
      await addDoc(collection(db, 'approvedEvents'), eventData); // Add event to approvedEvents
      await deleteDoc(eventRef); // Delete event from pendingEvents

      // Update state to remove the event from the display
      setPendingEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error accepting event:', error);
    }
  };

  const handleReject = async (eventId) => {
    try {
      const db = getFirestore(); // Get Firestore object
      const eventRef = doc(db, 'pendingEvents', eventId); // Reference to the event document in pendingEvents
      await deleteDoc(eventRef); // Delete event from pendingEvents

      // Update state to remove the event from the display
      setPendingEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  return (
    <div>
      <h2>Pending Events</h2>
      <ul>
        {pendingEvents.map(event => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            {/* Display other event details as needed */}
            <button onClick={() => handleAccept(event.id)}>Accept</button>
            <button onClick={() => handleReject(event.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
