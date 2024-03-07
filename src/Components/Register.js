import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import { doc, setDoc, getFirestore } from 'firebase/firestore'; // Import Firestore methods
import app from './FirebaseAuth'; // Import the app object

// Import statements remain the same

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
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

    const handleInstitutionChange = (event) => {
        setInstitution(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const db = getFirestore(app);
            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, {
                email:email,
                password:password,
                name: name,
                institution: institution,
                role: 'user',
            });

            console.log('User signed up successfully:', userCredential.user);
            alert('User signed up successfully. You can now login.');
            
            // Clear form fields
            setEmail('');
            setPassword('');
            setName('');
            setInstitution('');
            setError('');

            // Redirect to login page
            window.location.href = '/Login';
        } catch (error) {
            setError(error.message);
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    minLength={6} // Example: Minimum password length
                    required
                />
                <br /><br />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <br /><br />
                <label htmlFor="institution">Institution:</label>
                <input
                    type="text"
                    id="institution"
                    value={institution}
                    onChange={handleInstitutionChange}
                    required
                />
                <br /><br />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
