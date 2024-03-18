import React, { useState } from 'react';
import backgroundImage from './pic2.jpg'; // Import background image
import Navbar from './Navbar';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage'; // Import necessary functions from Firebase storage module

function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const firebaseConfig = {
      // Fill in your Firebase config here
      apiKey: "AIzaSyDhb6bEFxpUVp4r2WsTPmSK6pR2toCqedA",
      authDomain: "eventhub-2d326.firebaseapp.com",
      projectId: "eventhub-2d326",
      storageBucket: "eventhub-2d326.appspot.com",
      messagingSenderId: "364699289060",
      appId: "1:364699289060:web:edaba5c94fbb0e804033f1",
      measurementId: "G-BR44H7GZQ6"
    };

    // Initialize Firebase inside the component
    initializeApp(firebaseConfig);
    const storage = getStorage(); // Access the storage function directly from the firebase namespace

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, 'contact_forms'); // Use the ref function to get the storage reference
        const formRef = ref(storageRef, Date.now().toString()); // Unique reference for each form submission
        try {
            await uploadString(formRef, JSON.stringify(formData), 'raw'); // Upload form data as string
            console.log('Form data uploaded successfully.');
            // Optionally, you can reset the form fields after successful submission
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error uploading form data:', error);
        }
    };

    return (
        <>
            <Navbar/>
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 60px)', // Adjusted height to accommodate navbar (assuming the navbar is 60px tall)
                padding: '20px',
                textAlign: 'center',
                color: '#fff' // Change text color to white
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>Contact Us</h1>
                <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', marginBottom: '20px' }}>
                    <p style={{ fontSize: '1rem', lineHeight: '1.4', textAlign: 'left' }}>
                        We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to say hello, don't hesitate to reach out to us.
                    </p>
                    <p style={{ fontSize: '1rem', lineHeight: '1.4', textAlign: 'left' }}>
                        You can contact us via email, phone, or by filling out the form below. Our team will get back to you as soon as possible.
                    </p>
                </div>
                <form onSubmit={handleSubmit} style={{ maxWidth: '300px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', marginBottom: '20px' }}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: 'none' }} />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: 'none' }} />
                    <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: 'none' }}></textarea>
                    <button type="submit" style={{ backgroundColor: '#2196F3', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s, transform 0.2s' }}>Send</button>
                </form>
                <p style={{ fontSize: '1rem', lineHeight: '1.4', textAlign: 'center' }}>
                    You can also email us at: <a href="mailto:imran2hosain@gmail.com">imran2hosain@gmail.com</a><br />
                    Or call us at: <a href="tel:+916000078920">+91-6000078920</a>
                </p>
            </div>
        </>
    );
}

export default ContactUsPage;
