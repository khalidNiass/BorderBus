/**
 * Dashboard Page
 * Main dashboard with overview statistics and recent bookings
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData, calculateStats, getRecentBookings } from '../data/mockData';
import DashboardCard from '../components/DashboardCard';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Initialize data if not already set
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  useEffect(() => {
    // Calculate statistics whenever data changes
    const newStats = calculateStats(data);
    setStats(newStats);
  }, [data]);

  const recentBookings = getRecentBookings(data.bookings, 5);

  const bookingColumns = [
    { key: 'id', label: 'Booking ID', width: '120px' },
    { key: 'customerName', label: 'Customer', width: '150px' },
    { key: 'numberOfSeats', label: 'Seats', width: '80px' },
    { key: 'totalAmount', label: 'Amount', width: '100px', render: (value) => `$${value}` },
    { key: 'status', label: 'Status', width: '100px', render: (value) => (
      <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>
    )},
    { key: 'bookingDate', label: 'Date', width: '120px' }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <h2 className="page-title">Dashboard Overview</h2>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <DashboardCard 
              title="Total Buses" 
              value={stats.totalBuses || 0}
              icon="🚌"
              color="blue"
            />
            <DashboardCard 
              title="Active Buses" 
              value={stats.activeBuses || 0}
              icon="✅"
              color="green"
            />
            <DashboardCard 
              title="Total Routes" 
              value={stats.totalRoutes || 0}
              icon="🛣️"
              color="purple"
            />
            <DashboardCard 
              title="Total Bookings" 
              value={stats.totalBookings || 0}
              icon="🎫"
              color="orange"
            />
            <DashboardCard 
              title="Total Customers" 
              value={stats.totalCustomers || 0}
              icon="👥"
              color="teal"
            />
            <DashboardCard 
              title="Total Revenue" 
              value={`$${(stats.totalRevenue || 0).toLocaleString()}`}
              icon="💰"
              color="gold"
            />
          </div>

          {/* Recent Bookings Section */}
          <div className="recent-section">
            <h3 className="section-title">Recent Bookings</h3>
            <DataTable 
              columns={bookingColumns}
              data={recentBookings}
              actions={false}
            />
          </div>

          {/* Quick Info */}
          <div className="quick-info">
            <div className="info-card">
              <h4>Confirmed Bookings</h4>
              <p className="info-value">{stats.confirmedBookings || 0}</p>
            </div>
            <div className="info-card">
              <h4>Average Booking Value</h4>
              <p className="info-value">
                ${stats.confirmedBookings > 0 
                  ? Math.round((stats.totalRevenue || 0) / stats.confirmedBookings) 
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
