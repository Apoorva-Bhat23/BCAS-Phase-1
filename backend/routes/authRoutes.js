const express = require("express");
const router = express.Router();

// import login controller
const { login } = require("../controllers/authController");

// Login API route
router.post("/login", login);

// export router
module.exports = router;