import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <FaCheckCircle className="text-2xl mr-2" />
            <h1 className="text-xl font-bold">TaskMaster</h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/history" className="hover:text-purple-100 transition-colors">
                  Task History
                </Link>
                <Link to="/tasks" className="hover:text-purple-100 transition-colors">
                  My Tasks
                </Link>
                <div className="flex items-center">
                  <span className="mr-4">
                    Welcome, {currentUser.username}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center px-3 py-1 bg-purple-500 rounded hover:bg-purple-400 transition-colors"
                  >
                    <FaSignOutAlt className="mr-1" />
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-purple-100 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-white text-purple-600 rounded hover:bg-purple-100 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <nav className="flex flex-col mt-4 pb-2 space-y-4">
                {currentUser ? (
                  <>
                    <Link
                      to="/tasks"
                      className="py-2 hover:text-purple-600 transition-colors"
                      onClick={closeMenu}
                    >
                      My Tasks
                    </Link>
                    <div className="py-2">
                      Welcome, {currentUser.username}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="flex items-center py-2 text-left hover:text-purple-200 transition-colors"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="py-2 hover:text-primary-200 transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="py-2 hover:text-primary-200 transition-colors"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;