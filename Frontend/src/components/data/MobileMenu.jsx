import { Filter, ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  showFilters, 
  setShowFilters,
  onCreditClick,
  onDebitClick,
  onDownloadPDF,
  onShareLink,
  showMobileDropdown,
  setShowMobileDropdown
}) {
  const mobileDropdownRef = useRef(null);

  // Click-away logic for closing the mobile dropdown menu
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
  }, [showMobileDropdown, setShowMobileDropdown]);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed bottom-0 left-0 w-full sm:w-96 bg-white shadow-lg z-50 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
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
            onClick={onCreditClick}
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
          >
            Credit
          </button>
          <button
            onClick={onDebitClick}
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
                <div className="mt-2 w-full rounded-xl overflow-hidden bg-white shadow-lg">
                  <button
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                    onClick={() => {
                      onDownloadPDF();
                      setShowMobileDropdown(false);
                      onClose();
                    }}
                  >
                    Save as PDF
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                    onClick={() => {
                      onShareLink();
                      setShowMobileDropdown(false);
                      onClose();
                    }}
                  >
                    View Graph
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-[15px] font-medium flex items-center gap-3"
                    onClick={() => {
                      setShowMobileDropdown(false);
                      onClose();
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
  );
}
