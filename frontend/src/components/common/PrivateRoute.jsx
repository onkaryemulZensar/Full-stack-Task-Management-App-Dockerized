import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from './Loading';

const PrivateRoute = () => {
  const { currentUser, initializing } = useContext(AuthContext);
  const location = useLocation();

  // Show loading during initial auth check
  if (initializing) {
    return <Loading />;
  }

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;