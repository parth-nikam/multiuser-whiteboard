import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [room, setRoom] = useState('');
    const [inRoom, setInRoom] = useState(false);

    const handleCreateRoom = () => {
        const newRoom = uuidv4();
        setRoom(newRoom);
    };

    const handleJoinRoom = () => {
        setInRoom(true);
    };

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(room);
        alert('Room ID copied to clipboard!');
    };

    return (
        <div className="App">
            {!inRoom ? (
                <div>
                    <h1>Multiuser Whiteboard</h1>
                    <input
                        type="text"
                        placeholder="Enter room name or create a new room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    {room && (
                        <button onClick={handleCopyRoomId}>Copy Room ID</button>
                    )}
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>
            ) : (
                <Whiteboard room={room} />
            )}
        </div>
    );
};

export default App;
