const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// dashboard stats
router.get("/dashboard", adminController.getDashboardStats);

// all uploads
router.get("/uploads", adminController.getAllUploads);

module.exports = router;