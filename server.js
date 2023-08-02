// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

// Enable Cross-Origin Resource Sharing (CORS)
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"], // Replace with the URL of your React app
//   })
// );
// Event handler when a new client connects
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Event handler when the sender offers to share the screen
  socket.on("offer", (offer) => {
    console.log("Offer received from sender:", offer);
    // Broadcast the offer to all connected clients except the sender
    socket.broadcast.emit("offer", offer);
  });

  // Event handler when an ICE candidate is received
  socket.on("candidate", (candidate) => {
    console.log("ICE candidate received:", candidate);
    // Broadcast the ICE candidate to all connected clients except the sender
    socket.broadcast.emit("candidate", candidate);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Signaling server listening on port ${PORT}`);
});
