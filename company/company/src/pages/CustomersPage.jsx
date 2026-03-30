import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal'
import Button from '../components/Button'

/**
 * CustomersPage Component
 * Displays customer list and booking history
 */
const CustomersPage = ({ onLogout }) => {
  // Dummy data for customers
  const [customers] = useState([
    {
      id: 'CUST001',
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '+91 98765 43210',
      totalBookings: '5',
      totalSpent: '₹15,000',
      joinDate: '2026-01-15',
      bookings: [
        { id: 'BK001', route: 'Delhi - Mumbai', date: '2026-04-05', status: 'Confirmed' },
        { id: 'BK005', route: 'Delhi - Jaipur', date: '2026-03-20', status: 'Confirmed' },
      ],
    },
    {
      id: 'CUST002',
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      totalBookings: '3',
      totalSpent: '₹8,500',
      joinDate: '2026-02-10',
      bookings: [
        { id: 'BK002', route: 'Bangalore - Chennai', date: '2026-04-06', status: 'Pending' },
      ],
    },
    {
      id: 'CUST003',
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      totalBookings: '7',
      totalSpent: '₹22,500',
      joinDate: '2026-01-05',
      bookings: [
        { id: 'BK003', route: 'Pune - Goa', date: '2026-04-07', status: 'Confirmed' },
        { id: 'BK006', route: 'Pune - Bangalore', date: '2026-03-15', status: 'Confirmed' },
      ],
    },
    {
      id: 'CUST004',
      name: 'Neha Sharma',
      email: 'neha@example.com',
      phone: '+91 98765 43213',
      totalBookings: '2',
      totalSpent: '₹4,200',
      joinDate: '2026-03-01',
      bookings: [
        { id: 'BK004', route: 'Jaipur - Delhi', date: '2026-04-10', status: 'Cancelled' },
      ],
    },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Handle view details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer)
    setIsDetailModalOpen(true)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 mt-14 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-600 mt-1">View customer list and booking history</p>
        </div>

        {/* Stats Cards */}
        <div className="p-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{customers.length}</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {customers.reduce((sum, c) => sum + parseInt(c.totalBookings), 0)}
              </p>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">₹50,200</p>
            </div>
          </div>

          {/* Customers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                {/* Customer Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{customer.email}</p>
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Total Bookings</p>
                    <p className="text-lg font-bold text-gray-800">{customer.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Total Spent</p>
                    <p className="text-lg font-bold text-gray-800">{customer.totalSpent}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600">Member Since</p>
                  <p className="text-sm font-medium text-gray-800">{customer.joinDate}</p>
                </div>

                {/* View Details Button */}
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(customer)}
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          title="Customer Details & Booking History"
          onClose={() => setIsDetailModalOpen(false)}
          size="lg"
        >
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Customer ID</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Member Since</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Spent</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.totalSpent}</p>
                  </div>
                </div>
              </div>

              {/* Booking History */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Booking History</h3>
                <div className="space-y-2">
                  {selectedCustomer.bookings.length > 0 ? (
                    selectedCustomer.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{booking.id}</p>
                            <p className="text-sm text-gray-600">{booking.route}</p>
                            <p className="text-xs text-gray-500">{booking.date}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm">No bookings found</p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex pt-4 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  )
}

export default CustomersPage
