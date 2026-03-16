const express = require("express");
const router = express.Router();

const printerController = require("../controllers/printerController");

// get all ready to print files
router.get("/print-queue", printerController.getPrintQueue);

// update status to printed
router.post("/mark-printed/:id", printerController.markPrinted);

module.exports = router;