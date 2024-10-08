const Candidate = require("../models/candidateModel");

// Add a new candidate
const addCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res
      .status(201)
      .json({ message: "Candidate added successfully", candidate });
  } catch (error) {
    res.status(400).json({ message: "Error adding candidate", error });
  }
};

// Update a candidate
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { addDeposit } = req.body;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    let requestData = req.body
    if (addDeposit > 0) {
      delete requestData.deposit
      candidate.deposit += addDeposit;
    }

    // Merge other request body fields (excluding deposit and addDeposit)
    Object.assign(candidate, requestData);

    const updatedCandidate = await candidate.save();

    res.status(200).json({
      message: "Candidate updated successfully",
      updatedCandidate,
    });
  } catch (error) {
    console.log(error, "error is consoled")
    res.status(400).json({ message: "Error updating candidate", error });
  }
};


// Delete a candidate
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting candidate", error });
  }
};

// Get all candidates
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({data: candidates});
  } catch (error) {
    res.status(400).json({ message: "Error fetching candidates", error });
  }
};

// Get a candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(400).json({ message: "Error fetching candidate", error });
  }
};
module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
};
