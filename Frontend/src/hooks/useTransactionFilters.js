import { useState, useMemo } from 'react';

export function useTransactionFilters(transactions) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [timeFilter, setTimeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((tx) => {
      // Tab filter
      const tabMatch = activeTab === "all" ? true : tx.type === activeTab;
      
      // Search filter
      const searchMatch = tx.description.toLowerCase().includes(searchQuery) ||
                         tx.date.includes(searchQuery) ||
                         tx.time.includes(searchQuery);
      
      // Date range filter
      let dateMatch = true;
      if (dateRange.from || dateRange.to) {
        const txDate = new Date(tx.date);
        if (dateRange.from && txDate < new Date(dateRange.from)) dateMatch = false;
        if (dateRange.to && txDate > new Date(dateRange.to)) dateMatch = false;
      }
      
      // Amount range filter
      let amountMatch = true;
      if (amountRange.min && tx.amount < parseFloat(amountRange.min)) amountMatch = false;
      if (amountRange.max && tx.amount > parseFloat(amountRange.max)) amountMatch = false;
      
      // Time period filter
      let timeMatch = true;
      if (timeFilter !== 'all') {
        const txDate = new Date(tx.date);
        const now = new Date();
        
        switch (timeFilter) {
          case 'today':
            timeMatch = txDate.toDateString() === now.toDateString();
            break;
          case 'week': {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            timeMatch = txDate >= weekAgo;
            break;
          }
          case 'month': {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            timeMatch = txDate >= monthAgo;
            break;
          }
          case 'year': {
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            timeMatch = txDate >= yearAgo;
            break;
          }
        }
      }
      
      return tabMatch && searchMatch && dateMatch && amountMatch && timeMatch;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date': {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          comparison = dateA - dateB;
          break;
        }
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'time':
          comparison = a.time.localeCompare(b.time);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, searchQuery, sortBy, sortOrder, dateRange, amountRange, timeFilter, activeTab]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setDateRange({ from: '', to: '' });
    setAmountRange({ min: '', max: '' });
    setTimeFilter('all');
    setSortBy('date');
    setSortOrder('desc');
    setActiveTab('all');
  };

  return {
    // State
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    dateRange,
    setDateRange,
    amountRange,
    setAmountRange,
    timeFilter,
    setTimeFilter,
    activeTab,
    setActiveTab,
    // Results
    filteredAndSortedTransactions,
    clearAllFilters,
  };
}
