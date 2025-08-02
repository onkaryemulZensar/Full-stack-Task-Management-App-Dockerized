import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTasks, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <FaCheckCircle className="text-6xl text-purple-900" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TaskMaster</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal task management solution to stay organized and productive.
        </p>
        {currentUser ? (
          <Link to="/tasks">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary bg-purple-900 hover:bg-purple-700 text-lg px-6 py-3"
            >
              Go to My Tasks
            </motion.button>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-purple-900 hover:bg-purple-700 text-lg px-6 py-3 w-full sm:w-auto"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-6 py-3 w-full sm:w-auto"
              >
                Register
              </motion.button>
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-8 mb-12"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <FaTasks className="text-xl text-purple-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Manage Tasks</h3>
          <p className="text-gray-600">
            Create, update, and organize your tasks in a simple and intuitive interface.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <FaCheckCircle className="text-xl text-purple-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
          <p className="text-gray-600">
            Mark tasks as completed and track how long it took to finish each task.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <FaUserAlt className="text-xl text-purple-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Personal Account</h3>
          <p className="text-gray-600">
            Secure your tasks with your own account and access them from anywhere.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
        <p className="text-gray-600 mb-4">
          TaskMaster helps you organize your work and personal life. Create tasks, set priorities,
          and track your progress all in one place.
        </p>
        <p className="text-gray-600">
          Join thousands of users who have improved their productivity with TaskMaster.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;