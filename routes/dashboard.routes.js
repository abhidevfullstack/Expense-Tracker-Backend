const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/finance-summary',authMiddleware,dashboardController.getFinanceSummary);

module.exports=router;
