// playerRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const playerController = require("../controllers/playerController");

// CRUD operations with descriptive names
router.get("/get-players", playerController.getAllPlayers);
router.get("/get-player/:id", playerController.getPlayerById);
router.put("/update-player/:id", playerController.updatePlayer);
router.delete("/delete-player/:id", playerController.deletePlayer);

// Authentication routes (assuming authController has registerPlayer and loginPlayer functions)
router.post("/register", authController.registerPlayer);
router.post("/login", authController.loginPlayer);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
