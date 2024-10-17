import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const TrainComponent = () => {
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:5000'); // Connect to the Socket.IO server

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (msg) => {
            console.log('Message from server:', msg);
            setMessage(msg); // Update state with received message
        });

        // Clean up the connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', 'Hello from the client!'); // Send message to server
    };

    return (
        <div>
            <h1>Train Component</h1>
            <button onClick={sendMessage}>Send Message</button>
            <p>Message from server: {message}</p>
        </div>
    );
};

export default TrainComponent;
