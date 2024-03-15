import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import EventList from './Components/EventList';
import AdminRegister from './Components/AdminRegister';
import AdminDashboard from './Components/AdminDashBoard';
import AdminLogin from './Components/AdminLogin';
import AddEvents from './Components/AddEvents';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import Scanner from './Components/Scanner'
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryPage from './Components/CategoryPage';

function App() {
  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventlist" element={<EventList />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/AdminDashBoard" element={<AdminDashboard />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />

          <Route path="/AddEvents" element={<AddEvents />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Scanner" element={<Scanner />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Categorypage" element={<CategoryPage />} />
          {/* Add more routes for other components if needed */}
        </Routes>
      </Router>
    
  );
}

export default App;
