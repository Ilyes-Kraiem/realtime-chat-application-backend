const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: [CLIENT_URL],
    credentials: true,
  },
});

const onlineUsers = new Set();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("setup", (userData) => {
    if (!userData?._id) return;

    const userId = userData._id.toString();
    socket.userId = userId;

    socket.join(userId); 
    socket.emit("connected");

    onlineUsers.add(userId);
    io.emit("user online", userId);
    socket.emit("online users", Array.from(onlineUsers));

    console.log("✅ setup ok, user joined personal room:", userId);
  });

  socket.on("join chat", (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log("📌 joined chat room:", roomId);
  });

  socket.on("typing", (roomId) => {
    if (!roomId) return;
    socket.to(roomId).emit("typing");
  });

  socket.on("stop typing", (roomId) => {
    if (!roomId) return;
    socket.to(roomId).emit("stop typing");
  });

  socket.on("new message", (newMessage) => {
    try {
      const chatId = newMessage?.chat?._id;
      if (!chatId) return;

      socket.to(chatId).emit("message received", newMessage);
    } catch (err) {
      console.log("❌ new message socket error:", err.message);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 socket disconnected:", socket.id, "reason:", reason);

    if (socket.userId) {
      const userId = socket.userId.toString();
      onlineUsers.delete(userId);
      io.emit("user offline", userId);
      console.log("⚪ user offline:", userId);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
