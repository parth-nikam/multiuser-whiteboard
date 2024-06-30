import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Participant = () => {
    const [roomId, setRoomId] = useState('');

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value);
    };

    return (
        <div className="center">
            <h2>Join a Whiteboard Session</h2>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={handleRoomIdChange}
                className="input"
            />
            {roomId && (
                <Link to={`/whiteboard/${roomId}`} className="button">
                    Join Room
                </Link>
            )}
        </div>
    );
};

export default Participant;
