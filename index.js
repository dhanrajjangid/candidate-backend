const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const candidateRoutes = require("./src/routes/candidateRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const authRoutes = require("./src/routes/authRoutes");
const http = require("http"); // HTTP core module
const initializeWebSocket = require("./websocket"); // Import the WebSocket logic

require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/candidate", candidateRoutes);
app.use("/chat", chatRoutes);

// Create an HTTP server with Express
const server = http.createServer(app);

// Initialize WebSocket server
initializeWebSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
