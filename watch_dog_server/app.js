import express from "express";
import http from "http";
import { Server } from "socket.io";
import DeviceModal from "./Modals/DeviceInfo";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.get("/hi", (req, res) => {
  res.send("hello");
});




io.on("connection", (socket) => {
  console.log("client connected:", socket.id);


  socket.on("sendData", async (data) => {
    let device = await DeviceModal.findOne({macAddress : data.macAddress})
    if(!device){
      await DeviceModal.create({...data})
    }
    socket.broadcast.emit("data", data);
  });


  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
  });
});

server.listen(8080, () => console.log("server running on port 8080"));
