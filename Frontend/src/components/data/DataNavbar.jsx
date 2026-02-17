import { Menu, Filter, ChevronDown, Search, Plus, Minus, ArrowLeft, Share2, GitGraph, Download, ChartLine } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

export default function DataNavbar({
  showFilters,
  setShowFilters,
  onCreditClick,
  onDebitClick,
  onDownloadPDF,
  onShareLink,
  onShareApp,
  onLogout,
  showDropdown,
  setShowDropdown,
  showMobileMenu,
  setShowMobileMenu,
  searchQuery,
  setSearchQuery,
  taskName // Add this prop
}) {
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const { shortcutLabel } = useKeyboardShortcut('k', () => {
    searchRef.current?.focus();
  });

  // Click-away logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, setShowDropdown]);


  return (
    <nav className="sticky top-0 z-30 p-3 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-800 flex flex-wrap items-center justify-between gap-y-4 transition-colors duration-300">

      {/* Logo Area */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                     border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800
                     text-gray-800 dark:text-gray-100
                     shadow-sm hover:shadow-md
                     hover:bg-gray-50 dark:hover:bg-gray-700
                     active:scale-[0.98]
                     transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className='hidden sm:inline'>Back</span>
        </button>


        <div className="flex flex-1 justify-center  lg:hidden">
          <div
            className="flex items-center justify-center w-[120px]  px-4 py-1.5 rounded-full
                     text-black dark:text-white dark:bg-gray-800  bg-white border dark:hover:bg-gray-700 hover:bg-gray-100
                     shadow-md
                     max-w-[200px]"
            title={taskName}
          >
            <span className="text-sm font-semibold truncate">
              {taskName}
            </span>

          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100  bg-white dark:border-gray-600  border  border-gray-300  dark:hover:bg-gray-600 dark:bg-gray-800 transition-colors"
        >
          <Menu className="h-4.5 w-4.5 dark:text-white text-black " />
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full lg:w-auto lg:flex-1 lg:max-w-md lg:mx-6 order-1 lg:order-1">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder={`Search transactions... (${shortcutLabel})`}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-3 order-2">

        {/* Filter Button */}
        <button
          onMouseDown={(e) => e.stopPropagation()} // Prevent closing filter panel when clicking toggle
          onClick={(e) => {
            e.stopPropagation();
            setShowFilters(!showFilters);
          }}
          className={`px-4 py-2.5 font-medium rounded-lg text-sm border transition-all duration-200 flex items-center gap-2 ${showFilters
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300'
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-750'
            }`}
        >
          <Filter className={`h-4 w-4 ${showFilters ? 'fill-current' : ''}`} />
          <span>Filters</span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        {/* Credit Button */}
        <button
          onClick={onCreditClick}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Credit
        </button>

        {/* Debit Button */}
        <button
          onClick={onDebitClick}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2"
        >
          <Minus className="h-4 w-4" />
          Debit
        </button>

        {/* Dropdown Actions */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(prev => !prev);
            }}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium border flex items-center gap-2 transition-all ${showDropdown
              ? 'bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-750'
              }`}
          >
            <span>Actions</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden animation-fade-in z-50">
              <div className="p-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Export
                </div>
                <button
                  className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center gap-4"
                  onClick={onDownloadPDF}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors font-medium flex items-center gap-4"
                  onClick={() => {
                    setShowDropdown(false);
                    onShareLink();
                  }}
                >
                  <ChartLine className="h-4 w-4" />
                  View Graph
                </button>

                <button
                  className="w-full text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg text-sm transition-colors font-medium flex items-center gap-4"
                  onClick={() => {
                    setShowDropdown(false);
                    onShareApp();
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share App
                </button>



                <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-sm transition-colors font-medium"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}