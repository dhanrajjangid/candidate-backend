// playerController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");

const ejs = require('ejs');
const path = require('path');
const { transporter } = require('../config/email.js');
require("dotenv").config();

const sendPasswordResetEmail = async (resetUrl, player) => {
  const userEmail = player.email || null;
  const controllersDir = path.join(__dirname, '..');
  
  // Remove controllers from the desired path
  const desiredPath = 'view/resetPassword.ejs';
  const orderConfirmationPath = path.join(controllersDir, desiredPath);
  const content = await ejs.renderFile(orderConfirmationPath, { resetUrl, player });
  
  const mailOptions = {
    from: '"Dhanraj Jangid" <dhanraj37654321@gmail.com>',
    to: userEmail || 'factclubinfo@gmail.com',
    subject: `Reset Password Link - Shop Minimal`,
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
}

const registerPlayer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check for existing email before saving
    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: "Email already exists. Please try a different email address." });
    }

    const newPlayer = new Player({
      name,
      email,
      password: hashedPassword,
    });
    await newPlayer.save();
    
    // Generate a JWT token for authentication
    const token = jwt.sign({ playerId: newPlayer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.json({
      message: "Player registered successfully",
      data: { email: newPlayer.email, name: newPlayer.name, token, player_id: newPlayer._id },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register player", error: error.message });
  }
};

const loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the player by email
    const player = await Player.findOne({ email });

    if (!player) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, player.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Player logged in successfully",
      data: { email: player.email, name: player.name, token, player_id: player._id },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login player", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if player with given email exists
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(404).json({ message: "Player not found with this email" });
    }

    // Generate a reset token with expiry
    const resetToken = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    // Save the reset token and expiry in the player document
    player.resetToken = resetToken;
    player.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

    await player.save();

    const resetUrl = `https://minimal-react.netlify.app/reset-password/${resetToken}`;

    await sendPasswordResetEmail(resetUrl, player);


    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reset email", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, resetToken } = req.body;

    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    
    if (decodedToken.exp * 1000 < Date.now()) {
      return res.status(400).json({ message: "Reset token has expired. Please request a new one." });
    }

    // Find the player by decoded player ID
    const player = await Player.findById(decodedToken.playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update password and clear reset token fields
    const hashedPassword = await bcrypt.hash(password, 10);
    player.password = hashedPassword;
    player.resetToken = undefined;
    player.resetTokenExpiry = undefined;

    await player.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};


module.exports = { registerPlayer, loginPlayer, forgotPassword, resetPassword };
