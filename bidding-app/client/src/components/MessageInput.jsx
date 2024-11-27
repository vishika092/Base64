import React, { useState } from 'react';

const MessageInput = ({ socket, disconnect }) => {
  const [name, setName] = useState(''); 
  const [bid, setBid] = useState('');  

  const handleSend = () => {
    if (name.trim() && bid.trim()) {
      socket.emit("bid", { fname: name, bid: +bid });
      setBid('');
    }
  };

  return (
    <>
      {disconnect && (
        <div className="disconnected-message">
          You are disconnected. Please wait to reconnect.
        </div>
      )}
      <div className="message-input">
        <div>
          <input
            type="text"
            placeholder="Enter your Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disconnect}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your Bid..."
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            disabled={disconnect}
          />
        </div>
        <button disabled={disconnect} onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
};

export default MessageInput;
