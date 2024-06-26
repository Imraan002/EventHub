import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './FirebaseAuth';
import eventImage from './pic2.jpg'; // Import the event image
import Navbar from './Navbar';

const categories = [
    "Art", "Music", "Dance", "Drama", "Quiz", "Fashion", "Workshop", "Social Events", "Coding"
];

function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [ampm, setAmPm] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };

    const handleAmPmChange = (event) => {
        setAmPm(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const db = getFirestore(app);
            const storage = getStorage(app);
            let imageUrl = '';

            if (image) {
                const imageRef = ref(storage, `events/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const eventsCollection = collection(db, 'pendingEvents');

            await addDoc(eventsCollection, {
                title: title,
                description: description,
                category: category,
                date: date,
                time: `${hours}:${minutes} ${ampm}`,
                location: location,
                imageUrl: imageUrl,
                status: 'pending',
            });

            alert('Event added successfully and pending for approval!');
            console.log('Event added successfully and pending for approval!');
            
            setTitle('');
            setDescription('');
            setCategory('');
            setDate('');
            setHours('');
            setMinutes('');
            setAmPm('');
            setLocation('');
            setImage(null);
        } catch (error) {
            console.error('Error adding event:', error.message);
            alert('Error adding event: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{
                display: 'flex', height: '100vh', background: `url(${eventImage}) no-repeat center center fixed`, backgroundSize: 'cover'
            }}>
                <div style={{
                    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px'
                }}>
                    <div style={{
                        maxWidth: '310px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '20px', borderRadius: '10px'
                    }}>
                        <h2 style={{
                            color: '#000', marginBottom: '20px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center'
                        }}>Add Event</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title" style={{
                                color: '#000', marginBottom: '5px', display: 'block', fontSize: '0.8rem'
                            }}>Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            />
                            <label htmlFor="description" style={{
                                color: '#000', marginBottom: '10px', display: 'block', fontSize: '0.8rem'
                            }}>Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            />
                            <label htmlFor="category" style={{
                                color: '#000', marginBottom: '10px', display: 'block', fontSize: '0.8rem'
                            }}>Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <label htmlFor="date" style={{
                                color: '#000', marginBottom: '10px', display: 'block', fontSize: '0.8rem'
                            }}>Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={handleDateChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            />
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                                <div style={{ marginRight: '5px' }}>
                                    <label htmlFor="hours" style={{
                                        color: '#000', marginBottom: '5px', display: 'block', fontSize: '0.8rem'
                                    }}>Hours:</label>
                                    <input
                                        type="number"
                                        id="hours"
                                        value={hours}
                                        min="1"
                                        max="12"
                                        onChange={handleHoursChange}
                                        required
                                        style={{
                                            width: '60px', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                        }}
                                    />
                                </div>
                                <div style={{ marginRight: '5px' }}>
                                    <label htmlFor="minutes" style={{
                                        color: '#000', marginBottom: '5px', display: 'block', fontSize: '0.8rem'
                                    }}>Minutes:</label>
                                    <input
                                        type="number"
                                        id="minutes"
                                        value={minutes}
                                        min="0"
                                        max="59"
                                        onChange={handleMinutesChange}
                                        required
                                        style={{
                                            width: '60px', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ampm" style={{
                                        color: '#000', marginBottom: '5px', display: 'block', fontSize: '0.8rem'
                                    }}>AM/PM:</label>
                                    <select
                                        id="ampm"
                                        value={ampm}
                                        onChange={handleAmPmChange}
                                        required
                                        style={{
                                            padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                            <label htmlFor="location" style={{
                                color: '#000', marginBottom: '10px', display: 'block', fontSize: '0.8rem'
                            }}>Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={handleLocationChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            />
                            <label htmlFor="image" style={{
                                color: '#000', marginBottom: '10px', display: 'block', fontSize: '0.8rem'
                            }}>Upload Image:</label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                required
                                style={{
                                    marginBottom: '10px', width: '100%', padding: '6px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000', fontSize: '0.8rem'
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="submit" style={{
                                    backgroundColor: '#2196F3', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', transition: 'background-color 0.3s', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>Add Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEvent;
