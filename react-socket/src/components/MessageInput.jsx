import React, { useState } from 'react';

const MessageInput = ({ socket, disconnect}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
 
    if (message.trim() && typeof +message === 'number' ) {
      socket.emit("bid", {fname: "vishika", bid: +message})
      setMessage('');
    }
  };

  return (
   <>
       {disconnect && (
      <div className="disconnected-message">
        You are disconnected. Please wait to reconnect.
      </div> )}
    <div className="message-input">
      <input
        type="text"
        placeholder="Enter your Bid..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disconnect}
      />
      <button disabled={disconnect} onClick={handleSend}>Send</button>
    </div>
   </>
  );
};

export default MessageInput;
