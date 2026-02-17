const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/credit-transaction', transactionController.creditTransaction);
router.post('/debit-transaction', transactionController.debitTransaction);
router.get('/transactions/:taskId', transactionController.getTransactions);
router.put('/transaction/:id', transactionController.updateTransaction);
router.delete('/transaction/:id', transactionController.deleteTransaction);

module.exports = router;
