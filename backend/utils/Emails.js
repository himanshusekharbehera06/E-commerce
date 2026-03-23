// backend/email.js
const nodemailer = require("nodemailer");

// Create a transporter to connect to Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for TLS
  auth: {
    user: "hsekhar205@gmail.com",
    pass: "gtlf glwy nhxn agji", // Gmail App Password
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "hsekhar205@gmail.com",       // sender
      to,                                 // recipient (from route)
      subject,                            // email subject
      text,                               // email body
    });
    console.log("Email sent:", info.response); // logs info if sent
  } catch (err) {
    console.error("Failed to send email:", err); // logs errors if any
  }
};

// Export the function so your route can use it
module.exports = sendEmail;