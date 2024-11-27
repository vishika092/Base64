import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import Alert from './components/Alert';
import Bidding from './components/Bidding';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, {message }]);
  };

  return (
    <div className="App">
      <div className="chat-container">
        {/* <Alert message={message} type={}/> */}
        <Bidding/>
        <ChatWindow messages={messages} />
        <MessageInput addMessage={addMessage} />
      </div>
    </div>
  );
}

export default App;
