import { Request, Response } from 'express';
import { AccountingService } from '../services/accountingService';
import { DecisionEngineService } from '../services/decisionEngineService';

export const initiateApplication = (req: Request, res: Response): void => {
  res.json({ message: 'Initiate Complete' });
};

export const getBankNames = (req: Request, res: Response): void => {
  const bankNames = AccountingService.getBankNames();
  res.json({ bankNames, message: 'Bank Names Fetched' });
};

export const fetchBalanceSheet = (req: Request, res: Response): void => {
  const bankId = req.query.bankId as string;
  if (!bankId) {
    res.status(400).json({ message: 'Bank ID is required in the query parameters' });
    return;
  }
  try {
    const bankIdNumber = parseInt(bankId, 10);    
    const balanceSheet = AccountingService.getBalanceSheet(bankIdNumber);
    if (balanceSheet === null) {
      res.status(404).json({ message: 'Bank not found' });
    } else {
     res.json({ balanceSheet, message: 'Balance Sheet Fetched' });
    }
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const submitApplication = (req: Request, res: Response): void => {
  // Application submission logic goes here
  const preAssessment = DecisionEngineService.applyRules(req.body.business);
  res.json({ preAssessment, message: 'Application Submitted' });
};