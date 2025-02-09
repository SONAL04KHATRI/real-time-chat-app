const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"  // Allow all origins (adjust in production)
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // When a client sends a message, broadcast it to all clients
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
