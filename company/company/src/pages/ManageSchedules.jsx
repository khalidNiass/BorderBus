import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FaPlus } from 'react-icons/fa'

/**
 * ManageSchedules Component
 * Allows company to add, edit, and delete bus schedules
 */
const ManageSchedules = ({ onLogout }) => {
  // Dummy data for schedules
  const [schedules, setSchedules] = useState([
    {
      id: 'SCH001',
      busId: 'BUS001',
      routeId: 'RT001',
      date: '2026-04-05',
      departureTime: '22:00',
      arrivalTime: '16:00',
      price: '₹1,500',
      seatsAvailable: '35',
      status: 'Active',
    },
    {
      id: 'SCH002',
      busId: 'BUS002',
      routeId: 'RT002',
      date: '2026-04-06',
      departureTime: '08:00',
      arrivalTime: '13:30',
      price: '₹800',
      seatsAvailable: '28',
      status: 'Active',
    },
    {
      id: 'SCH003',
      busId: 'BUS003',
      routeId: 'RT003',
      date: '2026-04-06',
      departureTime: '14:00',
      arrivalTime: '22:00',
      price: '₹600',
      seatsAvailable: '42',
      status: 'Active',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [formData, setFormData] = useState({
    busId: '',
    routeId: '',
    date: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    seatsAvailable: '',
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
    if (!formData.busId.trim()) newErrors.busId = 'Bus ID is required'
    if (!formData.routeId.trim()) newErrors.routeId = 'Route ID is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.departureTime) newErrors.departureTime = 'Departure time is required'
    if (!formData.arrivalTime) newErrors.arrivalTime = 'Arrival time is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (!formData.seatsAvailable || formData.seatsAvailable <= 0)
      newErrors.seatsAvailable = 'Available seats must be greater than 0'
    return newErrors
  }

  // Open modal for new schedule
  const handleAddSchedule = () => {
    setEditingSchedule(null)
    setFormData({
      busId: '',
      routeId: '',
      date: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      seatsAvailable: '',
      status: 'Active',
    })
    setErrors({})
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule)
    setFormData(schedule)
    setErrors({})
    setIsModalOpen(true)
  }

  // Save schedule
  const handleSaveSchedule = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingSchedule.id ? { ...formData, id: schedule.id } : schedule
        )
      )
    } else {
      setSchedules((prev) => [
        ...prev,
        { ...formData, id: `SCH${String(schedules.length + 1).padStart(3, '0')}` },
      ])
    }

    setIsModalOpen(false)
  }

  // Delete schedule
  const handleDeleteSchedule = (schedule) => {
    if (window.confirm(`Are you sure you want to delete this schedule?`)) {
      setSchedules((prev) => prev.filter((s) => s.id !== schedule.id))
    }
  }

  // Table columns
  const columns = [
    { key: 'id', label: 'Schedule ID' },
    { key: 'busId', label: 'Bus ID' },
    { key: 'routeId', label: 'Route ID' },
    { key: 'date', label: 'Date' },
    { key: 'departureTime', label: 'Departure Time' },
    { key: 'arrivalTime', label: 'Arrival Time' },
    { key: 'price', label: 'Price' },
    { key: 'seatsAvailable', label: 'Seats Available' },
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
              Manage Schedules
            </h1>
            <p className="text-slate-400 mt-2 text-sm tracking-wide">
              Add, edit, and manage your bus schedules
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleAddSchedule}
            className="flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Schedule</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 max-w-7xl overflow-x-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-slate-700 backdrop-blur-sm">
            <Table
              columns={columns}
              data={schedules}
              onEdit={handleEditSchedule}
              onDelete={handleDeleteSchedule}
            />
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          title={editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
          onClose={() => setIsModalOpen(false)}
          size="lg"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Bus ID"
                placeholder="e.g., BUS001"
                name="busId"
                value={formData.busId}
                onChange={handleChange}
                error={errors.busId}
                required
              />

              <FormInput
                label="Route ID"
                placeholder="e.g., RT001"
                name="routeId"
                value={formData.routeId}
                onChange={handleChange}
                error={errors.routeId}
                required
              />
            </div>

            <FormInput
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Departure Time"
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                error={errors.departureTime}
                required
              />

              <FormInput
                label="Arrival Time"
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                error={errors.arrivalTime}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Price (₹)"
                type="number"
                placeholder="Enter ticket price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />

              <FormInput
                label="Available Seats"
                type="number"
                placeholder="Enter available seats"
                name="seatsAvailable"
                value={formData.seatsAvailable}
                onChange={handleChange}
                error={errors.seatsAvailable}
                required
              />
            </div>

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
                onClick={handleSaveSchedule}
                className="flex-1"
              >
                {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
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

export default ManageSchedules
