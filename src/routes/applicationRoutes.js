const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.post("/add", applicationController.addCandidateApplication);

router.get("/", applicationController.getAllCandidateApplications);

router.get("/:id", applicationController.getCandidateApplicationById);

router.put("/update/:id", applicationController.updateCandidateApplication);

router.delete("/delete/:id", applicationController.deleteCandidateApplication);

module.exports = router;
