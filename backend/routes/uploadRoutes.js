const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploadController");

// route for uploading excel
router.post("/upload", uploadController.uploadExcel);

module.exports = router;