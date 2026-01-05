import { useNavigate } from "react-router-dom";
import { CopyPlus, HomeIcon, Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar({ searchTerm, onSearchChange, userId, showHomeButton = true }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo */}
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-400 flex-shrink-0 flex items-center gap-2">
            <span className="sm:hidden"><CopyPlus className="w-6 h-6" /></span>
            <span className="hidden sm:inline">Task Manager</span>
          </div>

          {/* Search Bar */}
          {onSearchChange && (
            <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md mx-3 sm:mx-4">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search names..."
                className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-colors text-sm sm:text-base"
                autoComplete="off"
              />
            </div>
          )}

          {/* Home Button and User Icon */}
          <div className="flex items-center gap-8 sm:gap-10 flex-shrink-0">
            {showHomeButton && (
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md shadow-sm transition-colors duration-200"
              >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden xs:inline text-sm sm:text-base">Home</span>
              </button>
            )}
            <ProfileDropdown userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
}
