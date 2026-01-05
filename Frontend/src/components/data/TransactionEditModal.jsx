import { Input } from '../ui/input';

export default function TransactionEditModal({ 
  isOpen, 
  onClose, 
  transaction, 
  setTransaction,
  onUpdate 
}) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed top-0 bg-blue-500/15 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
      <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">
            Edit Transaction
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-400 text-gray-500 bg-white rounded-lg shadow hover:text-blue-600 hover:border-blue-600 transition duration-150"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <line x1="6" y1="6" x2="14" y2="14" />
              <line x1="14" y1="6" x2="6" y2="14" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose/Description
          </label>
          <Input
            type="text"
            value={transaction.name}
            onChange={(e) => setTransaction({ ...transaction, name: e.target.value })}
            placeholder="Enter transaction purpose"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount ($)
          </label>
          <Input
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
          />
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Input
              type="date"
              value={transaction.date}
              onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <Input
              type="time"
              value={transaction.time}
              onChange={(e) => setTransaction({ ...transaction, time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onUpdate}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-white transition-colors"
          >
            Update Transaction
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
