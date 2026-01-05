const express = require("express");
const crypto = require("crypto");
const Invite = require("../models/Invite");
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// Admin invites user
router.post("/", auth(["admin"]), async (req, res) => {
  const { email, role } = req.body;

  const token = crypto.randomBytes(32).toString("hex");

  const invite = await Invite.create({
    email,
    role,
    companyId: req.user.companyId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });

  const link = `${process.env.FRONTEND_URL}/signup?token=${token}`;

  await sendEmail(
    email,
    "Company Invitation",
    `<p>You are invited as <b>${role}</b></p>
     <a href="${link}">Click to Join</a>`
  );

  res.json({ message: "Invite sent successfully" });
});

module.exports = router;
