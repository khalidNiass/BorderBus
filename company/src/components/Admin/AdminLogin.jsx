/**
 * Admin Login Component
 * Premium UI with Animated Lucide Icons and Framer Motion
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Moon, Sun, Shield, User, Key, Bus } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="admin-auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="admin-auth-card"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="admin-auth-header">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Bus size={32} className="header-bus-icon" /> BorderBus Admin
          </motion.h1>
          <motion.p
            className="text-muted"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Company Management Dashboard
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

        <div className="admin-auth-footer">
          <motion.button
            type="button"
            className="theme-toggle"
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
          
          {/* Demo Credentials Card */}
          <motion.div
            className="demo-credentials-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="demo-card-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <Shield size={16} strokeWidth={2} className="demo-icon" />
              <span className="demo-label">Demo Account</span>
            </motion.div>

            <div className="demo-credentials-grid">
              <motion.div
                className="credential-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ x: 4 }}
              >
                <div className="credential-icon">
                  <User size={14} strokeWidth={2} />
                </div>
                <div className="credential-content">
                  <span className="credential-label">Email</span>
                  <code className="credential-value">admin@borderbus.com</code>
                </div>
              </motion.div>

              <motion.div
                className="credential-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 }}
                whileHover={{ x: 4 }}
              >
                <div className="credential-icon">
                  <Key size={14} strokeWidth={2} />
                </div>
                <div className="credential-content">
                  <span className="credential-label">Password</span>
                  <code className="credential-value">any password</code>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminLogin;
