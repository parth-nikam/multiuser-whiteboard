import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
    return (
        <div className="center">
            <h2>Welcome to Multiuser Whiteboard</h2>
            <div>
                <Link to="/host" className="button">Host</Link>
                <Link to="/participant" className="button">Participant</Link>
            </div>
        </div>
    );
};

export default Home;
