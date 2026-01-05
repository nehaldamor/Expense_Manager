// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS
//   }
// });

// module.exports = async (to, subject, html, attachments = []) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to,
//       subject,
//       html,
//       attachments
//     });
//     console.log("Email sent to:", to);
//   } catch (err) {
//     console.error("Email error:", err);
//   }
// };


import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (to, subject, message) => {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // ✅ Correct way for new SDK
    apiInstance.authentications["apiKey"].apiKey = process.env.SMTP_PASS;

    const sendSmtpEmail = {
      sender: { name: "verifyaccount", email: "nehaldamor77@gmail.com" }, // verified sender
      to: [{ email: to }],
      subject,
      htmlContent: `<p>${message}</p>`,
      attachments
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log("✅ Email sent successfully:", response.messageId || response);
  } catch (error) {
    console.error("❌ Email sending failed:", error.response?.text || error);
  }
};

