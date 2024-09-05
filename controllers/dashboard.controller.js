const { Income, Expense } = require('../models');
const { Sequelize } = require('sequelize');
// Controller to get total income, total expense, and available balance
exports.getFinanceSummary = async (req, res) => {
  const userId = req.userId; // Retrieve user ID from the token (set by auth middleware)

  try {
    // Step 1: Fetch total income for the user
    const totalIncome = await Income.sum('amount', {
      where: { userId }, // Sum income for the logged-in user
    });

    // Step 2: Fetch total expense for the user
    const totalExpense = await Expense.sum('amount', {
      where: { userId }, // Sum expenses for the logged-in user
    });

    // Handle cases where sum returns null (no records found)
    const incomeSum = totalIncome || 0;
    const expenseSum = totalExpense || 0;

    // Step 3: Calculate available balance
    const availableBalance = incomeSum - expenseSum;

    // Step 4: Return the calculated values
    res.status(200).json({
      totalIncome: incomeSum,
      totalExpense: expenseSum,
      availableBalance: availableBalance,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard data' });
  }
};

exports.getIncomeBySource = async (req, res) => {
    const userId = req.userId; // Retrieve userId from auth middleware
  
    try {
      // Fetch total income grouped by source for the user
      const incomeBySource = await Income.findAll({
        attributes: [
          'source', 
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalIncome']
        ],
        where: { userId }, // Only consider income for the logged-in user
        group: ['source']  // Group the results by 'source'
      });
  
      // Convert the result to a JSON object where key is the source and value is the total income
      const incomeBySourceObj = {};
      incomeBySource.forEach(income => {
        incomeBySourceObj[income.source] = income.dataValues.totalIncome;
      });
  
      // Return the result as a JSON object
      res.status(200).json(incomeBySourceObj);
    } catch (error) {
      console.error('Error fetching income by source:', error);
      res.status(500).json({ message: 'Server error while fetching income by source' });
    }
  };


 exports.getExpensesByCategory = async (req, res) => {
    const userId = req.userId; // Retrieve userId from auth middleware
  
    try {
      // Fetch total expenses grouped by category for the user
      const expensesByCategory = await Expense.findAll({
        attributes: [
          'category', 
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalExpense']
        ],
        where: { userId }, // Only consider expenses for the logged-in user
        group: ['category']  // Group the results by 'category'
      });
  
      // Convert the result to a JSON object where key is the category and value is the total expense
      const expensesByCategoryObj = {};
      expensesByCategory.forEach(expense => {
        expensesByCategoryObj[expense.category] = expense.dataValues.totalExpense;
      });
  
      // Return the result as a JSON object
      res.status(200).json(expensesByCategoryObj);
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
      res.status(500).json({ message: 'Server error while fetching expenses by category' });
    }
  };