const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "yourmail@gmail.com",
pass: "yourapppassword"
}
});

const sendPrintEmail = async (email,name) => {

const mailOptions = {
from: "yourmail@gmail.com",
to: email,
subject: "Business Card Status",
text: `Dear ${name},

Your business cards have been printed successfully.
They will be dispatched soon.

Thank you`
};

await transporter.sendMail(mailOptions);

};

module.exports = sendPrintEmail;