import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import { doc, setDoc, getFirestore } from 'firebase/firestore'; // Import Firestore methods
import app from './FirebaseAuth'; // Import the app object

function AdminRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAadharNumberChange = (event) => {
        setAadharNumber(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app); // Get the Auth object
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password

            // Store additional user information in Firestore
            const db = getFirestore(app);
            const userRef = doc(db, 'admins', userCredential.user.uid);
            await setDoc(userRef, {
                name: name,
                email: email,
                aadharNumber: aadharNumber,
                phoneNumber: phoneNumber,
                password:password,
                role: 'admin'
            });

            // Admin creation successful
            console.log('Admin registered successfully:', userCredential.user);
            alert('Admin registered successfully');
            // Reset input fields and errors
            setEmail('');
            setPassword('');
            setName('');
            setAadharNumber('');
            setPhoneNumber('');
            setError('');
            window.location.href = '/AdminLogin';
            // You can perform additional actions here, such as redirecting the user to another page
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('The email address is already in use.');
            } else {
                setError(error.message); // Set error message
                console.error('Error registering admin:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Admin Registration</h2>
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
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <br /><br />
                <label htmlFor="aadharNumber">Aadhar Number:</label>
                <input
                    type="text"
                    id="aadharNumber"
                    value={aadharNumber}
                    onChange={handleAadharNumberChange}
                />
                <br /><br />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <br /><br />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AdminRegister;
