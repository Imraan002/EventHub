import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import EventList from './Components/EventList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventlist" element={<EventList />} />
        {/* Add more routes for other components if needed */}
      </Routes>
    </Router>
  );
}

export default App;
