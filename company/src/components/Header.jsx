/**
 * Header Component
 * Professional dashboard header with company branding and user info
 */

import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import '../styles/Header.css';

const Header = ({ toggleSidebar = () => {}, isSidebarOpen = false }) => {
  const { isDarkMode, toggleDarkMode } = useAuth();
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <button
            type="button"
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isSidebarOpen}
            aria-controls="company-sidebar"
          >
            {isSidebarOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
          </button>
          <div className="company-branding">
            <div className="company-info">
              <h1 className="company-name">Company Dashboard</h1>
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="header-status">
            <div className="status-indicator online"></div>
            <span className="status-text">Online</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-time">{currentTime}</div>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <BsSun className="theme-icon" /> : <BsMoon className="theme-icon" />}
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
