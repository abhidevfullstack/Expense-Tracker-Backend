const db = require('../models');
const Expense = db.Expense;

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const expense = await Expense.create({ amount, category, date, userId: req.userId });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.userId } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const [updated] = await Expense.update({ amount, category, date }, { where: { id: req.params.id, userId: req.userId } });
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.destroy({ where: { id: req.params.id, userId: req.userId } });
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
