import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { login, register } from '../api/authApi';
import { getToken, setToken, removeToken } from '../utils/tokenUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = getToken();
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).nameid;
      const username = JSON.parse(atob(token.split('.')[1])).unique_name;
      setCurrentUser({ id: userId, username, token });
    }
    setLoading(false);
    setInitializing(false);
  }, []);

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const data = await login(credentials);
      setCurrentUser(data);
      setToken(data.token);
      toast.success(`Welcome back, ${data.username}!`);
      return data;
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const data = await register(userData);
      setCurrentUser(data);
      setToken(data.token);
      toast.success(`Welcome, ${data.username}!`);
      return data;
    } catch (error) {
      toast.error(error.response?.data || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    removeToken();
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        initializing,
        login: loginUser,
        register: registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};