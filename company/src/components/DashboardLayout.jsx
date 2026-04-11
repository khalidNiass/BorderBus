import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; // Assuming you have a Header component
import "../styles/global.css"; // Ensure global styles are imported here

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to Header if it has a toggle button */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
