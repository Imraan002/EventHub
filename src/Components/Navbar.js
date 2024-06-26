import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/Home'
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '4px' }}>
      <style>
        {`
          .navbar-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .navbar-logo {
            margin: 0;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            margin-right: auto; /* Push the logo to the left */
          }

          .navbar-links {
            display: flex;
            align-items: center;
            margin-right: 20px; /* Add margin to separate links from the logout button */
          }

          .navbar-links a {
            color: #fff;
            text-decoration: none;
            padding: 10px;
            font-size: 16px;
            font-family: 'Arial', sans-serif;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            transition: background-color 0.3s; /* Add transition effect */
          }

          .navbar-links a:hover {
            background-color: #555; /* Change background color on hover */
          }

          .menu-icon {
            display: none; /* Initially hide the hamburger icon */
            cursor: pointer;
            color: #fff;
            font-size: 24px;
          }

          .logout-button {
            background-color: #ff5252; /* Red color */
            color: #fff;
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            font-weight: bold;
            transition: background-color 0.3s; /* Add transition effect */
          }

          .logout-button:hover {
            background-color: #ff1744; /* Darker red on hover */
          }

          /* Media query for small screens (up to 600px) */
          @media screen and (max-width: 600px) {
            .navbar-links {
              display: none; /* Hide normal navbar links */
            }

            .menu-icon {
              display: block; /* Display hamburger icon */
            }

            .navbar-links.open {
              display: flex; /* Show navbar links when menu is open */
              flex-direction: column;
            }
          }
        `}
      </style>

      <div className="navbar-container">
        <h1 className="navbar-logo">EventHub</h1>
        {/* Display hamburger icon only on small screens */}
        <div className="menu-icon" onClick={toggleNavbar}>
          {isOpen ? '❌' : '☰'}
        </div>
        {/* Display normal navbar links on large screens */}
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <a href="/CategoryPage">Home</a>
          <a href="/About">About</a>
          <a href="/Contact">Contact</a>
          <a href="/Profile">Profile</a>
        </div>
        {/* Logout button */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
