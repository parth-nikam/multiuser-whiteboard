import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const HostComponent = () => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const generateUuid = () => {
        const uuid = uuidv4();
        setRoomId(uuid);
        navigate(`/whiteboard/${uuid}`);
    };

    const copyUuid = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room ID copied to clipboard!');
    };

    return (
        <div className="host-component">
            <h2>Host Component</h2>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <button onClick={generateUuid}>Create Room</button>
            {roomId && (
                <div>
                    <p>Room ID: {roomId}</p>
                    <button onClick={copyUuid}>Copy Room ID</button>
                </div>
            )}
        </div>
    );
};

export default HostComponent;
