const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});