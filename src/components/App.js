import React, { useState } from 'react';
import Whiteboard from './Whiteboard';

const App = () => {
    const [room, setRoom] = useState('');
    const [inRoom, setInRoom] = useState(false);

    const handleCreateRoom = () => {
        setInRoom(true);
    };

    const handleJoinRoom = () => {
        setInRoom(true);
    };

    return (
        <div className="App">
            {!inRoom ? (
                <div>
                    <h1>Multiuser Whiteboard</h1>
                    <input
                        type="text"
                        placeholder="Enter room name"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>
            ) : (
                <Whiteboard room={room} />
            )}
        </div>
    );
};

export default App;
