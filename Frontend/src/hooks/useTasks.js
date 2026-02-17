import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import API_BASE_URL from '../config/api';

// Global cache to persist tasks across component mounts
const tasksCache = {
  data: null,
  timestamp: null,
  userId: null,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes cache
};

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async (forceRefresh = false) => {
    if (!userId) return;

    // Check cache first (unless force refresh)
    // Validate cache against current userId to prevent cross-user data leaks
    if (!forceRefresh &&
      tasksCache.data &&
      tasksCache.timestamp &&
      tasksCache.userId === userId) {

      const cacheAge = Date.now() - tasksCache.timestamp;
      if (cacheAge < tasksCache.CACHE_DURATION) {
        setTasks(tasksCache.data);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Cache expired or force refresh - fetch from API
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await fetch(`${API_BASE_URL}/get-task/${userId}`);
      const data = await response.json();
      if (response.ok) {
        // Handle empty tasks array gracefully
        const tasksData = data.tasks || [];
        setTasks(tasksData);
        // Update cache
        tasksCache.data = tasksData;
        tasksCache.timestamp = Date.now();
        tasksCache.userId = userId;
      } else {
        // Only set error for actual failures
        setError("Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const createTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Task created successfully!');
        // Invalidate cache so next fetch gets fresh data
        tasksCache.timestamp = null;
        tasksCache.data = null;
        // Fetch fresh data
        await fetchTasks(true);
        return { success: true, data };
      }
      toast.error(data.message || 'Failed to create task');
      return { success: false, message: data.message };
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error('Server error while creating task');
      return { success: false, message: 'Server error' };
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-task`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: taskId,
          ...updates
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Task updated successfully!');
        // Invalidate cache so next fetch gets fresh data
        tasksCache.timestamp = null;
        tasksCache.data = null;
        // Fetch fresh data
        await fetchTasks(true);
        return { success: true };
      }
      toast.error(data.message || 'Failed to update task');
      return { success: false, message: data.message };
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error('Server error while updating task');
      return { success: false, message: 'Server error' };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // First, find the task to get its name
      const taskToDelete = tasks.find(t => t._id === taskId);
      if (!taskToDelete) {
        toast.error('Task not found');
        return { success: false, message: 'Task not found' };
      }

      const response = await fetch(`${API_BASE_URL}/delete-task`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskToDelete.name }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Task deleted successfully!');
        // Update local state immediately for instant feedback
        const updatedTasks = tasks.filter(t => t._id !== taskId);
        setTasks(updatedTasks);
        // Invalidate cache
        tasksCache.data = updatedTasks;
        tasksCache.timestamp = Date.now();
        return { success: true };
      }
      toast.error(data.message || 'Failed to delete task');
      return { success: false, message: data.message };
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Server error while deleting task');
      return { success: false, message: 'Server error' };
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
