const db = require("../config/db");


// =========================
// Get Printed Jobs
// =========================

exports.getDispatchQueue = (req, res) => {

const query =
"SELECT * FROM uploads WHERE status='Printed'";

db.query(query, (err, result) => {

if (err) {
return res.status(500).json(err);
}

res.json(result);

});

};



// =========================
// Mark Job As Dispatched
// =========================

exports.markDispatched = (req, res) => {

const id = req.params.id;

const query =
"UPDATE uploads SET status='Dispatched' WHERE upload_id=?";

db.query(query, [id], (err, result) => {

if (err) {
return res.status(500).json(err);
}

res.json({
message: "Status updated to Dispatched"
});

});

};