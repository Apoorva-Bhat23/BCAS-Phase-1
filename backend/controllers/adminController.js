const db = require("../config/db");


// ========================
// Dashboard Statistics
// ========================

exports.getDashboardStats = (req,res)=>{

const query = `
SELECT
COUNT(*) AS total_uploads,
SUM(status='Ready to Print') AS ready_to_print,
SUM(status='Printed') AS printed,
SUM(status='Dispatched') AS dispatched
FROM uploads
`;

db.query(query,(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result[0]);

});

};



// ========================
// Get All Upload Records
// ========================

exports.getAllUploads = (req,res)=>{

const query = "SELECT * FROM uploads ORDER BY uploaded_at DESC";

db.query(query,(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};