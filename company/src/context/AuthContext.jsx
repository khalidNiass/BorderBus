/**
 * Authentication Context
 * Manages company login state and authentication
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('companyAuth');
    const storedData = localStorage.getItem('appData');

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setCompanyData(authData);
      } catch (error) {
        console.error('Failed to load auth data:', error);
        localStorage.removeItem('companyAuth');
      }
    }

    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setAppData(data);
      } catch (error) {
        console.error('Failed to load app data:', error);
        localStorage.removeItem('appData');
      }
    }

    setLoading(false);
  }, []);

  /**
   * Login function with dummy validation
   * @param {string} email - Company email
   * @param {string} password - Company password (for demo, any password works)
   * @returns {boolean} Login success status
   */
  const login = (email, password) => {
    if (!email || !password) {
      return false;
    }

    // Dummy authentication (in real app, this would call a backend API)
    const company = {
      id: 1,
      name: 'BorderBus Transport',
      email: email,
      phone: '+1-234-567-8900',
      address: '123 Main Street, City, Country',
      registrationNumber: 'REG-2024-001'
    };

    setIsAuthenticated(true);
    setCompanyData(company);

    // Save to localStorage
    localStorage.setItem('companyAuth', JSON.stringify(company));

    return true;
  };

  /**
   * Register function with dummy validation
   * @param {Object} formData - Registration form data
   * @returns {boolean} Registration success status
   */
  const register = (formData) => {
    if (!formData.companyName || !formData.email || !formData.password) {
      return false;
    }

    const company = {
      id: Math.random(),
      name: formData.companyName,
      email: formData.email,
      phone: formData.phone || '',
      address: formData.address || '',
      registrationNumber: formData.registrationNumber || 'REG-' + Date.now()
    };

    setIsAuthenticated(true);
    setCompanyData(company);

    // Save to localStorage
    localStorage.setItem('companyAuth', JSON.stringify(company));

    return true;
  };

  /**
   * Logout function
   */
  const logout = () => {
    setIsAuthenticated(false);
    setCompanyData(null);
    localStorage.removeItem('companyAuth');
  };

  /**
   * Update app data (buses, routes, schedules, bookings, customers)
   * @param {Object} data - Updated app data
   */
  const updateAppData = (data) => {
    setAppData(data);
    localStorage.setItem('appData', JSON.stringify(data));
  };

  const value = {
    isAuthenticated,
    companyData,
    appData,
    loading,
    login,
    register,
    logout,
    updateAppData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use Auth Context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
