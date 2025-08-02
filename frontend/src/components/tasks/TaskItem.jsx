import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { formatDate, calculateDuration } from '../../utils/dateUtils';

const TaskItem = ({ task, onComplete, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);


  // Calculate timeToComplete if not provided
  const calculateTimeToComplete = () => {
    if (task.startDate && task.endDate) {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      const diffInMs = end - start;
      return diffInMs > 0 ? diffInMs : 0; // Ensure no negative values
    }
    return null;
  };

  const timeToComplete = task.timeToComplete || calculateTimeToComplete();

  const handleComplete = async () => {
    if (task.isCompleted) return;
    setIsCompleting(true);
    try {
      await onComplete(task.id);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`card task-item mb-4 ${task.isCompleted ? 'border-green-300 bg-green-50' : ''}`}
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.isCompleted ? 'text-green-700' : ''}`}>
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-2 text-gray-600">{task.description}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-y-2 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <FaClock className="mr-1" />
                <span>Added: {formatDate(task.startDate)}</span>
              </div>

              {task.isCompleted && task.endDate && (
                <div className="flex items-center mr-4">
                  <FaCheckCircle className="mr-1 text-green-600" />
                  <span>Completed: {formatDate(task.endDate)}</span>
                </div>
              )}

              {timeToComplete && (
                <div className="flex items-center">
                  <span className="font-medium text-purple-900">
                    Completed in : {calculateDuration(task.startDate, task.endDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            {!task.isCompleted && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(task)}
                  className="p-2 text-purple-900 hover:text-purple-700 transition-colors"
                  title="Edit task"
                >
                  <FaEdit size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="p-2 text-green-600 hover:text-green-800 transition-colors"
                  title="Mark as completed"
                >
                  <FaCheckCircle size={18} />
                </motion.button>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:text-red-800 transition-colors"
              title="Delete task"
            >
              <FaTrash size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {task.isCompleted && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-20 border-r-20 border-t-green-500 border-r-transparent transform rotate-90"></div>
      )}
    </motion.div>
  );
};

export default TaskItem;