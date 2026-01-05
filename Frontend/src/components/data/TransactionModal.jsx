import { Input } from '../ui/input';

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  type, // 'credit' or 'debit'
  description,
  setDescription,
  amount,
  setAmount,
  date,
  setDate,
  time,
  setTime,
  onSubmit 
}) {
  if (!isOpen) return null;

  const isCredit = type === 'credit';
  const titleColor = isCredit ? 'text-green-600' : 'text-red-600';
  const buttonColor = isCredit ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
  const title = isCredit ? 'Add Credit Transaction' : 'Add Debit Transaction';
  const submitLabel = isCredit ? 'Add Credit' : 'Add Debit';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-md mx-4 relative z-[61] shadow-2xl pointer-events-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold tracking-tight ${titleColor}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-500 bg-white dark:bg-gray-700 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <line x1="6" y1="6" x2="14" y2="14" />
              <line x1="14" y1="6" x2="6" y2="14" />
            </svg>
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Purpose/Description
          </label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction purpose"
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount ($)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="mb-7 flex gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time
            </label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onSubmit}
            className={`${buttonColor} flex-1 px-4 py-2 rounded-lg font-medium text-white shadow transition duration-150`}
          >
            {submitLabel}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium text-white shadow transition duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
