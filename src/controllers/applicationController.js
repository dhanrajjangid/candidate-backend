const CandidateApplication = require("../models/applicationModel");
const Candidate = require("../models/candidateModel");

// Add a new candidate application
const addCandidateApplication = async (req, res) => {
  try {
    const { candidateId, totalAmount, deposit, company, role, status } = req.body;

    // Fetch candidate details (name, email, phoneNumber) from Candidate model
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const newApplication = new CandidateApplication({
      candidate: candidate._id,
      totalAmount,
      deposit,
      company,
      role,
      status,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application added successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ message: "Failed to add application", error: error.message });
  }
};

// Get all candidate applications
const getAllCandidateApplications = async (req, res) => {
  try {
    const applications = await CandidateApplication.find().populate("candidate", "name email phoneNumber");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

// Get a single candidate application by ID
const getCandidateApplicationById = async (req, res) => {
  try {
    const application = await CandidateApplication.findById(req.params.id).populate("candidate", "name email phoneNumber");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application", error: error.message });
  }
};

// Update a candidate application by ID
const updateCandidateApplication = async (req, res) => {
  try {
    const { totalAmount, deposit, company, role, status } = req.body;
    const application = await CandidateApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.totalAmount = totalAmount || application.totalAmount;
    application.deposit = deposit || application.deposit;
    application.company = company || application.company;
    application.role = role || application.role;
    application.status = status || application.status;

    await application.save();
    res.json({ message: "Application updated successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Failed to update application", error: error.message });
  }
};

// Delete a candidate application by ID
const deleteCandidateApplication = async (req, res) => {
  try {
    const application = await CandidateApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.remove();
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
};

module.exports = {
  addCandidateApplication,
  getAllCandidateApplications,
  getCandidateApplicationById,
  updateCandidateApplication,
  deleteCandidateApplication,
};
