import React from 'react';
import { Link } from 'react-router-dom';
import { RiCamera2Line } from 'react-icons/ri'; // Import camera icon from react-icons
import backgroundImage from './pic10.jpg'; // Import background image

function Home() {
    return (
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
            color: '#000' // Change text color to black
        }}>
            <style>
                {`
                .home-button {
                    background-color: #2196F3;
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;
                }

                .home-button:hover {
                    background-color: #0d8ae3;
                    transform: translateY(-2px);
                }
                `}
            </style>
            <h1 style={{ fontSize: '3rem', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>EventHub</h1>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>Welcome to EventHub</h3>
                <p style={{ marginBottom: '20px' }}>Explore exciting events and connect with like-minded individuals.</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/login" style={{ textDecoration: 'none', marginRight: '10px' }}>
                        <button className="home-button">Login</button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none', marginRight: '10px' }}>
                        <button className="home-button">Signup</button>
                    </Link>
                </div>
            </div>
            {/* Move the scanner link outside the above div */}
            <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#2196F3', fontWeight: 'bold' }}>Camera</p>
                <Link to="/scanner" style={{ textDecoration: 'none' }}> {/* Add Link to scanner route */}
                    <RiCamera2Line style={{ fontSize: '24px', color: '#2196F3', cursor: 'pointer' }} />
                </Link>
            </div>
        </div>
    );
}

export default Home;
