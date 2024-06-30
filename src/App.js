import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Host from './components/Host';
import Participant from './components/Participant';
import Whiteboard from './components/Whiteboard';
import './styles/styles.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <header className="header">
                    <h1>Multiuser Whiteboard</h1>
                </header>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/host" element={<Host />} />
                        <Route path="/participant" element={<Participant />} />
                        <Route path="/whiteboard/:roomId" element={<Whiteboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
