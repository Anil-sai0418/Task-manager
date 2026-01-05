import React from "react";

export default function TransactionTable({ 
  transactions, 
  activeTab, 
  sortBy, 
  sortOrder, 
  setSortBy, 
  setSortOrder, 
  onEdit, 
  onDelete 
}) {

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'description' ? 'asc' : 'desc');
    }
  };

  const calculateTimeAgo = (date, time) => {
    const now = new Date();
    const txDateTime = new Date(`${date}T${time}`);
    const diff = Math.floor((now - txDateTime) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="w-full flex justify-center items-center py-4 px-4">
      <div
        className={`
          rounded-xl shadow w-full md:w-[90%] lg:w-[80%] overflow-x-auto overflow-y-auto max-h-[445px] scroll-smooth
          transition-colors duration-300
          ${
            activeTab === "credit"
              ? "bg-green-50 dark:bg-green-900/20"
              : activeTab === "debit"
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-white dark:bg-gray-900"
          }
        `}
      >
        <table className="w-full min-w-[600px]">
          <thead
            className={`
              sticky top-0 z-10
              text-xs uppercase tracking-wide
              ${
                activeTab === "credit"
                  ? "bg-green-100 dark:bg-green-900/40"
                  : activeTab === "debit"
                  ? "bg-red-100 dark:bg-red-900/40"
                  : "bg-gray-100 dark:bg-gray-800"
              }
            `}
          >
            <tr>
              <th className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">S. No</th>
              <th 
                className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('time')}
              >
                Time {sortBy === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('description')}
              >
                Purpose {sortBy === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              {(activeTab === "all" || activeTab === "credit") && (
                <th 
                  className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('amount')}
                >
                  Credit {(sortBy === 'amount' && activeTab !== 'debit') && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              )}
              {(activeTab === "all" || activeTab === "debit") && (
                <th 
                  className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('amount')}
                >
                  Debit {(sortBy === 'amount' && activeTab !== 'credit') && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              )}
              <th className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">Time Ago</th>
              <th className="h-9 py-2 px-4 text-left text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    No transactions yet.
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    Use the Credit or Debit buttons to add transactions.
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`
                    transition-colors
                    ${
                      activeTab === "credit"
                        ? "hover:bg-green-100/50 dark:hover:bg-green-900/30"
                        : activeTab === "debit"
                        ? "hover:bg-red-100/50 dark:hover:bg-red-900/30"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <td className="py-2 px-4 font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-900 dark:text-gray-100">{tx.date}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{tx.time}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{tx.description}</td>
                  {activeTab === "all" && (
                    <>
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                        {tx.type === "credit" ? `₹${tx.amount}` : "-"}
                      </td>
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                        {tx.type === "debit" ? `₹${tx.amount}` : "-"}
                      </td>
                    </>
                  )}
                  {activeTab === "credit" && tx.type === "credit" && (
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">₹{tx.amount}</td>
                  )}
                  {activeTab === "debit" && tx.type === "debit" && (
                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">₹{tx.amount}</td>
                  )}
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {calculateTimeAgo(tx.date, tx.time)}
                  </td>
                  <td className="py-2 px-4 text-sm">
                    <button
                      onClick={() => onEdit(tx)}
                      className="text-blue-600 dark:text-blue-400 hover:underline mr-3 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="text-red-600 dark:text-red-400 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
