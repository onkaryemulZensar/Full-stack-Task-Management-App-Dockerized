import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from '../components/auth/Login';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/tasks');
    }
  }, [currentUser, navigate]);

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login to Your Account
        </h1>

        <Login />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-900 hover:text-purple-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;