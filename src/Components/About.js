import React from 'react';
import backgroundImage from './pic2.jpg'; // Import background image
import Navbar from './Navbar';

function AboutPage() {
    return (
        <>
            <Navbar />
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center',
                color: '#fff' // Change text color to white
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>About Us</h1>
                <div style={{ maxWidth: '800px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)', marginBottom: '20px' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left' }}>
                        EventHub is a comprehensive event management platform designed to make organizing and attending events easier and more enjoyable. Our mission is to connect people with their passions and interests through unforgettable experiences.
                    </p>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left' }}>
                        With EventHub, event organizers can effortlessly create and promote their events, manage attendees, and track performance metrics. Attendees can discover a diverse range of events, purchase tickets, and engage with fellow participants before, during, and after the event.
                    </p>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left' }}>
                        Our team is dedicated to providing a seamless and user-friendly experience for both organizers and attendees. Whether you're planning a small community gathering or a large-scale conference, EventHub has the tools and resources to help you succeed.
                    </p>
                </div>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center' }}>
                    Contact us at: contact@eventhub.com
                </p>
            </div>
        </>
    );
}

export default AboutPage;
