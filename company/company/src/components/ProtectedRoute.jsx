import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 * Redirects unauthenticated users to login page
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
