import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import API_BASE_URL from '../config/api';

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await fetch(`${API_BASE_URL}/get-task/${userId}`);
      const data = await response.json();
      if (response.ok) {
        // Handle empty tasks array gracefully
        setTasks(data.tasks || []);
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
        await fetchTasks();
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
        await fetchTasks();
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
        setTasks(prev => prev.filter(t => t._id !== taskId));
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
