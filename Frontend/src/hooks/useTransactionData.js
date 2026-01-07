import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import API_BASE_URL from '../config/api';

export function useTransactionData(taskId) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch transactions on load and when taskId changes
    useEffect(() => {
        const fetchTransactions = async () => {
            if (!taskId) return;
            
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/transactions/${taskId}`);
                const data = await response.json();
                if (data.success) {
                    setTransactions(
                        data.transactions.map(tx => ({
                            id: tx._id,
                            type: tx.type,
                            description: tx.name,
                            amount: tx.amount,
                            date: tx.date,
                            time: tx.time,
                            task: tx.taskId
                        }))
                    );
                } else {
                    // Silent fail on no transactions
                    setTransactions([]);
                }
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
                toast.error("Failed to load transactions");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransactions();
    }, [taskId]);

    // Refresh transactions
    const refreshTransactions = async () => {
        if (!taskId) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/transactions/${taskId}`);
            const data = await response.json();
            if (data.success) {
                setTransactions(
                    data.transactions.map(tx => ({
                        id: tx._id,
                        type: tx.type,
                        description: tx.name,
                        amount: tx.amount,
                        date: tx.date,
                        time: tx.time,
                        task: tx.taskId
                    }))
                );
            }
        } catch (error) {
            console.error("Failed to refresh transactions:", error);
        }
    };

    // Add credit transaction
    const addCreditTransaction = async (description, amount, date, time) => {
        if (!description.trim() || !amount || parseFloat(amount) <= 0) {
            toast.error('Please enter valid description and amount');
            return false;
        }

        const payload = {
            name: description.trim(),
            amount: parseFloat(amount),
            date: date,
            time: time,
            taskId: taskId,
            type: 'credit'
        };

        try {
            const res = await fetch(`${API_BASE_URL}/credit-transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let errorMessage = "Failed to add credit transaction.";
                try {
                    const errorResponse = await res.json();
                    errorMessage = errorResponse.message || errorMessage;
                } catch (e) {
                    console.log(e);
                }
                toast.error("Server error: " + errorMessage);
                throw new Error(errorMessage);
            }

            const data = await res.json();
            if (data.success) {
                toast.success("Credit transaction added successfully!");
                await refreshTransactions();
                return true;
            } else {
                toast.error("Failed to add credit transaction.");
                return false;
            }
        } catch (err) {
            console.error("Error submitting transaction:", err);
            toast.error("Server error: " + (err.message || "Unknown error"));
            return false;
        }
    };

    // Add debit transaction
    const addDebitTransaction = async (description, amount, date, time) => {
        if (!description.trim() || !amount || parseFloat(amount) <= 0) {
            toast.error('Please enter valid description and amount');
            return false;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/debit-transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: description.trim(),
                    amount: parseFloat(amount),
                    date: date,
                    time: time,
                    taskId: taskId,
                    type: "debit"
                }),
            });

            if (!res.ok) {
                let errorMessage = "Failed to add debit transaction.";
                try {
                    const errorResponse = await res.json();
                    errorMessage = errorResponse.message || errorMessage;
                } catch (e) {
                    console.log(e);
                }
                toast.error("Server error: " + errorMessage);
                throw new Error(errorMessage);
            }

            const data = await res.json();
            if (data.success) {
                toast.success("Debit transaction added successfully!");
                await refreshTransactions();
                return true;
            } else {
                toast.error("Failed to add debit transaction.");
                return false;
            }
        } catch (err) {
            console.error("Error submitting debit transaction:", err);
            toast.error("Server error: " + (err.message || "Unknown error"));
            return false;
        }
    };

    // Update transaction
    const updateTransaction = async (transactionId, name, amount, date, time) => {
        if (!name.trim() || !amount || parseFloat(amount) <= 0) {
            toast.error('Please enter valid description and amount');
            return false;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/transaction/${transactionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    amount: parseFloat(amount),
                    date: date,
                    time: time
                }),
            });

            if (!res.ok) {
                let errorMessage = "Failed to update transaction.";
                try {
                    const errorResponse = await res.json();
                    errorMessage = errorResponse.message || errorMessage;
                } catch (e) {
                    console.log(e);
                }
                toast.error("Server error: " + errorMessage);
                throw new Error(errorMessage);
            }

            const data = await res.json();
            if (data.success) {
                toast.success("Transaction updated successfully!");
                await refreshTransactions();
                return true;
            } else {
                toast.error("Failed to update transaction.");
                return false;
            }
        } catch (err) {
            console.error("Error updating transaction:", err);
            toast.error("Server error: " + (err.message || "Unknown error"));
            return false;
        }
    };

    // Delete transaction
    const deleteTransaction = async (transactionId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/transaction/${transactionId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                let errorMessage = "Failed to delete transaction.";
                try {
                    const errorResponse = await res.json();
                    errorMessage = errorResponse.message || errorMessage;
                } catch (e) {
                    console.log(e);
                }
                toast.error("Server error: " + errorMessage);
                throw new Error(errorMessage);
            }

            const data = await res.json();
            if (data.success) {
                toast.success("Transaction deleted successfully!");
                await refreshTransactions();
                return true;
            } else {
                toast.error("Failed to delete transaction.");
                return false;
            }
        } catch (err) {
            console.error("Error deleting transaction:", err);
            toast.error("Server error: " + (err.message || "Unknown error"));
            return false;
        }
    };

    // Calculate summary statistics
    const getSummary = () => {
        const totalCredit = transactions
            .filter(tx => tx.type === 'credit')
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        const totalDebit = transactions
            .filter(tx => tx.type === 'debit')
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        const balance = totalCredit - totalDebit;

        return {
            totalCredit,
            totalDebit,
            balance,
            transactionCount: transactions.length
        };
    };

    return {
        transactions,
        isLoading,
        addCreditTransaction,
        addDebitTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions,
        getSummary
    };
}
