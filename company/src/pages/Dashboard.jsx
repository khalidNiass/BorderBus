/**
 * Dashboard Page - Premium Professional UI
 * Main dashboard with KPIs, statistics, analytics, and quick actions
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { initialData, calculateStats, getRecentBookings } from '../data/mockData';
import DashboardCard from '../components/DashboardCard';
import DataTable from '../components/DataTable';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Calendar, Users, DollarSign, Bus, Route } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [stats, setStats] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  useEffect(() => {
    const newStats = calculateStats(data);
    setStats(newStats);
  }, [data]);

  const recentBookings = getRecentBookings(data.bookings, 5);

  const quickActions = [
    {
      label: 'Add new bus',
      path: '/buses',
      icon: <Bus size={20} />,
      meta: 'Fleet',
    },
    {
      label: 'Create a route',
      path: '/routes',
      icon: <Route size={20} />,
      meta: 'Routing',
    },
    {
      label: 'Publish schedule',
      path: '/schedules',
      icon: <Calendar size={20} />,
      meta: 'Timetable',
    },
    {
      label: 'Review bookings',
      path: '/bookings',
      icon: <Activity size={20} />,
      meta: 'Sales',
    },
  ];

  const bookingColumns = [
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'customerName', label: 'Customer', width: '150px' },
    { key: 'numberOfSeats', label: 'Seats', width: '80px' },
    { key: 'totalAmount', label: 'Amount', width: '100px', render: (value) => `$${value}` },
    { key: 'status', label: 'Status', width: '100px', render: (value) => (
      <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>
    )},
    { key: 'bookingDate', label: 'Date', width: '120px' }
  ];

  // Calculate growth metrics
  const prevRevenue = stats.totalRevenue ? stats.totalRevenue * 0.85 : 0;
  const revenueGrowth = prevRevenue > 0 ? Math.round(((stats.totalRevenue - prevRevenue) / prevRevenue) * 100) : 0;
  const bookingGrowth = stats.totalBookings > 0 ? 12 : 0;
  const occupancyRate = stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
          {/* Page Header with Actions */}
          <motion.div
            className="page-actions-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="header-title-section">
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">Welcome back! Here's your business overview.</p>
            </div>
            
            <div className="header-actions">
              <div className="period-selector">
                <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              
            </div>
          </motion.div>

          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Quick actions</h2>
          </motion.div>
          <motion.div className="quick-actions-grid" variants={containerVariants} initial="hidden" animate="visible">
            {quickActions.map((action) => (
              <motion.div key={action.label} variants={itemVariants} className="quick-action-card">
                <div className="stat-icon">
                  {action.icon}
                </div>
                <div className="stat-content">
                  <p className="stat-label">{action.meta}</p>
                  <h3 className="card-title">{action.label}</h3>
                </div>
                <Link to={action.path} className="view-all-link">
                  Open
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Metrics - Premium KPI Cards */}
          <motion.div
            className="kpi-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="kpi-card kpi-revenue">
              <div className="kpi-header">
                <div className="kpi-icon revenue-icon">
                  <DollarSign size={24} strokeWidth={2} />
                </div>
                <div className="kpi-growth" style={{ color: revenueGrowth >= 0 ? '#22c55e' : '#ef4444' }}>
                  {revenueGrowth >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  <span>{Math.abs(revenueGrowth)}%</span>
                </div>
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Total Revenue</p>
                <h3 className="kpi-value">${(stats.totalRevenue || 0).toLocaleString()}</h3>
              </div>
              <div className="kpi-bar">
                <div className="kpi-bar-fill" style={{ width: '75%' }}></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="kpi-card kpi-bookings">
              <div className="kpi-header">
                <div className="kpi-icon bookings-icon">
                  <Calendar size={24} strokeWidth={2} />
                </div>
                <div className="kpi-growth positive">
                  <TrendingUp size={16} />
                  <span>{bookingGrowth}%</span>
                </div>
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Total Bookings</p>
                <h3 className="kpi-value">{stats.totalBookings || 0}</h3>
              </div>
              <div className="kpi-bar">
                <div className="kpi-bar-fill" style={{ width: '68%' }}></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="kpi-card kpi-occupancy">
              <div className="kpi-header">
                <div className="kpi-icon occupancy-icon">
                  <Bus size={24} strokeWidth={2} />
                </div>
                <div className="kpi-growth positive">
                  <TrendingUp size={16} />
                  <span>{occupancyRate}%</span>
                </div>
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Occupancy Rate</p>
                <h3 className="kpi-value">{occupancyRate}%</h3>
              </div>
              <div className="kpi-bar">
                <div className="kpi-bar-fill" style={{ width: `${occupancyRate}%` }}></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="kpi-card kpi-customers">
              <div className="kpi-header">
                <div className="kpi-icon customers-icon">
                  <Users size={24} strokeWidth={2} />
                </div>
                <div className="kpi-growth positive">
                  <TrendingUp size={16} />
                  <span>8%</span>
                </div>
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Total Customers</p>
                <h3 className="kpi-value">{stats.totalCustomers || 0}</h3>
              </div>
              <div className="kpi-bar">
                <div className="kpi-bar-fill" style={{ width: '82%' }}></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <DashboardCard 
                title="Active Buses" 
                value={stats.activeBuses || 0}
                icon="bus"
                color="blue"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardCard 
                title="Total Routes" 
                value={stats.totalRoutes || 0}
                icon="road"
                color="purple"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardCard 
                title="Confirmed Bookings" 
                value={stats.confirmedBookings || 0}
                icon="check"
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardCard 
                title="Pending Bookings" 
                value={(stats.totalBookings || 0) - (stats.confirmedBookings || 0)}
                icon="clock"
                color="orange"
              />
            </motion.div>
          </motion.div>

          {/* Recent Bookings Section */}
          <motion.div
            className="recent-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="section-header">
              <h3 className="section-title">
                <Activity size={18} strokeWidth={2} />
                Recent Bookings
              </h3>
              <motion.a
                href="#"
                className="view-all-link"
                whileHover={{ x: 4 }}
              >
                View All →
              </motion.a>
            </div>
            <DataTable 
              columns={bookingColumns}
              data={recentBookings}
              actions={false}
            />
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            className="quick-stats-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="quick-stat-card">
              <div className="stat-icon pending">
                <Calendar size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Avg. Booking Value</p>
                <h4 className="stat-value">${stats.confirmedBookings > 0 ? Math.round((stats.totalRevenue || 0) / stats.confirmedBookings) : 0}</h4>
              </div>
            </div>

            <div className="quick-stat-card">
              <div className="stat-icon">
                <Route size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Most Popular Route</p>
                <h4 className="stat-value">New York → Boston</h4>
              </div>
            </div>

            <div className="quick-stat-card">
              <div className="stat-icon success">
                <Bus size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Fleet Utilization</p>
                <h4 className="stat-value">92%</h4>
              </div>
            </div>
          </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
