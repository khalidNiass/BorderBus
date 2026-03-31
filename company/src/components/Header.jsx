/**
 * Header Component
 * Displays company name and user information
 */

import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { companyData } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="company-name">{companyData?.name || 'Company Dashboard'}</h2>
        <p className="company-email">{companyData?.email}</p>
      </div>
      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <p className="user-name">Admin</p>
            <p className="user-role">Company Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
