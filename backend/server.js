const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const printerRoutes = require("./routes/printerRoutes");
const dispatcherRoutes = require("./routes/dispatcherRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api/printer",printerRoutes);
app.use("/api/dispatcher", dispatcherRoutes);
app.use("/api/admin", adminRoutes);

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});