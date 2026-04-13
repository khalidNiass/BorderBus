import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Layout.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsSidebarOpen(false);
      }
    };

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`dashboard-layout ${isSidebarOpen && isMobile ? 'sidebar-open' : ''}`}>
      <Sidebar
        id="company-sidebar"
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />
      <div className="dashboard-main">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="dashboard-body">
          {children}
        </div>
      </div>
      {isMobile && (
        <button
          type="button"
          className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          tabIndex={isSidebarOpen ? 0 : -1}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
