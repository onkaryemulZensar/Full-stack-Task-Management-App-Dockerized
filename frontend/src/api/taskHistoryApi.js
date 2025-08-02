import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
import CONFIG from './config';

const API_URL = CONFIG.API_URL;

const apiClient = axios.create({
  baseURL: API_URL
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTaskHistory = async (userId, startDate, endDate) => {
  try {
    const params = {
      userId,
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };
    const response = await apiClient.get('/Task/history', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching task history:', error);
    throw error;
  }
};