const multer = require("multer");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");


// =========================
// Multer Setup (Excel Upload)
// =========================

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null,"uploads/");
},

filename: function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage:storage}).single("excelFile");


// =========================
// Upload Controller
// =========================

exports.uploadExcel = (req,res)=>{

upload(req,res,function(err){

if(err){
return res.status(500).json(err);
}

if(!req.file){
return res.status(400).json({
message:"No Excel file uploaded"
});
}

const filePath = req.file.path;


// =========================
// Read Excel File
// =========================

const workbook = XLSX.readFile(filePath);

const sheetName = workbook.SheetNames[0];

const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet);


// =========================
// Generate PDF
// =========================

const pdfName = Date.now()+".pdf";

const pdfPath = "generated_pdfs/"+pdfName;

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream(pdfPath));

data.forEach(row=>{

doc.fontSize(16).text(`Name: ${row.FirstName || ""} ${row.LastName || ""}`);

doc.moveDown();

doc.fontSize(12).text(`Job: ${row.Job || ""}`);
doc.text(`Company: ${row.Company || ""}`);
doc.text(`Organization: ${row.Organization || ""}`);

doc.moveDown();

doc.text(`Email: ${row.Email || ""}`);
doc.text(`Phone: ${row.Phone || ""}`);
doc.text(`Website: ${row.Website || ""}`);

doc.moveDown();

doc.text(`Birthday: ${row.Birthday || ""}`);

doc.moveDown();

doc.text(`Address: ${row.Address || ""}`);
doc.text(`${row.Street || ""}`);
doc.text(`${row.City || ""}, ${row.State || ""} ${row.Zipcode || ""}`);
doc.text(`${row.Country || ""}`);

doc.moveDown();
doc.moveDown();

});

doc.end();


// =========================
// Save Upload Info to DB
// =========================

const query =
"INSERT INTO uploads (file_name,copies,status) VALUES (?,?,?)";

db.query(query,[req.file.filename,data.length,"Ready to Print"],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json({

message:"Excel uploaded and PDF generated successfully",
pdf:pdfName

});

});

});

};