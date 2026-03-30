import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

/**
 * LoginPage Component
 * Company registration and login page
 */
const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
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

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!isLogin) {
      if (!formData.companyName) {
        newErrors.companyName = 'Company name is required'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    return newErrors
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const companyData = {
        id: Date.now(),
        companyName: formData.companyName || 'Demo Company',
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        loginTime: new Date().toISOString(),
      }

      onLogin(companyData)
      navigate('/')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-slideInUp">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            BorderBus
          </h1>
          <p className="text-slate-500 text-sm font-medium">Admin Dashboard</p>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto"></div>
        </div>

        {/* Toggle */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => {
              setIsLogin(true)
              setErrors({})
              setFormData({
                companyName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                address: '',
              })
            }}
            className={`flex-1 py-3 font-bold rounded-xl transition-all duration-200 ${
              isLogin
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false)
              setErrors({})
              setFormData({
                companyName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                address: '',
              })
            }}
            className={`flex-1 py-3 font-bold rounded-xl transition-all duration-200 ${
              !isLogin
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <FormInput
              label="Company Name"
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
              required
            />
          )}

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          {!isLogin && (
            <>
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              <FormInput
                label="Phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              <FormInput
                label="Address"
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </>
          )}

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Processing...</span>
              </span>
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl text-sm border-2 border-blue-200">
          <p className="font-bold text-slate-700 mb-2 uppercase tracking-wider">📧 Demo Credentials:</p>
          <p className="text-slate-700 font-medium">Email: demo@company.com</p>
          <p className="text-slate-700 font-medium">Password: demo123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
