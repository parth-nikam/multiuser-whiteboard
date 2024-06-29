import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const socketRef = useRef();

    useEffect(() => {
        const canvas = new fabric.Canvas('whiteboard');
        canvasRef.current = canvas;

        socketRef.current = io.connect('http://localhost:5000');

        socketRef.current.on('drawing', (data) => {
            canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
        });

        canvas.on('path:created', () => {
            const json = canvas.toJSON();
            socketRef.current.emit('drawing', json);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return <canvas id="whiteboard" width={800} height={600}></canvas>;
};

export default Whiteboard;
