/**
 * Settings Page
 * Company profile settings and preferences
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Settings.css';

const Settings = () => {
  const { companyData, isDarkMode, toggleDarkMode, updateAppData } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    registrationNumber: ''
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [preferences, setPreferences] = useState({
    revenueAnalytics: true,
    recentBookings: true,
    emailNotifications: true
  });

  useEffect(() => {
    if (companyData) {
      setFormData({
        name: companyData.name || '',
        email: companyData.email || '',
        phone: companyData.phone || '',
        address: companyData.address || '',
        registrationNumber: companyData.registrationNumber || ''
      });
    }
  }, [companyData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleUpdatePreferences = () => {
    setSaveMessage('Preferences updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleUpdatePassword = () => {
    setSaveMessage('Password updated successfully! (Demo mode)');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="settings-container">
          <div className="settings-header">
            <div className="settings-title-section">
              <h2 className="page-title">Settings</h2>
              <p className="page-subtitle">Manage your company profile and preferences</p>
            </div>
          </div>

          <div className="settings-grid">
            {/* Company Settings */}
            <div className="settings-card">
              <div className="card-header">
                <h3>🏢 Company Profile</h3>
                <p className="card-description">Update your company information</p>
              </div>
              <form onSubmit={handleSaveSettings} className="settings-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1-234-567-8900"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Enter your company address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleFormChange}
                    readOnly
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  💾 Save Changes
                </button>
                {saveMessage && <p className="success-message">{saveMessage}</p>}
              </form>
            </div>

            {/* Dashboard Preferences */}
            <div className="settings-card">
              <div className="card-header">
                <h3>Dashboard Preferences</h3>
                <p className="card-description">Customize your dashboard experience</p>
              </div>
              <form className="settings-form">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      name="revenueAnalytics"
                      checked={preferences.revenueAnalytics}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkbox-text">
                      <strong>Show Revenue Analytics</strong>
                      <small>Display financial metrics on dashboard</small>
                    </span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      name="recentBookings"
                      checked={preferences.recentBookings}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkbox-text">
                      <strong>Show Recent Bookings</strong>
                      <small>Display latest bookings in dashboard</small>
                    </span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      name="emailNotifications"
                      checked={preferences.emailNotifications}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkbox-text">
                      <strong>Email Notifications</strong>
                      <small>Receive email alerts for important events</small>
                    </span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <span className="checkbox-text">
                      <strong>Dark Mode</strong>
                      <small>Use dark theme for the interface</small>
                    </span>
                  </label>
                </div>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-block"
                  onClick={handleUpdatePreferences}
                >
                  ✓ Update Preferences
                </button>
              </form>
            </div>

            {/* Security Settings */}
            <div className="settings-card">
              <div className="card-header">
                <h3>🔐 Security</h3>
                <p className="card-description">Manage your account security</p>
              </div>
              <form className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-block"
                  onClick={handleUpdatePassword}
                >
                  🔑 Update Password
                </button>
              </form>
            </div>

            {/* Data Management */}
            <div className="settings-card">
              <div className="card-header">
                <h3>Data Management</h3>
                <p className="card-description">Export, backup, and manage your data</p>
              </div>
              <div className="data-management">
                <div className="management-item">
                  <div className="item-info">
                    <strong>Export Data</strong>
                    <small>Download your data in CSV format</small>
                  </div>
                  <button className="btn btn-secondary btn-sm">Export</button>
                </div>

                <div className="management-item">
                  <div className="item-info">
                    <strong>Clear Cache</strong>
                    <small>Remove cached data to free up space</small>
                  </div>
                  <button className="btn btn-secondary btn-sm">🔄 Clear</button>
                </div>

                <div className="management-item danger">
                  <div className="item-info">
                    <strong>Reset Dashboard</strong>
                    <small>Reset all settings to default (cannot undo)</small>
                  </div>
                  <button className="btn btn-danger btn-sm">🗑️ Reset</button>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="settings-card">
              <div className="card-header">
                <h3>❓ Help & Support</h3>
                <p className="card-description">Get help and contact support</p>
              </div>
              <div className="help-info">
                <div className="info-item">
                  <label>Version</label>
                  <span>1.0.0</span>
                </div>
                <div className="info-item">
                  <label>Last Updated</label>
                  <span>April 2026</span>
                </div>
                <div className="help-buttons">
                  <button className="btn btn-secondary btn-block">📖 Documentation</button>
                  <button className="btn btn-secondary btn-block">💬 Contact Support</button>
                </div>
              </div>
            </div>

            {/* API Configuration */}
            <div className="settings-card">
              <div className="card-header">
                <h3>🔌 API Configuration</h3>
                <p className="card-description">Manage API credentials and endpoints</p>
              </div>
              <form className="settings-form">
                <div className="form-group">
                  <label>API Endpoint</label>
                  <input 
                    type="text" 
                    value="https://api.borderbus.local/v1" 
                    readOnly 
                  />
                </div>

                <div className="form-group">
                  <label>API Key</label>
                  <input type="password" placeholder="Enter API Key" />
                </div>

                <button type="button" className="btn btn-secondary btn-block">
                  🔗 Test Connection
                </button>
              </form>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
