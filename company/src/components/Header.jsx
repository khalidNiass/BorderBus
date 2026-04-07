/**
 * Header Component
 * Professional dashboard header with company branding and user info
 */

import { useAuth } from '../context/AuthContext';
import { FaBus } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import '../styles/Header.css';

const Header = () => {
  const { companyData, isDarkMode, toggleDarkMode } = useAuth();
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'A';
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <div className="company-branding">
            <div className="company-logo">
              <FaBus className="logo-icon" />
            </div>
            <div className="company-info">
              <h1 className="company-name">{companyData?.name || 'Company Dashboard'}</h1>
              <p className="company-email">{companyData?.email || 'admin@company.com'}</p>
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
          <div className="user-section">
            <div className="user-avatar">{getInitials(companyData?.name)}</div>
            <div className="user-details">
              <p className="user-name">Admin</p>
              <p className="user-role">Company Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
