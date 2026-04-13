/**
 * Sidebar Navigation Component
 * Displays navigation menu for all dashboard pages
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBus, FaChartBar, FaRoad, FaCalendar, FaTicketAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ id = 'company-sidebar', isOpen = false, isMobile = false, toggleSidebar }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const iconComponents = {
    dashboard: <FaChartBar />,
    buses: <FaBus />,
    routes: <FaRoad />,
    schedules: <FaCalendar />,
    bookings: <FaTicketAlt />,
    customers: <FaUsers />,
    settings: <FaCog />,
    profile: <FaUsers />
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { path: '/buses', label: 'Manage Buses', key: 'buses' },
    { path: '/routes', label: 'Manage Routes', key: 'routes' },
    { path: '/schedules', label: 'Manage Schedules', key: 'schedules' },
    { path: '/bookings', label: 'Bookings', key: 'bookings' },
    { path: '/customers', label: 'Customers', key: 'customers' },
    { path: '/settings', label: 'Settings', key: 'settings' },
    { path: '/profile', label: 'Profile', key: 'profile' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const handleNavItemClick = () => {
    if (toggleSidebar && isMobile) {
      toggleSidebar();
    }
  };

  return (
    <aside
      id={id}
      className={`sidebar ${isOpen ? 'open' : ''}`}
      aria-hidden={isMobile ? !isOpen : false}
      role="navigation"
      aria-label="Sidebar"
    >
      <div className="sidebar-header">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">BT</div>
          <div className="sidebar-profile-details">
            <p className="sidebar-profile-name">Admin</p>
            <p className="sidebar-profile-role">Company Manager</p>
            <Link to="/profile" className="sidebar-profile-btn" onClick={handleNavItemClick}>
              View Profile
            </Link>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={handleNavItemClick}
            aria-current={isActive(item.path) ? 'page' : undefined}
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
