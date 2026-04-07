/**
 * Main App Component
 * Sets up routing and global providers for the company dashboard
 * Admin-only app with conditional rendering support
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin';

// Pages
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Buses from './pages/Buses';
import RoutesPage from './pages/Routes';
import Schedules from './pages/Schedules';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Settings from './pages/Settings';

// Styles
import './styles/global.css';

/**
 * Conditional rendering: This is the ADMIN-ONLY side of BorderBus
 * Uses separate styling and data structure from the User Side
 * To switch to User Side: import User app components instead
 */
function App() {
  const IS_ADMIN_SIDE = true; // Toggle true/false to switch between Admin and User sides

  // If this were a monolith, you could render the User app here
  if (!IS_ADMIN_SIDE) {
    return <div>User Side App would load here</div>;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Admin Authentication Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buses"
            element={
              <ProtectedRoute>
                <Buses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute>
                <RoutesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <ProtectedRoute>
                <Schedules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
