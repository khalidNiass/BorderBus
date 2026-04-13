/**
 * Admin Login Component
 * Premium UI with Animated Lucide Icons and Framer Motion
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Moon, Sun, Bus } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/bus.jfif';
import './AdminAuth.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.div className="admin-auth-page">
      <div
        className="admin-auth-page-bg"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <header className="admin-auth-navbar">
        <div className="admin-auth-brand">
          <Bus size={24} className="header-bus-icon" />
          <span>BorderBus Company Login</span>
        </div>
        <motion.button
          type="button"
          className="theme-toggle nav-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          {theme === 'dark' ? (
            <>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Sun size={16} />
              </motion.div>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Moon size={16} />
              </motion.div>
              <span>Dark Mode</span>
            </>
          )}
        </motion.button>
      </header>
      <div className="admin-auth-container">
        <motion.div
          className="admin-auth-card admin-auth-hero-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="admin-auth-hero">
            <span className="auth-badge">BorderBus</span>
            <h1>Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to manage routes, schedules, and company bookings.
            </p>

            <div className="auth-hero-features">
              <div className="auth-feature-card">
                <span>Verified operators</span>
              </div>
              <div className="auth-feature-card">
                <span>Live seat inventory</span>
              </div>
              <div className="auth-feature-card">
                <span>Route analytics</span>
              </div>
              <div className="auth-feature-card">
                <span>Secure dashboard access</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="admin-auth-card admin-auth-form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="admin-auth-header">
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Bus size={28} className="header-bus-icon" /> Company Login
            </motion.h1>
            <motion.p
              className="text-muted"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Secure access for your BorderBus company dashboard.
            </motion.p>
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="admin-auth-form">
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <label htmlFor="email">Email Address</label>
              <div className="form-field">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Mail size={18} strokeWidth={2} className="icon-accent" />
                </motion.div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <label htmlFor="password">Password</label>
              <div className="form-field">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Lock size={18} strokeWidth={2} className="icon-accent" />
                </motion.div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="primary-button full-width"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(29, 155, 240, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              Sign In to Dashboard
            </motion.button>
          </form>

        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminLogin;
