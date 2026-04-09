/**
 * Sidebar Navigation Component
 * Displays navigation menu for all dashboard pages
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBus, FaChartBar, FaRoad, FaCalendar, FaTicketAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const iconComponents = {
    dashboard: <FaChartBar />,
    buses: <FaBus />,
    routes: <FaRoad />,
    schedules: <FaCalendar />,
    bookings: <FaTicketAlt />,
    customers: <FaUsers />,
    settings: <FaCog />
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { path: '/buses', label: 'Manage Buses', key: 'buses' },
    { path: '/routes', label: 'Manage Routes', key: 'routes' },
    { path: '/schedules', label: 'Manage Schedules', key: 'schedules' },
    { path: '/bookings', label: 'Bookings', key: 'bookings' },
    { path: '/customers', label: 'Customers', key: 'customers' },
    { path: '/settings', label: 'Settings', key: 'settings' }
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
        <h1 className="sidebar-title"><FaBus className="sidebar-logo" /> BorderBus Admin</h1>
        <p className="sidebar-subtitle">Company Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{iconComponents[item.key]}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
