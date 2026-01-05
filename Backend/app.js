const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const inviteRoutes = require("./routes/invite.routes");
const expenseRoutes = require("./routes/expense.routes");
const connectDB = require("./db/db");

connectDB();
require("./cron/dailyReport");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/expense", expenseRoutes);

module.exports = app;
