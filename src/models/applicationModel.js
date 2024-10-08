const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  date: { type: Date, default: new Date() },
  totalAmount: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  company: { type: String, default: "" },
  role: { type: String, required: true },
  status: { type: String, default: "Applied" },
});

module.exports = mongoose.model("CandidateApplication", applicationSchema);
