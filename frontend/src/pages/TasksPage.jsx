import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import Loading from '../components/common/Loading';
import {
  getTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask
} from '../api/taskApi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Update stats whenever tasks change
    setStats({
      total: tasks.length,
      completed: tasks.filter(task => task.isCompleted).length,
      active: tasks.filter(task => !task.isCompleted).length
    });
  }, [tasks]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      toast.success('Task created successfully!');
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
      throw error;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully!');
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
      throw error;
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      toast.success('Task marked as completed!');
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task');
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
      return taskId;
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
      throw error;
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-purple-900">{stats.active}</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>

        {editingTask ? (
          <TaskForm
            initialData={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={handleCancelEdit}
          />
        ) : (
          <TaskForm onSubmit={handleCreateTask} />
        )}

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">You don't have any tasks yet.</p>
            <p className="text-gray-500 mt-2">Create your first task to get started!</p>
          </motion.div>
        ) : (
          <TaskList
            tasks={tasks}
            onComplete={handleCompleteTask}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TasksPage;