import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FaPlus } from 'react-icons/fa'

/**
 * ManageBuses Component
 * Page for managing buses (add, edit, delete)
 */
const ManageBuses = ({ onLogout }) => {
  // Dummy bus data
  const [buses, setBuses] = useState([
    {
      id: 1,
      busNumber: 'BUS001',
      type: 'AC',
      capacity: 45,
      regNumber: 'DL01AB1234',
      mfgYear: 2022,
      status: 'Active',
    },
    {
      id: 2,
      busNumber: 'BUS002',
      type: 'Non-AC',
      capacity: 55,
      regNumber: 'DL01AB1235',
      mfgYear: 2021,
      status: 'Active',
    },
    {
      id: 3,
      busNumber: 'BUS003',
      type: 'Sleeper',
      capacity: 32,
      regNumber: 'DL01AB1236',
      mfgYear: 2023,
      status: 'Maintenance',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    busNumber: '',
    type: 'AC',
    capacity: '',
    regNumber: '',
    mfgYear: new Date().getFullYear(),
    status: 'Active',
  })
  const [errors, setErrors] = useState({})

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'mfgYear' ? parseInt(value) : value,
    }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.busNumber) newErrors.busNumber = 'Bus number is required'
    if (!formData.capacity || formData.capacity <= 0)
      newErrors.capacity = 'Valid capacity is required'
    if (!formData.regNumber) newErrors.regNumber = 'Registration number is required'
    return newErrors
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingId) {
      // Edit existing bus
      setBuses(
        buses.map((bus) =>
          bus.id === editingId ? { ...bus, ...formData } : bus
        )
      )
    } else {
      // Add new bus
      setBuses([
        ...buses,
        {
          id: Date.now(),
          ...formData,
        },
      ])
    }

    resetForm()
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      busNumber: '',
      type: 'AC',
      capacity: '',
      regNumber: '',
      mfgYear: new Date().getFullYear(),
      status: 'Active',
    })
    setErrors({})
    setEditingId(null)
    setShowModal(false)
  }

  // Handle edit
  const handleEdit = (bus) => {
    setFormData(bus)
    setEditingId(bus.id)
    setShowModal(true)
  }

  // Handle delete
  const handleDelete = (bus) => {
    if (window.confirm(`Are you sure you want to delete ${bus.busNumber}?`)) {
      setBuses(buses.filter((b) => b.id !== bus.id))
    }
  }

  // Table columns
  const columns = [
    { key: 'busNumber', label: 'Bus Number' },
    { key: 'type', label: 'Type' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'regNumber', label: 'Reg. Number' },
    { key: 'mfgYear', label: 'Mfg. Year' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 border ${
            value === 'Active'
              ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50'
              : value === 'Maintenance'
              ? 'bg-amber-500/30 text-amber-300 border-amber-500/50'
              : 'bg-red-500/30 text-red-300 border-red-500/50'
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-700 p-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Manage Buses
            </h1>
            <p className="text-slate-400 mt-2 text-sm tracking-wide">
              Add, edit, and manage your buses
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Bus</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-slate-700 backdrop-blur-sm">
            <Table
              columns={columns}
              data={buses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Bus' : 'Add New Bus'}
        onClose={resetForm}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Bus Number"
              name="busNumber"
              placeholder="e.g., BUS001"
              value={formData.busNumber}
              onChange={handleChange}
              error={errors.busNumber}
              required
            />

            <div>
              <label className="block text-blue-300 font-medium mb-2">
                Bus Type <span className="text-red-400">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 text-slate-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 placeholder-slate-400"
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>

            <FormInput
              label="Capacity"
              name="capacity"
              type="number"
              placeholder="e.g., 45"
              value={formData.capacity}
              onChange={handleChange}
              error={errors.capacity}
              required
            />

            <FormInput
              label="Registration Number"
              name="regNumber"
              placeholder="e.g., DL01AB1234"
              value={formData.regNumber}
              onChange={handleChange}
              error={errors.regNumber}
              required
            />

            <FormInput
              label="Manufacturing Year"
              name="mfgYear"
              type="number"
              value={formData.mfgYear}
              onChange={handleChange}
              required
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
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <Button variant="primary" size="md" className="flex-1">
              {editingId ? 'Update Bus' : 'Add Bus'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageBuses
