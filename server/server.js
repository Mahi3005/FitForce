const express = require("express");
const connectToMongoDB = require("./db/db");
const PORT = 5000;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectToMongoDB();
app.use(express.json());
app.use(cors());

const UserRouter = require("./routes/UserRouter");
app.use("/users", UserRouter);

// Socket Settings

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("chat message", (msg) => {
    console.log("Received message:", msg);
    // Broadcast the message to all connected clients
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
