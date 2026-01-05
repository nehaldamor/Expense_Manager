const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {type:String,
      required:true
  },
  role: { type: String, enum: ["admin", "manager", "agent"] },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
