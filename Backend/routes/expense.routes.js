const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Add expense (Admin, Manager)
router.post("/", auth(["admin", "manager"]), async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    companyId: req.user.companyId,
    createdBy: req.user.id
  });
  res.json(expense);
});

// View expenses (All roles)
router.get("/", auth(["admin", "manager", "agent"]), async (req, res) => {
  const expenses = await Expense.find({ companyId: req.user.companyId });
  res.json(expenses);
});

// Delete expense (Admin only)
router.delete("/:id", auth(["admin"]), async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

module.exports = router;
