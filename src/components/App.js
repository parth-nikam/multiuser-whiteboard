import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import HostComponent from './HostComponent';
import ParticipantComponent from './ParticipantComponent';
import Whiteboard from './Whiteboard';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/host" element={<HostComponent />} />
                <Route path="/participant" element={<ParticipantComponent />} />
                <Route path="/whiteboard/:roomId" element={<Whiteboard />} />
            </Routes>
        </Router>
    );
};

const Home = () => (
    <div>
        <h1>Multiuser Whiteboard</h1>
        <div>
            <Link to="/host">Host</Link>
        </div>
        <div>
            <Link to="/participant">Participant</Link>
        </div>
    </div>
);

export default App;
