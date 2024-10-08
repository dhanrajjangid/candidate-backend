const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  userType: { type: String, default: "candidate" },
//   date: { type: Date, default: new Date() },
//   totalAmount: { type: Number, default: 0 },
//   deposit: { type: Number, default: 0 },
//   company: { type: String, default: "" },
//   role: { type: String, required: true },
//   status: { type: String, default: "Applied" },
});

module.exports = mongoose.model("Candidate", candidateSchema);
