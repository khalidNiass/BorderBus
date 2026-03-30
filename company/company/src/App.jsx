import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ManageBuses from './pages/ManageBuses'
import ManageRoutes from './pages/ManageRoutes'
import ManageSchedules from './pages/ManageSchedules'
import BookingsPage from './pages/BookingsPage'
import CustomersPage from './pages/CustomersPage'
import SettingsPage from './pages/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('companyAuth') ? true : false
  )

  const handleLogin = (companyData) => {
    localStorage.setItem('companyAuth', JSON.stringify(companyData))
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('companyAuth')
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buses"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ManageBuses onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/routes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ManageRoutes onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ManageSchedules onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookingsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CustomersPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SettingsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

