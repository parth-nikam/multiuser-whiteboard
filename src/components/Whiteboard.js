import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../styles.css'; // Import the CSS file for styling

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const socketRef = useRef();
    const [color, setColor] = useState('#000000'); // Initial color: black
    const [lineWidth, setLineWidth] = useState(2); // Initial line thickness: 2

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let prevX = 0;
        let prevY = 0;
        let drawing = false;

        socketRef.current = io.connect('http://localhost:5001');

        const startDrawing = (e) => {
            drawing = true;
            const rect = canvas.getBoundingClientRect();
            prevX = e.clientX - rect.left;
            prevY = e.clientY - rect.top;
        };

        const draw = (e) => {
            if (!drawing) return;
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            context.beginPath();
            context.moveTo(prevX, prevY);
            context.lineTo(currentX, currentY);
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();

            const data = {
                prevX,
                prevY,
                currX: currentX,
                currY: currentY,
                color,
                lineWidth,
            };

            socketRef.current.emit('drawing', data);

            prevX = currentX;
            prevY = currentY;
        };

        const stopDrawing = () => {
            drawing = false;
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        socketRef.current.on('drawing', (data) => {
            const { prevX, prevY, currX, currY, color, lineWidth } = data;
            context.beginPath();
            context.moveTo(prevX, prevY);
            context.lineTo(currX, currY);
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();
        });

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            socketRef.current.disconnect();
        };
    }, [color, lineWidth]);

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleLineWidthChange = (e) => {
        setLineWidth(parseInt(e.target.value));
    };

    return (
        <div className="App">
            <h1>Multiuser Whiteboard</h1>
            <canvas ref={canvasRef} width={800} height={600}></canvas>
            <div className="controls">
                <input
                    type="color"
                    className="color-picker"
                    value={color}
                    onChange={handleColorChange}
                />
                <input
                    type="range"
                    className="line-thickness"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={handleLineWidthChange}
                />
                <span>{lineWidth}</span>
            </div>
        </div>
    );
};

export default Whiteboard;
