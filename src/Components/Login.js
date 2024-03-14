import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import app from './FirebaseAuth'; // Import the app object

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            alert("logged in successfully");

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
            // An error occurred during login
            setError(error.message); // Set error message
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
