import React, { useEffect, useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { io } from 'socket.io-client';
import Alert from './components/Alert';
import Bidding from './components/Bidding';

const socket = io('http://localhost:8080/');

function App() {
  const [messages, setMessages] = useState([]);
  const [currBid, setCurrBid] = useState(0);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [disconnect, setDisconnect] = useState(false)

  const showAlert = ({ type, message }) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ message: '', type: '' })
    }, 3000)
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('end', () => {
      console.log("connection ended");
      setDisconnect(true)
    });

    socket.on('disconnect', () => {
      console.log("disconnected ");
    });

    socket.on('bid', (data) => {
      if (data.rejected) {
        showAlert({ type: 'error', message: `Low bidding by ${data.fname}` });
        return;
      }
      setCurrBid(data.bid);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { message: `${data.fname} added a bid: ${data.bid}` }];
        
        if (prevMessages.length !== 0) {
          showAlert({ type: 'success', message: `${data.fname} added a Bid` });
        }
        return updatedMessages;
      });
     
    });
  

  }, []); 

  return (
    <div className="App">
      <div className='bidding-container'>
      <Bidding bid={currBid} />
      </div>
      <div className="chat-container">
        {alert.message && <Alert message={alert.message} type={alert.type} />}
        <ChatWindow messages={messages} />
        <MessageInput socket={socket} disconnect={disconnect} />
      </div>
    </div>
  );
}

export default App;
