export default function TransactionSummary({ transactions }) {
  // Handle undefined or null transactions array
  const safeTransactions = transactions || [];
  
  const creditTotal = safeTransactions
    .filter((tx) => tx.type === "credit")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const debitTotal = safeTransactions
    .filter((tx) => tx.type === "debit")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = creditTotal - debitTotal;

  return (
    <section className="w-full px-2 sm:px-4 py-4 bg-gray-50 dark:bg-gray-800 flex justify-center">
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Credit */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Credit
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-green-600 dark:text-green-400">
            ₹ {creditTotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Debit */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Debit
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-red-600 dark:text-red-400">
            ₹ {debitTotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Balance */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Balance
          </span>
          <span
            className={`text-xl sm:text-2xl font-semibold ${
              balance >= 0
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            ₹ {balance.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </section>
  );
}
