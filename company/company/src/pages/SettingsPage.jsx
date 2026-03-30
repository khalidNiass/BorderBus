import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

/**
 * SettingsPage Component
 * Company settings and profile management
 */
const SettingsPage = ({ onLogout }) => {
  // Get company data from localStorage
  const companyData = JSON.parse(localStorage.getItem('companyAuth')) || {}

  const [formData, setFormData] = useState({
    companyName: companyData.companyName || '',
    email: companyData.email || '',
    phone: '+91 1234 567890',
    address: '123 Business Street, City, State 110001',
    city: 'Delhi',
    state: 'Delhi',
    registrationNo: 'REG12345',
    licenseNo: 'LIC98765',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [errors, setErrors] = useState({})

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    return newErrors
  }

  // Handle save
  const handleSave = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save to localStorage
    const updatedData = {
      ...companyData,
      companyName: formData.companyName,
      email: formData.email,
    }
    localStorage.setItem('companyAuth', JSON.stringify(updatedData))

    setIsEditing(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 mt-14 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage company profile and preferences</p>
        </div>

        {/* Content */}
        <div className="p-6 max-w-2xl">
          {/* Success Message */}
          {isSaved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
              <span className="text-lg mr-3">✓</span>
              <span>Settings saved successfully!</span>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Company Profile</h2>
              {!isEditing && (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <FormInput
                    label="Company Name"
                    placeholder="Enter company name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={errors.companyName}
                    disabled={!isEditing}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      disabled={!isEditing}
                      required
                    />

                    <FormInput
                      label="Phone"
                      type="tel"
                      placeholder="Enter phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Address Information
                </h3>

                <div className="space-y-4">
                  <FormInput
                    label="Address"
                    placeholder="Enter company address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    disabled={!isEditing}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="City"
                      placeholder="Enter city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />

                    <FormInput
                      label="State"
                      placeholder="Enter state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  License & Registration
                </h3>

                <div className="space-y-4">
                  <FormInput
                    label="Registration Number"
                    placeholder="Enter registration number"
                    name="registrationNo"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                  <FormInput
                    label="License Number"
                    placeholder="Enter license number"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Form Actions */}
              {isEditing && (
                <div className="flex space-x-3 pt-6 border-t border-gray-200">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false)
                      setErrors({})
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded"
                  />
                </label>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive alerts via SMS</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded"
                  />
                </label>
              </div>

              {/* Data Export */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Export Data</p>
                  <p className="text-sm text-gray-600">Download your company data</p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mt-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Danger Zone</h2>
            <p className="text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="danger">Delete Account</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
