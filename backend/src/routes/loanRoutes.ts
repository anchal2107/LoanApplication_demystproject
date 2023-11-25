import express from 'express';
import * as LoanController from '../controllers/loanController';

const router = express.Router();

router.post('/initiate', LoanController.initiateApplication);
router.get('/banks', LoanController.getBankNames);
router.get('/balance-sheet', LoanController.fetchBalanceSheet);
router.post('/submit', LoanController.submitApplication);

export default router;
