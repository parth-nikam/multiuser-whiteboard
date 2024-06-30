import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/styles.css';

const Host = () => {
    const [roomId, setRoomId] = useState('');

    const handleCreateRoom = () => {
        const newRoomId = uuidv4();
        setRoomId(newRoomId);
    };

    return (
        <div className="center">
            <h2>Host a Whiteboard Session</h2>
            <button onClick={handleCreateRoom} className="button">Create Room</button>
            {roomId && (
                <div>
                    <p>Room ID: {roomId}</p>
                    <Link to={`/whiteboard/${roomId}`} className="button">
                        Go to Whiteboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Host;
