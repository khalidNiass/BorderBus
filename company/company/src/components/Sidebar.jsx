import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa'

/**
 * Sidebar Component
 * Navigation menu for the dashboard
 * Contains links to all main pages
 */
const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Navigation items with icons and paths
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FaHome /> },
    { path: '/buses', label: 'Manage Buses', icon: <FaBus /> },
    { path: '/routes', label: 'Manage Routes', icon: <FaMapMarkerAlt /> },
    { path: '/schedules', label: 'Manage Schedules', icon: <FaClock /> },
    { path: '/bookings', label: 'Bookings', icon: <FaClipboardList /> },
    { path: '/customers', label: 'Customers', icon: <FaUsers /> },
    { path: '/settings', label: 'Settings', icon: <FaCog /> },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
      window.location.href = '/login'
    }
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6 transition-transform duration-300 z-40 overflow-y-auto shadow-2xl`}
      >
        {/* Logo/Company Name */}
        <div className="mb-10 mt-8 lg:mt-0 animate-slideInLeft">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Border</span>
            <span className="text-white">Bus</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Admin Dashboard</p>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-blue-400'
              }`}
            >
              <span className={`text-lg transition-transform group-hover:scale-110 ${
                isActive(item.path) ? 'text-white' : 'text-slate-400'
              }`}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive(item.path) && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30 hover:scale-105"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Click outside to close sidebar on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
