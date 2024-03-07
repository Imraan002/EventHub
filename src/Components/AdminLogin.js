import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './FirebaseAuth';


function AdminLogin() {
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
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);

            console.log('Admin logged in successfully');
            alert("Admin logged in successfully");
           window.location.href = '/AdminDashBoard'; // Redirect to admin dashboard
        } catch (error) {
            setError(error.message);
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
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

export default AdminLogin;
