import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import app from './FirebaseAuth'; // Import the app object
import backgroundImage from './pic3.jpg'; // Import background image

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app); // Get the Auth object
            const { user } = await signInWithEmailAndPassword(auth, email, password); // Sign in user with email and password

            // Login successful
            console.log('User logged in successfully');

            // Set user ID in local storage
            localStorage.setItem('userId', user.uid);

            // Redirect to EventList page
            window.location.href = '/CategoryPage';

            // Reset input fields and errors
            setEmail('');
            setPassword('');
            setError('');

            // You can perform additional actions here, such as redirecting the user to another page
        } catch (error) {
            setError("Invalid Credentials");
            console.error('Error logging in:', error.message);
        }
    };

    const isEmailValid = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email.trim())) {
            setEmailError('');
            return true; // Return true if email is valid
        } else {
            setEmailError('Invalid email');
            return false; // Return false if email is invalid
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '0 50px' }}>
            <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <h2 style={{ color: '#2196F3', marginBottom: '30px', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="email" style={{ color: '#333' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => isEmailValid(email)} // Validate email format onBlur
                        style={{ marginBottom: '10px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    {emailError && <div style={{ color: 'red', marginBottom: '10px' }}>{emailError}</div>}
                    <label htmlFor="password" style={{ color: '#333' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ marginBottom: '20px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#2196F3',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            transition: 'background-color 0.3s', // Add transition effect
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow for depth
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0d84e0'} // Change background color on hover
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'} // Change back to original color on mouse leave
                    >
                        Login
                    </button>
                </form>
                {/* Add back button */}
                <button
                    onClick={() => window.location.href = '/home'} // Go back to previous page
                    style={{
                        backgroundColor: '#ccc',
                        color: '#333',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: '10px', // Add margin top to separate from login button
                        transition: 'background-color 0.3s', // Add transition effect
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow for depth
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#bfbfbf'} // Change background color on hover
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ccc'} // Change back to original color on mouse leave
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default Login;
