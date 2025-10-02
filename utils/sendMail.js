const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const sendMail = async (to, subject, html) => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL_USER,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });
//     await transporter.sendMail({
//       from: `"My App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });
//     console.log("📧 Email sent:", to);
//   } catch (err) {
//     console.error("❌ Email send error:", err.message);
//   }
// };
// module.exports = sendMail;

 const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use SMTP config
       auth: {
      user: 'abrar.ultragits@gmail.com',
      pass: 'jqyngxvebzupmyck',
    },
    });

    await transporter.sendMail({
      from: `"AVAL AVENUE" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};

module.exports = sendEmail;
