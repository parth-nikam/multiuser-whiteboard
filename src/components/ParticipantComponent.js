import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantComponent = () => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        navigate(`/whiteboard/${roomId}`);
    };

    return (
        <div>
            <h2>Participant Component</h2>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Room ID:</label>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <br />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    );
};

export default ParticipantComponent;
