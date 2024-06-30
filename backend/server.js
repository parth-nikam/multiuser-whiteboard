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

const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ roomId }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = {
                userCount: 0,
            };
        }

        socket.join(roomId);
        rooms[roomId].userCount++;
        io.to(roomId).emit('userCount', rooms[roomId].userCount);

        socket.on('drawing', (data) => {
            io.to(roomId).emit('drawing', data);
        });

        socket.on('disconnect', () => {
            rooms[roomId].userCount--;
            io.to(roomId).emit('userCount', rooms[roomId].userCount);
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
