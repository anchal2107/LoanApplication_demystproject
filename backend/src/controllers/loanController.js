"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitApplication = exports.fetchBalanceSheet = exports.initiateApplication = void 0;
const accountingService_1 = require("../services/accountingService");
const decisionEngineService_1 = require("../services/decisionEngineService");
const initiateApplication = (req, res) => {
    res.json({ message: 'Initiate Complete' });
};
exports.initiateApplication = initiateApplication;
const fetchBalanceSheet = (req, res) => {
    const balanceSheet = accountingService_1.AccountingService.fetchBalanceSheet();
    res.json({ balanceSheet, message: 'Balance Sheet Fetched' });
};
exports.fetchBalanceSheet = fetchBalanceSheet;
const submitApplication = (req, res) => {
    // Application submission logic goes here
    const preAssessment = decisionEngineService_1.DecisionEngineService.applyRules(req.body.business);
    res.json({ preAssessment, message: 'Application Submitted' });
};
exports.submitApplication = submitApplication;
