import React, { useState, useRef, useEffect } from 'react';
// For PDF export
// html2pdf.js will be loaded dynamically from CDN
import { Menu, Plus, Search, ChevronDown, X, Filter, Calendar, DollarSign, Clock, ArrowUpDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Input } from './ui/Input';

export default function Viewdata() {
    // Ref for the section to export
    const pdfRef = useRef(null);

    // PDF download handler
    const handleDownloadPDF = async () => {
        if (!pdfRef.current) return;
        // Dynamically load html2pdf.js from CDN if not present
        if (!window.html2pdf) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        }
        const opt = {
            margin:       0.2,
            filename:     'transactions.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        window.html2pdf().set(opt).from(pdfRef.current).save();
    };
    const params = useParams()
    console.log(params.id)

    const [activeTab, setActiveTab] = useState("all");
    const [transactions, setTransactions] = useState([]);
    console.log(transactions , "jhdghj")
    const [transactionType, setTransactionType] = useState("credit");
    const [searchQuery, setSearchQuery] = useState('');

    // Enhanced filter states
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('date'); // date, amount, description, time
    const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [amountRange, setAmountRange] = useState({ min: '', max: '' });
    const [timeFilter, setTimeFilter] = useState('all'); // all, today, week, month, year

    // Credit modal state
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [creditDate, setCreditDate] = useState('');
    const [creditTime, setCreditTime] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Ref for mobile dropdown
    const mobileDropdownRef = useRef(null);
    // Ref for desktop dropdown
    const dropdownRef = useRef(null);

    // Click-away logic for closing the mobile dropdown menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(event.target)
            ) {
                setShowMobileDropdown(false);
            }
        }

        if (showMobileDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileDropdown]);

    // Click-away logic for closing the desktop dropdown menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                showDropdown &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    // Debit modal state
    const [showDebitModal, setShowDebitModal] = useState(false);
    const [debitDescription, setDebitDescription] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [debitDate, setDebitDate] = useState('');
    const [debitTime, setDebitTime] = useState('');

    // Edit modal state
    const [editModalData, setEditModalData] = useState(null);

    // Fetch transactions on load and when params.id changes
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`https://task-manager-by-anil.onrender.com/transactions/${params.id}`);
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
                    console.log("Fetched transactions:", data.transactions);
                } else {
                    console.log("No transactions found.");
                }
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };
        fetchTransactions();
    }, [params.id]);

    // Enhanced filtering and sorting function
    const getFilteredAndSortedTransactions = () => {
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
                    case 'week':
                        { const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        timeMatch = txDate >= weekAgo;
                        break; }
                    case 'month':
                        { const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                        timeMatch = txDate >= monthAgo;
                        break; }
                    case 'year':
                        { const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                        timeMatch = txDate >= yearAgo;
                        break; }
                }
            }
            
            return tabMatch && searchMatch && dateMatch && amountMatch && timeMatch;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'date':
                    // eslint-disable-next-line no-case-declarations
                    const dateA = new Date(`${a.date}T${a.time}`);
                    // eslint-disable-next-line no-case-declarations
                    const dateB = new Date(`${b.date}T${b.time}`);
                    comparison = dateA - dateB;
                    break;
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
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSearchQuery('');
        setDateRange({ from: '', to: '' });
        setAmountRange({ min: '', max: '' });
        setTimeFilter('all');
        setSortBy('date');
        setSortOrder('desc');
        setActiveTab('all');
    };

    // Credit modal functions
    const openCreditModal = () => {
        setTransactionType("credit");
        setShowDebitModal(false);
        setShowDropdown(false);
        setShowModal((prev) => {
            const willOpen = !prev;
            if (willOpen) {
                setDescription('');
                setAmount('');
                const now = new Date();
                const formattedDate = now.toISOString().slice(0, 10);
                const formattedTime = now.toTimeString().slice(0, 5);
                setCreditDate(formattedDate);
                setCreditTime(formattedTime);
            }
            return willOpen;
        });
        setShowMobileMenu(false);
    };

    const handleSubmitTransaction = () => {
        if (!description.trim() || !amount || parseFloat(amount) <= 0) {
            alert('Please enter valid description and amount');
            return;
        }

        const payload = {
            name: description.trim(),
            amount: parseFloat(amount),
            date: creditDate,
            time: creditTime,
            taskId: params.id,
            type: transactionType
        };

        fetch("https://task-manager-by-anil.onrender.com/credit-transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorMessage = "Failed to add credit transaction.";
                    try {
                        const errorResponse = await res.json();
                        errorMessage = errorResponse.message || errorMessage;
                    } catch (e) {
                        console.log(e)
                    }
                    alert("Server error: " + errorMessage);
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Credit transaction added successfully!");
                    setShowModal(false);
                    setDescription('');
                    setAmount('');
                    setCreditDate('');
                    setCreditTime('');
                    fetch(`https://task-manager-by-anil.onrender.com/transactions/${params.id}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.success) {
                                setTransactions(
                                    data.transactions.map(tx => ({
                                        id: tx._id,
                                        type: tx.type,
                                        description: tx.name,
                                        amount: tx.amount,
                                        date: tx.date,
                                        time: tx.time,
                                        task : tx.taskId
                                    }))
                                );
                            }
                        });
                } else {
                    alert("Failed to add credit transaction.");
                }
            })
            .catch((err) => {
                console.error("Error submitting transaction:", err);
                alert("Server error: " + (err.message || "Unknown error"));
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setDescription('');
        setAmount('');
    };

    // Debit modal functions
    const openDebitModal = () => {
        setTransactionType("debit");
        setShowModal(false);
        setShowDropdown(false);
        setShowDebitModal((prev) => {
            const willOpen = !prev;
            if (willOpen) {
                setDebitDescription('');
                setDebitAmount('');
                const now = new Date();
                const formattedDate = now.toISOString().slice(0, 10);
                const formattedTime = now.toTimeString().slice(0, 5);
                setDebitDate(formattedDate);
                setDebitTime(formattedTime);
            }
            return willOpen;
        });
        setShowMobileMenu(false);
    };

    const closeDebitModal = () => {
        setShowDebitModal(false);
        setDebitDescription('');
        setDebitAmount('');
        setDebitDate('');
        setDebitTime('');
    };

    const handleSubmitDebitTransaction = () => {
        if (!debitDescription.trim() || !debitAmount || parseFloat(debitAmount) <= 0) {
            alert('Please enter valid description and amount');
            return;
        }

        fetch("https://task-manager-by-anil.onrender.com/debit-transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: debitDescription.trim(),
                amount: parseFloat(debitAmount),
                date: debitDate,
                time: debitTime,
                taskId: params.id,
                type: "debit"
            }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorMessage = "Failed to add debit transaction.";
                    try {
                        const errorResponse = await res.json();
                        errorMessage = errorResponse.message || errorMessage;
                    } catch (e) {
                        console.log(e)
                     }
                    alert("Server error: " + errorMessage);
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Debit transaction added successfully!");
                    setShowDebitModal(false);
                    setDebitDescription('');
                    setDebitAmount('');
                    setDebitDate('');
                    setDebitTime('');
                    fetch(`https://task-manager-by-anil.onrender.com/transactions/${params.id}`)
                        .then((res) => res.json())
                        .then((data) => {
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
                            }
                        });
                } else {
                    alert("Failed to add debit transaction.");
                }
            })
            .catch(async (err) => {
                console.error("Error submitting transaction:", err);
                try {
                    const errorResponse = await err.response?.json();
                    console.error("Backend error message:", errorResponse?.message);
                    alert("Server error: " + (errorResponse?.message || "Unknown error"));
                } catch (parseError) {
                    console.log(parseError)
                    alert("Something went wrong on the server.");
                }
            });
    };

    // Handle editing a transaction
    const handleEditTransaction = (tx) => {
        setEditModalData({
            id: tx.id,
            name: tx.description,
            amount: tx.amount,
            date: tx.date,
            time: tx.time
        });
    };

    // Handle update submission for edit modal
    const handleUpdateTransaction = async () => {
        const { id, name, amount, date, time } = editModalData;
        if (!name.trim() || !amount || !date || !time) {
            alert("All fields are required");
            return;
        }
        try {
            const res = await fetch(`https://task-manager-by-anil.onrender.com/transaction/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, amount, date, time }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Transaction updated successfully");
                setEditModalData(null);
                fetch(`https://task-manager-by-anil.onrender.com/transactions/${params.id}`)
                    .then((res) => res.json())
                    .then((data) => {
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
                        }
                    });
            } else {
                alert("Failed to update transaction");
            }
        } catch (error) {
            console.error("Error updating transaction:", error);
            alert("Server error while updating transaction");
        }
    };

    // Handle deleting a transaction
    const handleDeleteTransaction = async (id) => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;
        try {
            const res = await fetch(`https://task-manager-by-anil.onrender.com/transaction/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                alert("Transaction deleted");
                setTransactions((prev) => prev.filter((tx) => tx.id !== id));
            } else {
                alert("Failed to delete transaction");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Error deleting transaction");
        }
    };

    return (
        <div className="h-screen w-full bg-gray-50">
            <nav className="p-4 w-full bg-white shadow-sm flex flex-wrap items-center justify-between gap-y-4">
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <p className="text-xl font-bold text-blue-600">Task Manager</p>
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 flex justify-center w-full lg:w-auto order-3 lg:order-2">
                    <div className="relative w-full max-w-2xl px-4">
                        <Input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        />
                        <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                </div>
                
                <div className="hidden lg:flex items-center gap-4 order-2">
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2 md:px-6 md:py-3 font-semibold rounded-md shadow text-sm md:text-base transition-colors ${
                            showFilters 
                                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                        <Filter className="h-4 w-4 inline mr-2" />
                        Filters
                    </button>
                    
                    <button
                        onClick={openCreditModal}
                        className="px-4 py-2 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow text-sm md:text-base"
                    >
                        Credit
                    </button>
                    <button
                        onClick={openDebitModal}
                        className="px-4 py-2 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow text-sm md:text-base"
                    >
                        Debit
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDropdown(prev => !prev);
                            }}
                            className="bg-blue-400 hover:bg-blue-600 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2"
                        >
                            <span>open</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-10">
                                <div className="py-2">
                                    <button
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[15px] font-medium"
                                        onClick={handleDownloadPDF}
                                    >
                                        Save as pdf
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[15px] font-medium"
                                        onClick={() => {
                                            // Generate shareable link (current URL with id param)
                                            const url = `${window.location.origin}/view/${params.id}`;
                                            // Copy to clipboard
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(url).then(() => {
                                                    alert('Link copied to clipboard!');
                                                }, () => {
                                                    alert('Failed to copy link.');
                                                });
                                            } else {
                                                // Fallback for older browsers
                                                const textarea = document.createElement('textarea');
                                                textarea.value = url;
                                                document.body.appendChild(textarea);
                                                textarea.select();
                                                try {
                                                    document.execCommand('copy');
                                                    alert('Link copied to clipboard!');
                                                } catch (err) {
                                                    console.log(err)
                                                    alert('Failed to copy link.');
                                                }
                                                document.body.removeChild(textarea);
                                            }
                                        }}
                                    >
                                        Share via link
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[15px] font-medium">
                                        More Details
                                    </button>
                                    <button
                                        onClick={() => {
                                            window.location.href = "/login";
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[15px] font-medium"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Enhanced Filter Panel */}
            {showFilters && (
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Sort By */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <ArrowUpDown className="h-4 w-4 inline mr-1" />
                                    Sort By
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="date">Date </option>
                                        <option value="amount">Amount</option>
                                        <option value="description">Description</option>
                                        <option value="time">Time</option>
                                    </select>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
                                    >
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </button>
                                </div>
                            </div>

                            {/* Time Period Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="h-4 w-4 inline mr-1" />
                                    Time Period
                                </label>
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 Days</option>
                                    <option value="month">Last 30 Days</option>
                                    <option value="year">Last Year</option>
                                </select>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="h-4 w-4 inline mr-1" />
                                    Date Range
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                                        className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="From"
                                    />
                                    <Input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                                        className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="To"
                                    />
                                </div>
                            </div>

                            {/* Amount Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="h-4 w-4 inline mr-1" />
                                    Amount Range (₹)
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        value={amountRange.min}
                                        onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                                        className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Min"
                                        min="0"
                                    />
                                    <Input
                                        type="number"
                                        value={amountRange.max}
                                        onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                                        className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Max"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="fixed inset-0 bg-black/30" onClick={() => setShowMobileMenu(false)} />
                    <div className="fixed bottom-0 left-0 w-full sm:w-96 bg-white shadow-lg z-50 p-6 rounded-t-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-full px-6 py-3 font-semibold rounded-md shadow ${
                                    showFilters 
                                        ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                            >
                                <Filter className="h-4 w-4 inline mr-2" />
                                Filters
                            </button>
                            <button
                                onClick={openCreditModal}
                                className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
                            >
                                Credit
                            </button>
                            <button
                                onClick={openDebitModal}
                                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow"
                            >
                                Debit
                            </button>
                            <div className="w-full">
                                <div className="h-px bg-gray-200 my-4" />
                                <div className="relative w-full" ref={mobileDropdownRef}>
                                    <button
                                        onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                                        className="w-full bg-blue-400 hover:bg-blue-600 text-white text-base px-4 py-3 rounded-lg flex items-center justify-between"
                                    >
                                        <span>open</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showMobileDropdown && (
                                        <div className="mt-2 w-full bg-white rounded-xl overflow-hidden">
                                            <button
                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                                                onClick={() => {
                                                    setShowMobileDropdown(false);
                                                    setShowMobileMenu(false);
                                                }}
                                            >
                                                Save as PDF
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                                                onClick={() => {
                                                    setShowMobileDropdown(false);
                                                    setShowMobileMenu(false);
                                                }}
                                            >
                                                Share via link
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                                                onClick={() => {
                                                    setShowMobileDropdown(false);
                                                    setShowMobileMenu(false);
                                                }}
                                            >
                                                More Details
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-[15px] font-medium flex items-center gap-3"
                                                onClick={() => {
                                                    window.location.href = "/login";
                                                }}
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Credit Modal */}
            {showModal && (
                <div className="fixed top-0 bg-primary/30 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                    <div className="bg-gray-300 rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-green-600">
                                Add Credit Transaction
                            </h2>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 text-gray-500 bg-white rounded-lg shadow hover:text-green-600 hover:border-green-600 transition duration-150"
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter transaction purpose"
                                // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-black bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount ($)
                            </label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="mb-6 flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={creditDate}
                                    onChange={(e) => setCreditDate(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time
                                </label>
                                <Input
                                    type="time"
                                    value={creditTime}
                                    onChange={(e) => setCreditTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 ">
                            <button
                                onClick={handleSubmitTransaction}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium text-white transition-colors"
                            >
                                Add Credit
                            </button>

                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Debit Modal */}
            {showDebitModal && (
                <div className="fixed top-0 bg-red-500/15 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-red-600">
                                Add Debit Transaction
                            </h2>
                            <button
                                onClick={closeDebitModal}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 text-gray-500 bg-white rounded-lg shadow hover:text-red-600 hover:border-red-600 transition duration-150"
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
                                value={debitDescription}
                                onChange={(e) => setDebitDescription(e.target.value)}
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
                                value={debitAmount}
                                onChange={(e) => setDebitAmount(e.target.value)}
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
                                    value={debitDate}
                                    onChange={(e) => setDebitDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time
                                </label>
                                <Input
                                    type="time"
                                    value={debitTime}
                                    onChange={(e) => setDebitTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmitDebitTransaction}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium text-white transition-colors"
                            >
                                Add Debit
                            </button>
                            <button
                                onClick={closeDebitModal}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalData && (
                <div className="fixed inset-0 flex items-center justify-center z-[60]">
                    <div className="fixed inset-0 bg-black/30" onClick={() => setEditModalData(null)} />
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-md relative z-[61]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-600">Edit Transaction</h2>
                            <button
                                onClick={() => setEditModalData(null)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 text-gray-500 bg-white rounded-lg shadow hover:text-blue-600 hover:border-blue-600 transition duration-150"
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                                  <line x1="6" y1="6" x2="14" y2="14" />
                                  <line x1="14" y1="6" x2="6" y2="14" />
                                </svg>
                            </button>
                        </div>
                        <Input
                            className="w-full mb-3 px-3 py-2 border rounded text-black dark:text-white bg-white"
                            value={editModalData.name}
                            onChange={(e) => setEditModalData({ ...editModalData, name: e.target.value })}
                            placeholder="Purpose"
                        />
                        <Input
                            type="number"
                            className="w-full mb-3 px-3 py-2 border rounded text-black dark:text-white bg-white"
                            value={editModalData.amount}
                            onChange={(e) => setEditModalData({ ...editModalData, amount: e.target.value })}
                            placeholder="Amount"
                        />
                        <div className="flex gap-2 mb-4">
                            <Input
                                type="date"
                                className="flex-1 px-3 py-2 border rounded text-black dark:text-white bg-white"
                                value={editModalData.date}
                                onChange={(e) => setEditModalData({ ...editModalData, date: e.target.value })}
                            />
                            <Input
                                type="time"
                                className="flex-1 px-3 py-2 border rounded text-black dark:text-white bg-white"
                                value={editModalData.time}
                                onChange={(e) => setEditModalData({ ...editModalData, time: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleUpdateTransaction}
                                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setEditModalData(null)}
                                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Export Section Start */}
            <div className='flex flex-col items-center w-full' ref={pdfRef}>
                {/* User row */}
                <div className="w-full flex items-center justify-start px-6 py-3">

                </div>
                
                {/* Filter buttons row */}
                <div className="w-full flex items-center justify-center px-4 py-3 overflow-x-auto">
                    <div className="flex flex-nowrap gap-2 md:gap-4">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 ease-in-out ${activeTab === "all"
                                    ? "bg-blue-500 text-white shadow-md scale-105"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            All Transactions
                        </button>
                        <button
                            onClick={() => setActiveTab("credit")}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 ease-in-out ${activeTab === "credit"
                                    ? "bg-green-500 text-white shadow-md scale-105"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            Credits Only
                        </button>
                        <button
                            onClick={() => setActiveTab("debit")}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 ease-in-out ${activeTab === "debit"
                                    ? "bg-red-500 text-white shadow-md scale-105"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            Debits Only
                        </button>
                    </div>
                </div>

                {/* Results count */}
                <div className="w-full flex justify-center px-4 pb-2">
                    <div className="text-sm text-gray-600">
                        Showing {getFilteredAndSortedTransactions().length} of {transactions.length} transactions
                    </div>
                </div>

                <div className="w-full flex justify-center items-center py-4 px-4">
                    <div className="bg-white rounded-lg shadow overflow-x-auto w-full md:w-[90%] lg:w-[80%]">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap">S. No</th>
                                    <th 
                                        className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            if (sortBy === 'date') {
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortBy('date');
                                                setSortOrder('desc');
                                            }
                                        }}
                                    >
                                        Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th 
                                        className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            if (sortBy === 'time') {
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortBy('time');
                                                setSortOrder('desc');
                                            }
                                        }}
                                    >
                                        Time {sortBy === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th 
                                        className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            if (sortBy === 'description') {
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortBy('description');
                                                setSortOrder('asc');
                                            }
                                        }}
                                    >
                                        Purpose {sortBy === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    {(activeTab === "all" || activeTab === "credit") && (
                                        <th 
                                            className="h-9 py-2 px-4 text-left text-sm font-medium text-black cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                if (sortBy === 'amount') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('amount');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            Credit {(sortBy === 'amount' && activeTab !== 'debit') && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                    )}
                                    {(activeTab === "all" || activeTab === "debit") && (
                                        <th 
                                            className="h-9 py-2 px-4 text-left text-sm font-medium text-black cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                if (sortBy === 'amount') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('amount');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            Debit {(sortBy === 'amount' && activeTab !== 'credit') && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                    )}
                                    <th className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap">Time Ago</th>
                                    <th className="h-9 py-2 px-4 text-left text-sm font-medium text-black whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {(() => {
                                    const filtered = getFilteredAndSortedTransactions();
                                    if (filtered.length === 0) {
                                        return (
                                            <tr>
                                                <td colSpan="7" className="text-center py-6 text-black">
                                                    {transactions.length === 0
                                                        ? "Click the credit and debit buttons to create the transactions"
                                                        : "No transactions match your current filters"}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return filtered.map((tx, index) => (
                                        <tr key={tx.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 font-medium text-black">{index + 1}</td>
                                            <td className="py-2 px-4 font-medium text-black">{tx.date}</td>
                                            <td className="py-2 px-4 text-black">{tx.time}</td>
                                            <td className="py-2 px-4 text-black">{tx.description}</td>
                                            {activeTab === "all" && (
                                                <>
                                                    <td className="py-2 px-4 text-black">
                                                        {tx.type === "credit" ? `₹${tx.amount}` : "-"}
                                                    </td>
                                                    <td className="py-2 px-4 text-black">
                                                        {tx.type === "debit" ? `₹${tx.amount}` : "-"}
                                                    </td>
                                                </>
                                            )}
                                            {activeTab === "credit" && tx.type === "credit" && (
                                                <td className="py-2 px-4 text-black">₹{tx.amount}</td>
                                            )}
                                            {activeTab === "debit" && tx.type === "debit" && (
                                                <td className="py-2 px-4 text-black">₹{tx.amount}</td>
                                            )}
                                            <td className="py-2 px-4 text-sm text-black">
                                                {(() => {
                                                    const now = new Date();
                                                    const txDateTime = new Date(`${tx.date}T${tx.time}`);
                                                    const diff = Math.floor((now - txDateTime) / 1000);
                                                    if (diff < 60) return `${diff}s ago`;
                                                    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                                                    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                                                    return `${Math.floor(diff / 86400)}d ago`;
                                                })()}
                                            </td>
                                            <td className="py-2 px-4 text-sm">
                                                <button
                                                    onClick={() => handleEditTransaction(tx)}
                                                    className="text-blue-600 hover:underline mr-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTransaction(tx.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ));
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
{/* footer logic of the data.jsx */}
            <div className="flex justify-center py-6 px-4">
                <div className="bg-white rounded-lg p-4 shadow w-full md:w-[90%] lg:w-[80%] xl:w-2/3">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {/* Credit Box */}
                        <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                            <p className="text-sm md:text-[16px] font-semibold text-green-700 dark:text-green-200">Credit 📈</p>
                            <p className="text-base md:text-lg font-semibold text-green-900 dark:text-green-100">
                                ₹ {getFilteredAndSortedTransactions()
                                    .filter((tx) => tx.type === "credit")
                                    .reduce((acc, tx) => acc + tx.amount, 0)
                                    .toLocaleString('en-IN')
                                }
                            </p>
                        </div>
                        {/* Debit Box */}
                        <div className="bg-red-100 dark:bg-red-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                            <p className="text-[16px] font-semibold text-red-700 dark:text-red-200">Debit 📉</p>
                            <p className="text-lg font-semibold text-red-900 dark:text-red-100">
                                ₹ {getFilteredAndSortedTransactions()
                                    .filter((tx) => tx.type === "debit")
                                    .reduce((acc, tx) => acc + tx.amount, 0)
                                    .toLocaleString('en-IN')
                                }
                            </p>
                        </div>
                        {/* Balance Box */}
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                            <p className="text-sm font-medium">Balance</p>
                            <p className="text-lg font-semibold">
                                ₹ {(getFilteredAndSortedTransactions()
                                    .filter((tx) => tx.type === "credit")
                                    .reduce((acc, tx) => acc + tx.amount, 0) -
                                    getFilteredAndSortedTransactions()
                                        .filter((tx) => tx.type === "debit")
                                        .reduce((acc, tx) => acc + tx.amount, 0))
                                    .toLocaleString('en-IN')
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}