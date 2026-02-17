import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CopyPlus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useTasks } from "../hooks/useTasks";
import { useHealthCheck } from "../hooks/useHealthCheck";
import ListNavbar from "../components/list/ListNavbar";
import TaskCard from "../components/list/TaskCard";
import TaskModal from "../components/list/TaskModal";
import TaskEditModal from "../components/list/TaskEditModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { TaskListSkeleton } from "../components/ui/skeleton";
import Footer from "../components/Footer";

export default function List() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editModalTask, setEditModalTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, taskId: null });

  // Warm up backend
  useHealthCheck();

  // Get user from localStorage
  const localStorage1 = localStorage.getItem("account-user");
  const localStorage2 = JSON.parse(localStorage1);
  const userId = localStorage2?.user?.id;

  // Use the useTasks hook
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask
  } = useTasks(userId);

  // Filter tasks based on search term
  const filteredTasks = (tasks || []).filter(task =>
    task && task.name && task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle create task
  const handleCreateTask = async (taskData) => {
    const result = await createTask({
      ...taskData,
      userId: userId
    });

    if (result.success) {
      setShowModal(false);
    }
    return result;
  };

  // Handle update task
  const handleUpdateTask = async (taskData) => {
    const result = await updateTask(editModalTask._id, taskData);

    if (result.success) {
      setEditModalTask(null);
    }
    return result;
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    setDeleteConfirm({ open: true, taskId });
  };

  const confirmDeleteTask = async () => {
    if (deleteConfirm.taskId) {
      await deleteTask(deleteConfirm.taskId);
    }
  };

  // Handle task card click
  const handleTaskClick = (task) => {
    navigate(`/List/${task._id}`);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditModalTask(task);
  };

  return (
    <>
      {/* Navigation Bar */}
      <ListNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onHomeClick={() => navigate("/")}
        onAddTask={() => setShowModal(true)}
        userId={userId}
      />

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <main className="w-full max-w-7xl px-6 md:px-12">
          <div className="bg-gray-200 dark:bg-gray-800 p-6  mb-10 rounded-lg w-full min-h-[550px]  shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.05)]">

            {/* Loading State */}
            {loading && (
              <div>
                <TaskListSkeleton count={6} />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Task Grid */}
            {!loading && !error && (
              <div
                className="grid gap-6 grid-cols-1 sm:grid-cols-2"
              >
                <AnimatePresence>
                  {filteredTasks.length === 0 ? (
                    <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center py-20">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {searchTerm ? "No tasks found" : "No tasks yet"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {searchTerm ? "Try a different search term" : "Click the + button to create your first task"}
                      </p>
                      {!searchTerm && (
                        <button
                          onClick={() => setShowModal(true)}
                          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                        >
                          <CopyPlus className="w-5 h-5" />
                          Create Your First Task
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <TaskCard
                        key={task._id || index}
                        task={task}
                        index={index}
                        onTaskClick={handleTaskClick}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>
      </div>



      {/* Task Modal */}
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTask}
      />

      {/* Task Edit Modal */}
      <TaskEditModal
        isOpen={!!editModalTask}
        task={editModalTask}
        onClose={() => setEditModalTask(null)}
        onSubmit={handleUpdateTask}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ open, taskId: null })}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
      <Footer />
    </>
  );
}
