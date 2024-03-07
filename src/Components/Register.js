import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import app from './FirebaseAuth'; // Import the app object

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app); // Get the Auth object
            const userCredential = await createUserWithEmailAndPassword(auth, username, password); // Create user with email and password

            // User creation successful
            console.log('User signed up successfully:', userCredential.user);
            alert('User signed up successfully');
            // Reset input fields and errors
            setUsername('');
            setPassword('');
            setError('');

            window.location.href = '/Login'; 

            // You can perform additional actions here, such as redirecting the user to another page
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('The email address is already in use.');
            } else {
                setError(error.message); // Set error message
                console.error('Error signing up:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br /><br />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
