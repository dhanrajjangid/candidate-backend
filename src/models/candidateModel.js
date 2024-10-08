const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    deposit: { type: Number, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: "Applied" }
});

module.exports = mongoose.model('Candidate', candidateSchema);
