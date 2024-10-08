const Chat = require("./src/models/chatModel"); // Import your Chat model
const socketIO = require("socket.io");

async function saveChat(newMessageRecieved) {
  const { senderId, receiverId, message } = newMessageRecieved;
  try {
    const newChat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    });
    console.log(newChat, "<<<<<<<<<<<<<<<<<<<<")
    await newChat.save();
  } catch (error) {
    console.error("Error saving chat message:", error.message);
  }
}

function initializeWebSocket(server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
      socket
        .in(newMessageRecieved.senderId)
        .emit("message recieved", newMessageRecieved);
      saveChat(newMessageRecieved);
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
}

module.exports = initializeWebSocket;
