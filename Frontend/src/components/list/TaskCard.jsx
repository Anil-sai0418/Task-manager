// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onTaskClick, onEditTask, onDeleteTask }) {
  const navigate = useNavigate();

  return (
    <motion.div
      key={task._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/tasks/${task._id}`);
        }
      }}
      className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-200/70 dark:border-gray-700/70 p-6 relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      onClick={(e) => {
        if (["INPUT", "BUTTON", "SVG", "PATH"].includes(e.target.tagName)) return;
        if (onTaskClick) {
          onTaskClick(task);
        } else {
          navigate(`/List/${task._id}`);
        }
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h2
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 
                       break-words line-clamp-2 leading-snug"
            title={task.name}
          >
            {task.name}
          </h2>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditTask(task);
              }}
              className="px-2.5 py-1 text-xs font-medium rounded-md border border-gray-300/70 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task._id);
              }}
              className="px-2.5 py-1 text-xs font-medium rounded-md border border-red-300/70 
                         text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
                         active:scale-95 transition"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Created on <span className="font-medium">{task.date}</span> • {task.time}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-5" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="rounded-xl bg-green-50/80 dark:bg-green-900/20 p-4 flex flex-col items-center justify-center hover:scale-[1.02] transition shadow-sm">
          <p className="text-xs uppercase tracking-wide text-green-600 dark:text-green-400">
            Credit
          </p>
          <p className="text-base sm:text-lg font-semibold tracking-tight text-green-700 dark:text-green-300 mt-1">
            ₹ {task.credit || task.amount || 0}
          </p>
        </div>

        <div className="rounded-xl bg-red-50/80 dark:bg-red-900/20 p-4 flex flex-col items-center justify-center hover:scale-[1.02] transition shadow-sm">
          <p className="text-xs uppercase tracking-wide text-red-600 dark:text-red-400">
            Debit
          </p>
          <p className="text-base sm:text-lg font-semibold tracking-tight text-red-700 dark:text-red-300 mt-1">
            ₹ {task.debit || 0}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50/90 dark:bg-blue-900/30 p-4 flex flex-col items-center justify-center hover:scale-[1.03] transition shadow-sm ring-1 ring-blue-200/60 dark:ring-blue-700/50">
          <p className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Balance
          </p>
          <p className="text-lg sm:text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300 mt-1">
            ₹ {task.balance || 0}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
