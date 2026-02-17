const TransactionModel = require('../models/transation');

// Credit Transaction
exports.creditTransaction = async (req, res) => {
    try {
        const { name, amount, date, time, taskId } = req.body;

        const newData = {
            name: name,
            amount: amount,
            date: date,
            time: time,
            taskId: taskId,
            type: "credit"
        }
        const data = await TransactionModel.create(newData)
        if (data) {
            res.status(201).json({
                success: true,
                message: "Task created successfully"
            });
        }

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Debit Transaction
exports.debitTransaction = async (req, res) => {
    try {
        const { name, amount, date, time, taskId } = req.body;

        const newData = {
            name: name,
            amount: amount,
            date: date,
            time: time,
            taskId: taskId,
            type: "debit"
        }
        const data = await TransactionModel.create(newData)
        if (data) {
            res.status(201).json({
                success: true,
                message: "Task created successfully"
            });
        }

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get Transactions by Task ID
exports.getTransactions = async (req, res) => {
    try {
        const { taskId } = req.params;

        const transactions = await TransactionModel.find({ taskId }).populate("taskId")

        // Return empty array for new tasks - this is not an error!
        if (!transactions || transactions.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No transactions yet",
                transactions: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            transactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
    try {
        const { name, amount, date, time } = req.body;

        if (!name || !amount || !date || !time) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
            req.params.id,
            { name, amount, date, time },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ success: false, message: "Server error while updating transaction" });
    }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
    try {
        await TransactionModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ success: false, message: "Server error while deleting transaction" });
    }
};
