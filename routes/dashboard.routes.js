const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/finance-summary',authMiddleware,dashboardController.getFinanceSummary);
router.get('/income-summary',authMiddleware,dashboardController.getIncomeBySource)
router.get('/expense-summary',authMiddleware,dashboardController.getExpensesByCategory)

module.exports=router;
