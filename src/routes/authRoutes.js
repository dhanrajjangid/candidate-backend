const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Import your auth controllers

router.post("/register", authController.registerPlayer);

router.post("/login", authController.loginPlayer);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
