export default function TabsFilter({ activeTab, setActiveTab, taskName }) {
  return (
    <div className="w-full px-4 py-4">
      
      {/* Task Name - Only on small screens, at the top */}
   

      {/* Desktop: Task Name above Tabs, both centered */}
      <div className="hidden md:flex flex-col items-center gap-3 px-8">
        {taskName && (
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-full
                         bg-gray-100 dark:bg-gray-800
                         text-gray-900 dark:text-white
                         text-sm font-semibold
                         shadow-sm"
              title={taskName}
            >
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Task Name :
              </span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                {taskName}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
              This section shows a summary of all transactions related to this task.
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          <div className="relative flex justify-center gap-1
                bg-white/70 dark:bg-gray-900/70
                backdrop-blur-xl p-1 rounded-2xl
                border border-gray-200/60 dark:border-gray-700/60
                shadow-lg">
            <div
              className={`
                absolute top-2 bottom-2 w-[160px] rounded-xl
                bg-gray-100 dark:bg-gray-700/60
                shadow-inner
                transition-all duration-300 ease-out
                ${
                  activeTab === "all"
                    ? "left-1.5"
                    : activeTab === "credit"
                    ? "left-[168px] bg-green-100"
                    : "left-[334px] bg-red-50"
                }
              `}
            />
            <button
              onClick={() => setActiveTab("all")}
              className={`
                relative z-10 h-11 w-[160px] rounded-xl
                transition-all duration-300 ease-out
                text-sm font-semibold tracking-wide
                ${
                  activeTab === "all"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }
              `}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("credit")}
              className={`
                relative z-10 h-11 w-[160px] rounded-xl
                transition-all duration-300 ease-out
                text-sm font-semibold tracking-wide
                ${
                  activeTab === "credit"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }
              `}
            >
              Credits
            </button>
            <button
              onClick={() => setActiveTab("debit")}
              className={`
                relative z-10 h-11 w-[160px] rounded-xl
                transition-all duration-300 ease-out
                text-sm font-semibold tracking-wide
                ${
                  activeTab === "debit"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }
              `}
            >
              Debits
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Only Tabs (Task name is at top) */}
      <div className="md:hidden">
        <div className="relative flex gap-1
                bg-white/70 dark:bg-gray-900/70
                backdrop-blur-xl p-1 rounded-2xl
                border border-gray-200/60 dark:border-gray-700/60
                shadow-md max-w-md mx-auto">
          <div
            className={`
              absolute top-2 bottom-2 rounded-xl
              bg-gray-100 dark:bg-gray-700/60
              shadow-inner
              transition-all duration-300 ease-out
              ${
                activeTab === "all"
                  ? "left-1.5 w-[calc(33.33%-6px)]"
                  : activeTab === "credit"
                  ? "left-[calc(33.33%+2px)] w-[calc(33.33%-6px)] bg-green-100"
                  : "left-[calc(66.66%+2px)] w-[calc(33.33%-6px)] bg-red-50"
              }
            `}
          />
          <button
            onClick={() => setActiveTab("all")}
            className={`
              relative z-10 flex-1 h-10 rounded-xl
              transition-all duration-300 ease-out
              text-xs sm:text-sm font-semibold tracking-wide
              ${
                activeTab === "all"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }
            `}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("credit")}
            className={`
              relative z-10 flex-1 h-10 rounded-xl
              transition-all duration-300 ease-out
              text-xs sm:text-sm font-semibold tracking-wide
              ${
                activeTab === "credit"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }
            `}
          >
            Credits
          </button>
          <button
            onClick={() => setActiveTab("debit")}
            className={`
              relative z-10 flex-1 h-10 rounded-xl
              transition-all duration-300 ease-out
              text-xs sm:text-sm font-semibold tracking-wide
              ${
                activeTab === "debit"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }
            `}
          >
            Debits
          </button>
        </div>
      </div>
    </div>
  );
}
