const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const Invite = require("../models/Invite");
const { signup,login,verifyEmail } = require("../controller/auth.controller");
const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login",login );

router.get("/verify-email",verifyEmail) 

module.exports = router;
