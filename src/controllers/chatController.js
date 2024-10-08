const Chat = require('../models/chatModel'); // Import your Chat model

// Save a message to the database
const saveChat = async (senderId, receiverId, message) => {
  try {
    const newChat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    });
    await newChat.save();
    return newChat; // Return the saved message object if needed
  } catch (error) {
    throw new Error('Error saving chat message: ' + error.message);
  }
};

// Get chat history between two users
const getChatHistory = async (currentUserId, otherUserId) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

    return chats; // Return the chat history
  } catch (error) {
    throw new Error('Error retrieving chat history: ' + error.message);
  }
};

const getUserChat = async (req, res) => {
  const { currentUserId, otherUserId } = req.body;
  try {
    const chatHistory = await getChatHistory(currentUserId, otherUserId);
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { saveChat, getUserChat };
