const db = require("../config/db");


// =========================
// Get All Ready To Print Files
// =========================

exports.getPrintQueue = (req,res)=>{

const query =
"SELECT * FROM uploads WHERE status='Ready to Print'";

db.query(query,(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};



// =========================
// Mark File As Printed
// =========================

exports.markPrinted = (req,res)=>{

const id = req.params.id;

const query =
"UPDATE uploads SET status='Printed' WHERE upload_id=?";

db.query(query,[id],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json({
message:"Status updated to Printed"
});

});

};