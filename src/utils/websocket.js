// src/utils/websocket.js
const socket = process.env.REACT_APP_SOCKET_URL || 'wss://mern-app-railway.vercel.app/ws';// Replace with your WebSocket URL

const connectWebSocket = () => {
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('Message received:', event.data);
    // Handle incoming messages here
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export { connectWebSocket, socket };
