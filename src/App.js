import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import EventList from './Components/EventList';
import AdminRegister from './Components/AdminRegister';
import AdminDashboard from './Components/AdminDashBoard';
import AdminLogin from './Components/AdminLogin';
import AddEvents from './Components/AddEvents';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/AdminDashBoard" element={<AdminDashboard />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/AddEvents" element={<AddEvents />} />
        {/* Add more routes for other components if needed */}
      </Routes>
    </Router>
  );
}

export default App;
