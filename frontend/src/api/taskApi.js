import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
import CONFIG from './config';

const API_URL = CONFIG.API_URL;

// Create axios instance with auth header
const apiClient = axios.create({
  baseURL: API_URL
});

// Add auth token to every request
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

export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const getTask = async (id) => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await apiClient.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await apiClient.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const completeTask = async (id) => {
  const response = await apiClient.patch(`/tasks/${id}/complete`);
  return response.data;
};

export const deleteTask = async (id) => {
  await apiClient.delete(`/tasks/${id}`);
  return id;
};