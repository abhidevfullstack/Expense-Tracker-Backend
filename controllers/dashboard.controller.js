const { Income, Expense } = require('../models');

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




