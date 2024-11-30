const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'wss://mern-app-railway.vercel.app/ws';

let socket;

const connectWebSocket = () => {
  // Create a WebSocket instance
  socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('Message received:', event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export { connectWebSocket, socket };
