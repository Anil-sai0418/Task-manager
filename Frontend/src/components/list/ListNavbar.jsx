import { CopyPlus, Home, Plus, Search } from 'lucide-react';
import ProfileDropdown from '../shared/ProfileDropdown';

export default function ListNavbar({ 
  searchTerm, 
  setSearchTerm, 
  onHomeClick,
  onAddTask,
  userId
}) {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Glassmorphism Background Layer */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm" />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* LEFT: Logo & Brand */}
          <div 
            onClick={onHomeClick} 
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className=" bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
<img  className='w-[30px] h-[30px] rounded-sm' src="/TM.png" alt="tm iamge" />
            </div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
              TaskManager
            </span>
          </div>

          {/* CENTER: Search Bar */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your tasks..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200 sm:text-sm"
                autoComplete="off"
              />
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Create Task Button (Responsive) */}
            <button
              onClick={onAddTask}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
              aria-label="Create new task"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline font-medium text-sm">New Task</span>
            </button>

           

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />

            {/* Profile */}
            <div className="pl-1">
              <ProfileDropdown userId={userId} />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}