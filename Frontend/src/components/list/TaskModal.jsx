import { useState, useEffect } from "react";

export default function TaskModal({ 
  isOpen, 
  onClose, 
  onSubmit
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Auto-fill date and time when modal opens
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setDate(now.toISOString().split('T')[0]);
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid name and amount');
      return;
    }

    await onSubmit({
      name: name.trim(),
      amount: parseFloat(amount),
      date,
      time
    });

    // Reset form
    setName("");
    setAmount("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Create New Task</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-green-600 hover:border-green-600 rounded-md transition duration-150"
            aria-label="Close"
          >
            <span className="text-lg font-bold">×</span>
          </button>
        </div>
        
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        {/* Date and Time */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition"
          >
            Add Task
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
