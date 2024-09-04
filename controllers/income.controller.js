const db = require('../models');
const Income = db.incomes;

exports.createIncome = async (req, res) => {
  try {
    const { amount, source, date } = req.body;
    const income = await Income.create({ amount, source, date, userId: req.userId });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({ where: { userId: req.userId } });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { amount, source, date } = req.body;
    const [updated] = await Income.update({ amount, source, date }, { where: { id: req.params.id, userId: req.userId } });
    if (!updated) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.destroy({ where: { id: req.params.id, userId: req.userId } });
    if (!deleted) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
