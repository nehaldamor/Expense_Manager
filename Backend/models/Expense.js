const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  companyId: mongoose.Schema.Types.ObjectId,
  createdBy: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
