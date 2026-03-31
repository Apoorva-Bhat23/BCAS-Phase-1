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
// Generate PDF (20 Cards Grid Layout)
// =========================

const pdfName = Date.now() + ".pdf";
const pdfPath = "generated_pdfs/" + pdfName;

const doc = new PDFDocument({
size: "A3",
margin: 20
});

doc.pipe(fs.createWriteStream(pdfPath));

const cardWidth = 150;
const cardHeight = 120;

const cardsPerRow = 5;
const cardsPerColumn = 4;

let x = 20;
let y = 20;

let count = 0;

data.forEach(row => {
    const copies = Number(row["Copies"] || row["copies"] || 1);

for(let i=0;i<copies;i++){

doc.rect(x, y, cardWidth, cardHeight).stroke();

doc.fontSize(10).text(`${row.FirstName || ""} ${row.LastName || ""}`, x + 10, y + 10);

doc.fontSize(9).text(`${row.Job || ""}`, x + 10, y + 25);

doc.text(`${row.Company || ""}`, x + 10, y + 40);

doc.text(`Email: ${row.Email || ""}`, x + 10, y + 55);

doc.text(`Phone: ${row.Phone || ""}`, x + 10, y + 70);

doc.text(`${row.Website || ""}`, x + 10, y + 85);

count++;

x += cardWidth + 10;

if (count % cardsPerRow === 0) {
x = 20;
y += cardHeight + 10;
}

if (count % (cardsPerRow * cardsPerColumn) === 0) {
doc.addPage();
x = 20;
y = 20;
}
}
});

doc.end();


// =========================
// Save Upload Info to DB
// =========================

const query =
"INSERT INTO uploads (file_name,copies,status) VALUES (?,?,?)";
const totalCopies = data.reduce((sum,row)=> sum + Number(row.Copies || 1),0);

db.query(query,[req.file.filename,totalCopies,"Ready to Print"],(err,result)=>{

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