import React, { useEffect } from 'react'

function App() {

useEffect(() => {
  const socket = io("http://localhost:8080"); 

socket.on("connect", () => {
  console.log("connected to server:", socket.id);
});

socket.on("data", (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});
}, [])

  return (
    <div>App</div>
  )
}

export default App