// Import mysql2 package
const mysql = require("mysql2");

// Create connection with database
const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "apoorva23",   //  mysql password
  database: "bbcpms"

});

// Connect to database
db.connect((err) => {

  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }

});

// Export connection
module.exports = db;