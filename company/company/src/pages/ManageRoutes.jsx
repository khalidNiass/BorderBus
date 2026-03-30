import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FaPlus } from 'react-icons/fa'

/**
 * ManageRoutes Component
 * Allows company to add, edit, and delete routes
 */
const ManageRoutes = ({ onLogout }) => {
  // Dummy data for routes
  const [routes, setRoutes] = useState([
    {
      id: 'RT001',
      departure: 'Delhi',
      destination: 'Mumbai',
      distance: '1400 km',
      duration: '18 hours',
      stops: '5',
      status: 'Active',
    },
    {
      id: 'RT002',
      departure: 'Bangalore',
      destination: 'Chennai',
      distance: '350 km',
      duration: '5.5 hours',
      stops: '2',
      status: 'Active',
    },
    {
      id: 'RT003',
      departure: 'Pune',
      destination: 'Goa',
      distance: '470 km',
      duration: '8 hours',
      stops: '3',
      status: 'Active',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState(null)
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    distance: '',
    duration: '',
    stops: '',
    status: 'Active',
  })
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
    if (!formData.departure.trim()) newErrors.departure = 'Departure location is required'
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required'
    if (formData.departure === formData.destination)
      newErrors.destination = 'Destination must be different from departure'
    if (!formData.distance.trim()) newErrors.distance = 'Distance is required'
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required'
    return newErrors
  }

  // Open modal for new route
  const handleAddRoute = () => {
    setEditingRoute(null)
    setFormData({ departure: '', destination: '', distance: '', duration: '', stops: '', status: 'Active' })
    setErrors({})
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEditRoute = (route) => {
    setEditingRoute(route)
    setFormData(route)
    setErrors({})
    setIsModalOpen(true)
  }

  // Save route
  const handleSaveRoute = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingRoute) {
      setRoutes((prev) =>
        prev.map((route) =>
          route.id === editingRoute.id ? { ...formData, id: route.id } : route
        )
      )
    } else {
      setRoutes((prev) => [
        ...prev,
        { ...formData, id: `RT${String(routes.length + 1).padStart(3, '0')}` },
      ])
    }

    setIsModalOpen(false)
  }

  // Delete route
  const handleDeleteRoute = (route) => {
    if (window.confirm(`Are you sure you want to delete the route ${route.departure} - ${route.destination}?`)) {
      setRoutes((prev) => prev.filter((r) => r.id !== route.id))
    }
  }

  // Table columns
  const columns = [
    { key: 'id', label: 'Route ID' },
    { key: 'departure', label: 'Departure' },
    { key: 'destination', label: 'Destination' },
    { key: 'distance', label: 'Distance' },
    { key: 'duration', label: 'Duration' },
    { key: 'stops', label: 'Stops' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 border ${
            value === 'Active'
              ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50'
              : 'bg-red-500/30 text-red-300 border-red-500/50'
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-700 p-8 mt-14 lg:mt-0 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Manage Routes
            </h1>
            <p className="text-slate-400 mt-2 text-sm tracking-wide">
              Add, edit, and manage your routes
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleAddRoute}
            className="flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Route</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 max-w-7xl">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-slate-700 backdrop-blur-sm">
            <Table
              columns={columns}
              data={routes}
              onEdit={handleEditRoute}
              onDelete={handleDeleteRoute}
            />
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          title={editingRoute ? 'Edit Route' : 'Add New Route'}
          onClose={() => setIsModalOpen(false)}
          size="md"
        >
          <form className="space-y-4">
            <FormInput
              label="Departure Location"
              placeholder="Enter departure city"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              error={errors.departure}
              required
            />

            <FormInput
              label="Destination"
              placeholder="Enter destination city"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              error={errors.destination}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Distance"
                placeholder="e.g., 1400 km"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                error={errors.distance}
                required
              />

              <FormInput
                label="Duration"
                placeholder="e.g., 18 hours"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                error={errors.duration}
                required
              />
            </div>

            <FormInput
              label="Number of Stops (Optional)"
              type="number"
              placeholder="Enter number of stops"
              name="stops"
              value={formData.stops}
              onChange={handleChange}
            />

            <div>
              <label className="block text-blue-300 font-medium mb-2">
                Status <span className="text-red-400">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 text-slate-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 placeholder-slate-400"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="primary"
                onClick={handleSaveRoute}
                className="flex-1"
              >
                {editingRoute ? 'Update Route' : 'Add Route'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  )
}

export default ManageRoutes
