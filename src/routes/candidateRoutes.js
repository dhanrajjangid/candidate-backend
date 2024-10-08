const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.post("/add", candidateController.addCandidate);

router.put("/update/:id", candidateController.updateCandidate);

router.delete("/delete/:id", candidateController.deleteCandidate);

router.get("/getCandidates", candidateController.getAllCandidates);

router.get("/:id", candidateController.getCandidateById);

module.exports = router;
