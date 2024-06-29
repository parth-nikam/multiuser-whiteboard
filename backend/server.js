const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createRoom', (room) => {
        socket.join(room);
        console.log(`Room created: ${room}`);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('drawing', (data) => {
        const room = data.room;
        socket.to(room).emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
