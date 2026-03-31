/**
 * Sidebar Navigation Component
 * Displays navigation menu for all dashboard pages
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/buses', label: 'Manage Buses', icon: '🚌' },
    { path: '/routes', label: 'Manage Routes', icon: '🛣️' },
    { path: '/schedules', label: 'Manage Schedules', icon: '📅' },
    { path: '/bookings', label: 'Bookings', icon: '🎫' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">🚌 BorderBus Admin</h1>
        <p className="sidebar-subtitle">Company Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
