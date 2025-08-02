import { useState } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const [taskData, setTaskData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!taskData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(taskData);
      if (!initialData) {
        // Reset form after successful creation
        setTaskData({
          title: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Task form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mb-6"
    >
      <div className="card-header bg-purple-900 text-white">
        <h2 className="text-lg font-medium">
          {initialData ? 'Edit Task' : 'Create New Task'}
        </h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter task title"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              className="input h-24 resize-none"
              placeholder="Enter task description (optional)"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3">
            {onCancel && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="btn-secondary"
              >
                Cancel
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="btn-primary bg-purple-900 hover:bg-purple-700"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TaskForm;