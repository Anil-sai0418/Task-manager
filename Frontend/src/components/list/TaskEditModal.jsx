import { useState, useEffect } from "react";
import { toast } from 'sonner';

export default function TaskEditModal({ 
  task, 
  isOpen, 
  onClose, 
  onSubmit
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Populate form when task changes
  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setAmount(task.amount || "");
      
      // Format date properly
      if (task.date) {
        try {
          const dateObj = new Date(task.date);
          setDate(dateObj.toISOString().split('T')[0]);
        } catch {
          setDate("");
        }
      }
      
      // Format time properly
      if (task.time) {
        const timeStr = task.time.toString();
        if (timeStr.includes(':')) {
          setTime(timeStr.slice(0, 5)); // HH:MM format
        } else {
          setTime("");
        }
      }
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = async () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter valid name and amount");
      return;
    }

    await onSubmit({
      name: name.trim(),
      amount: parseFloat(amount),
      date,
      time
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/10 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative border border-gray-200/70 dark:border-gray-700/70"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300/70 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <span className="text-lg font-bold">×</span>
        </button>
        
        <h2 className="text-xl font-semibold mb-6 tracking-tight text-gray-900 dark:text-gray-100">
          Edit Task
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300/70 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300/70 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
        </div>
        
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300/70 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300/70 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition active:scale-95"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2.5 px-4 rounded-lg font-medium transition active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
