/**
 * Protected Route Component
 * Ensures only authenticated users can access dashboard routes
 */

import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Clean console on route change to prevent clutter in development
    if (process.env.NODE_ENV === 'development') {
      console.clear();
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
