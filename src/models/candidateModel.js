const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  userType: { type: String, default: "candidate" },
});

module.exports = mongoose.model("Candidate", candidateSchema);
