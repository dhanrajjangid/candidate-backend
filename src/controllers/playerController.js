// playerController.js
const bcrypt = require("bcrypt");
const Player = require("../models/playerModel");

// Read (GET all players)
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ players });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch players", error: error.message });
  }
};

// Read (GET a specific player by ID)
const getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ player });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch player", error: error.message });
  }
};

// Update (PUT)
const updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const {
      name,
      email,
      phoneNumber,
      state,
      city,
    } = req.body;


    // Find the player by ID and update
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      {
        $set: {
          name,
          email,
          phoneNumber,
          state,
          city,
        },
      },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update player", error: error.message });
  }
};

// Delete (DELETE)
const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;

    const deletedPlayer = await Player.findByIdAndRemove(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player deleted successfully", player: deletedPlayer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete player", error: error.message });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
