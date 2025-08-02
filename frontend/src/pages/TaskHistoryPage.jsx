import { useState, useEffect } from 'react';
import { getTaskHistory } from '../api/taskHistoryApi';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../utils/tokenUtils';

const TaskHistoryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getCurrentUserId = () => {
    const token = getToken();
    // console.log(token);
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      //   console.log(decodedToken);

      // Extract the NameIdentifier claim for the user ID
      return parseInt(decodedToken.nameid);

    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const formatDateForBackend = (date) => {
    const formattedDate = new Date(date).toISOString();
    return formattedDate.split('T')[0] + "T00:00:00.0000000Z";
  };

  const fetchTaskHistory = async () => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        console.error('User ID not found in token');
        return;
      }

      const formattedStartDate = startDate ? formatDateForBackend(startDate) : null;
      const formattedEndDate = endDate ? formatDateForBackend(endDate) : null;

      const response = await getTaskHistory(userId, formattedStartDate, formattedEndDate);
      setTasks(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching task history:', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchTaskHistory();
    }
  }, [startDate, endDate]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Task History</h1>
        <input
          className="m-4 p-2 ml-0 rounded-md"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="m-4 p-2 rounded-md"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="btn-primary bg-purple-900 hover:bg-purple-700 ml-8"
          onClick={fetchTaskHistory}
        >
          Fetch History
        </motion.button>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2">{task.startDateLocal.split('T')[0]}</td>
                <td className="border border-gray-300 px-4 py-2">{task.endDateLocal ? task.endDateLocal.split('T')[0] : 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{task.isCompleted ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TaskHistoryPage;