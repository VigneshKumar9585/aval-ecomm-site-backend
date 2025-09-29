const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // from .env
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
