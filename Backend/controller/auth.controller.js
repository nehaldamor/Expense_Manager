const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const Invite = require("../models/Invite");
const VerifyToken = require("../models/VerifyToken");
const crypto = require("crypto");
const {sendEmail} = require("../utils/sendEmail");

module.exports.signup=async (req,res,next)=> {
  const { name, email, password, token } = req.body;
  let companyId, role = "admin";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    if (token) {
    const invite = await Invite.findOne({ token, used: false });
    if (!invite) return res.status(400).json({ message: "Invalid invite" });

    companyId = invite.companyId;
    role = invite.role;
    invite.used = true;
    await invite.save();
  } else {
    const company = await Company.create({ name: name + " Company" });
    companyId = company._id;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    companyId,
    verified: false
  });

  // 🔐 verification token
  const verifyToken = crypto.randomBytes(32).toString("hex");

  await VerifyToken.create({
    userId: user._id,
    token: verifyToken,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });

  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

  await sendEmail(
    email,
    "Verify your email",
    `
      <h3>Email Verification</h3>
      <p>Click below to verify your email</p>
      <a href="${verifyLink}">Verify Email</a>
    `
  );

  res.json({ message: "Signup successful. Please verify your email." });
}
module.exports.login=async (req,res,next)=> {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });
  if (!user.verified) {
  return res.status(401).json({
    message: "Please verify your email before login"
  });
}

  const token = jwt.sign(
    { id: user._id, role: user.role, companyId: user.companyId },
    process.env.JWT_SECRET
  );


  res.json({ user,token });
}

module.exports.verifyEmail=async (req,res,next)=> {
  const { token } = req.query;

  const record = await VerifyToken.findOne({ token });
  if (!record) return res.status(400).send("Invalid or expired token");

  const user = await User.findById(record.userId);
  if (!user) return res.status(404).send("User not found");

  user.verified = true;
  await user.save();
  await record.deleteOne();

  res.send("Email verified successfully. You can login now.");

}
