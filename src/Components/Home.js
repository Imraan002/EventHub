import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Home() {
    return (
        <div>
            <h3>Home</h3>

            {/* Link to the Login component */}
            <Link to="/login">
                <button>Login</button>
            </Link>

            {/* Link to the Register component */}
            <Link to="/register">
                <button>Signup</button>
            </Link>
        </div>
    );
}

export default Home;
