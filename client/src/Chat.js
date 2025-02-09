import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server running on localhost:5000
const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Clean up the event listener on unmount
    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ddd', height: '300px', overflowY: 'scroll', padding: '10px', marginBottom: '10px' }}>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '70%', padding: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 15px', marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
}

export default Chat;
