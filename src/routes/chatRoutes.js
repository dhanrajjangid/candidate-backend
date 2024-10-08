const express = require('express');
const { getUserChat } = require('../controllers/chatController');
const router = express.Router();

// GET all chat messages
router.post('/history', getUserChat);

module.exports = router;
