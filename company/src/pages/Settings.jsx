/**
 * Settings Page
 * Company profile settings and preferences
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Settings.css';

const Settings = () => {
  const { companyData } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    registrationNumber: ''
  });
  const [saveMessage, setSaveMessage] = useState('');

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

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveMessage('Settings saved successfully! (Demo mode)');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="settings-container">
          <h2 className="page-title">Settings</h2>

          <div className="settings-grid">
            {/* Company Settings */}
            <div className="settings-card">
              <h3>Company Profile</h3>
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
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
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

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                {saveMessage && <p className="success-message">{saveMessage}</p>}
              </form>
            </div>

            {/* Dashboard Preferences */}
            <div className="settings-card">
              <h3>Dashboard Preferences</h3>
              <form className="settings-form">
                <div className="form-group">
                  <label>
                    <input type="checkbox" defaultChecked /> Show Revenue Analytics
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" defaultChecked /> Show Recent Bookings
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" defaultChecked /> Email Notifications
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" /> Dark Mode
                  </label>
                </div>

                <button type="button" className="btn btn-secondary">
                  Update Preferences
                </button>
              </form>
            </div>

            {/* Security Settings */}
            <div className="settings-card">
              <h3>Security</h3>
              <form className="settings-form">
                <div className="form-group">
                  <label>Change Password</label>
                  <input type="password" placeholder="Current Password" />
                </div>

                <div className="form-group">
                  <input type="password" placeholder="New Password" />
                </div>

                <div className="form-group">
                  <input type="password" placeholder="Confirm New Password" />
                </div>

                <button type="button" className="btn btn-secondary">
                  Update Password
                </button>
              </form>
            </div>

            {/* Data Management */}
            <div className="settings-card">
              <h3>Data Management</h3>
              <div className="data-management">
                <p>Manage your dashboard data</p>
                <button type="button" className="btn btn-secondary">
                  📥 Export Data
                </button>
                <button type="button" className="btn btn-secondary">
                  🔄 Clear Cache
                </button>
                <button type="button" className="btn btn-danger">
                  🗑️ Reset Dashboard
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="settings-card">
              <h3>Help & Support</h3>
              <div className="help-info">
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Last Updated:</strong> March 2024</p>
                <button type="button" className="btn btn-secondary">
                  📖 Documentation
                </button>
                <button type="button" className="btn btn-secondary">
                  💬 Contact Support
                </button>
              </div>
            </div>

            {/* API Configuration */}
            <div className="settings-card">
              <h3>API Configuration</h3>
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

                <button type="button" className="btn btn-secondary">
                  🔗 Test Connection
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
