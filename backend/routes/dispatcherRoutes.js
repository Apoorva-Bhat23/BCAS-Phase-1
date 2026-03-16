const express = require("express");
const router = express.Router();

const dispatcherController = require("../controllers/dispatcherController");

// Get all printed files
router.get("/dispatch-queue", dispatcherController.getDispatchQueue);

// Mark file as dispatched
router.post("/mark-dispatched/:id", dispatcherController.markDispatched);

module.exports = router;