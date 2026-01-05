const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (to, subject, html, attachments = []) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
      attachments
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email error:", err);
  }
};
