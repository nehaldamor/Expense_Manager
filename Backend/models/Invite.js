const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  email: String,
  role: String,
  companyId: mongoose.Schema.Types.ObjectId,
  token: String,
  expiresAt: Date,
  used: { type: Boolean, default: false }
});

module.exports = mongoose.model("Invite", inviteSchema);
