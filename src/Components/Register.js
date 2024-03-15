import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import app from './FirebaseAuth';
import backgroundImage from './pic13.jpg';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        isEmailValid(newEmail);
        setEmailError('');
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

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!isEmailValid(email)) {
                setEmailError('Invalid email');
                return;
            }

            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const db = getFirestore(app);
            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, {
                email: email,
                password: password,
                name: name,
                institution: institution,
                gender: gender,
                role: 'user',
            });

            console.log('User signed up successfully:', userCredential.user);
            alert('User signed up successfully. You can now login.');
            
            // Clear form fields
            setEmail('');
            setPassword('');
            setName('');
            setInstitution('');
            setGender('');
            setError('');

            // Redirect to login page
            window.location.href = '/Login';
        } catch (error) {
            setError(error.message);
            console.error('Error signing up:', error.message);
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
            <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <h2 style={{ color: '#2196F3', marginBottom: '30px', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="email" style={{ color: '#333' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => isEmailValid(email)}
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
                        style={{ marginBottom: '10px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        minLength={6}
                        required
                    />
                    <label htmlFor="name" style={{ color: '#333' }}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        style={{ marginBottom: '10px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    <label htmlFor="institution" style={{ color: '#333' }}>Institution:</label>
                    <input
                        type="text"
                        id="institution"
                        value={institution}
                        onChange={handleInstitutionChange}
                        style={{ marginBottom: '10px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    <label htmlFor="gender" style={{ color: '#333' }}>Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        style={{ marginBottom: '20px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
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
                            transition: 'background-color 0.3s',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow for depth
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0d84e0'} // Change background color on hover
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'} // Change back to original color on mouse leave
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
