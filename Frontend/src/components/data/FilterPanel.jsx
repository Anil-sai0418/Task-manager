import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Calendar, DollarSign, X, Check, Search, Filter, Clock } from 'lucide-react';
import { Input } from '../ui/input';
import { useRef, useEffect } from 'react';

export default function FilterPanel({
  showFilters,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  timeFilter,
  setTimeFilter,
  dateRange,
  setDateRange,
  amountRange,
  setAmountRange,
  onClearAll,
  onClose
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showFilters && panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters, onClose]);

  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          ref={panelRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Advanced Filters</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Refine your transaction list</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClearAll}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  
                  Reset
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Sort Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  Sort By
                </label>
                <div className="bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex shadow-sm">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-0 cursor-pointer pl-3 py-2"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="description">Description</option>
                    <option value="time">Time</option>
                  </select>
                  <div className="w-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                    title={sortOrder === 'asc' ? "Ascending" : "Descending"}
                  >
                    <ArrowUpDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                  </button>
                </div>
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  Time Period
                </label>
                <div className="relative">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 pl-4 py-2.5 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="year">Last Year</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-xs py-2 px-3 focus:ring-indigo-500"
                  />
                  <Input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-xs py-2 px-3 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  Amount Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                    <Input
                      type="number"
                      value={amountRange.min}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl pl-6 text-sm py-2 focus:ring-indigo-500"
                      placeholder="Min"
                      min="0"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                    <Input
                      type="number"
                      value={amountRange.max}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl pl-6 text-sm py-2 focus:ring-indigo-500"
                      placeholder="Max"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Summary (Optional - can be expanded later) */}
            <div className="mt-6 flex flex-wrap gap-2">
              {timeFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Time: {timeFilter}
                  <button onClick={() => setTimeFilter('all')} className="ml-2 hover:text-blue-600"><X size={12} /></button>
                </span>
              )}
              {/* Add more chips as needed */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
