import { useState, useEffect } from 'react';

export function useTransactions(taskId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    if (!taskId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://task-manager-by-anil.onrender.com/transactions/${taskId}`);
      const data = await response.json();
      if (data.success) {
        setTransactions(
          data.transactions.map(tx => ({
            id: tx._id,
            type: tx.type,
            description: tx.name,
            amount: tx.amount,
            date: tx.date,
            time: tx.time
          }))
        );
      } else {
        setError("No transactions found");
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [taskId]);

  const addTransaction = async (transactionData) => {
    try {
      const endpoint = transactionData.type === 'credit' 
        ? 'https://task-manager-by-anil.onrender.com/credit-transaction'
        : 'https://task-manager-by-anil.onrender.com/debit-transaction';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchTransactions();
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.error('Error adding transaction:', err);
      return { success: false, message: 'Server error' };
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await fetch(`https://task-manager-by-anil.onrender.com/transaction/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchTransactions();
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.error('Error updating transaction:', err);
      return { success: false, message: 'Server error' };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`https://task-manager-by-anil.onrender.com/transaction/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.error('Error deleting transaction:', err);
      return { success: false, message: 'Server error' };
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
