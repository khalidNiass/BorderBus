/**
 * Console Utilities
 * Better console management for development debugging
 */

// Development-only console utilities
export const consoleUtils = {
  // Clear console and log with formatting
  log: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.clear();
      console.log(`🔍 ${message}`, data || '');
    }
  },

  // Log component render
  render: (componentName) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎨 Rendering: ${componentName}`);
    }
  },

  // Log state changes
  state: (componentName, stateKey, value) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${componentName} - ${stateKey}:`, value);
    }
  },

  // Log API calls
  api: (endpoint, method = 'GET', data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 API ${method}: ${endpoint}`, data || '');
    }
  },

  // Log errors
  error: (message, error = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${message}`, error || '');
    }
  },

  // Log warnings
  warn: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ ${message}`, data || '');
    }
  },

  // Group logs
  group: (label, logs) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`📁 ${label}`);
      logs.forEach(log => console.log(log));
      console.groupEnd();
    }
  }
};

// Clean console on page load in development
if (process.env.NODE_ENV === 'development') {
  console.clear();
  console.log('🚀 BorderBus Company Dashboard - Development Mode');
  console.log('💡 Use consoleUtils for better debugging');
}