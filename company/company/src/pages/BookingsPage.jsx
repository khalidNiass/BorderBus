import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa'

/**
 * BookingsPage Component
 * Displays and manages customer bookings
 */
const BookingsPage = ({ onLogout }) => {
  // Dummy data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      customerName: 'Raj Kumar',
      email: 'raj@example.com',
      route: 'Delhi - Mumbai',
      date: '2026-04-05',
      seats: '2',
      totalAmount: '₹3,000',
      status: 'Confirmed',
      bookingDate: '2026-03-30',
    },
    {
      id: 'BK002',
      customerName: 'Priya Singh',
      email: 'priya@example.com',
      route: 'Bangalore - Chennai',
      date: '2026-04-06',
      seats: '1',
      totalAmount: '₹800',
      status: 'Pending',
      bookingDate: '2026-03-29',
    },
    {
      id: 'BK003',
      customerName: 'Amit Patel',
      email: 'amit@example.com',
      route: 'Pune - Goa',
      date: '2026-04-07',
      seats: '3',
      totalAmount: '₹1,800',
      status: 'Confirmed',
      bookingDate: '2026-03-28',
    },
    {
      id: 'BK004',
      customerName: 'Neha Sharma',
      email: 'neha@example.com',
      route: 'Jaipur - Delhi',
      date: '2026-04-10',
      seats: '2',
      totalAmount: '₹1,200',
      status: 'Cancelled',
      bookingDate: '2026-03-25',
    },
  ])

  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Accept booking
  const handleAcceptBooking = (booking) => {
    if (booking.status === 'Confirmed') {
      alert('Booking is already confirmed!')
      return
    }
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: 'Confirmed' } : b
      )
    )
  }

  // Cancel booking
  const handleCancelBooking = (booking) => {
    if (booking.status === 'Cancelled') {
      alert('Booking is already cancelled!')
      return
    }
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: 'Cancelled' } : b
        )
      )
    }
  }

  // View booking details
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setIsDetailModalOpen(true)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
      case 'Pending':
        return 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
      case 'Cancelled':
        return 'bg-red-500/30 text-red-300 border border-red-500/50'
      default:
        return 'bg-slate-600/30 text-slate-300 border border-slate-500/50'
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-700 p-8 mt-14 lg:mt-0 sticky top-0 z-10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Manage Bookings
          </h1>
          <p className="text-slate-400 mt-2 text-sm tracking-wide">
            View, accept, and manage customer bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="p-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border-2 border-emerald-500/50 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <p className="text-emerald-300 text-sm font-medium tracking-wide">Confirmed Bookings</p>
              <p className="text-4xl font-bold text-emerald-400 mt-3">
                {bookings.filter((b) => b.status === 'Confirmed').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/40 border-2 border-amber-500/50 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
              <p className="text-amber-300 text-sm font-medium tracking-wide">Pending Bookings</p>
              <p className="text-4xl font-bold text-amber-400 mt-3">
                {bookings.filter((b) => b.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
              <p className="text-red-300 text-sm font-medium tracking-wide">Cancelled Bookings</p>
              <p className="text-4xl font-bold text-red-400 mt-3">
                {bookings.filter((b) => b.status === 'Cancelled').length}
              </p>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-slate-700 backdrop-blur-sm">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-500 [&::-webkit-scrollbar-thumb]:to-cyan-500 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-600">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Booking ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Seats</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Actions</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-slate-600">
                  {bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-blue-500/10 transition-all duration-300 group">
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors font-medium">
                        <span className="text-blue-400">{booking.id}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-xs text-slate-400">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">{booking.route}</td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">{booking.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">{booking.seats}</td>
                      <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{booking.totalAmount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors"
                          >
                            View
                          </button>
                          {booking.status === 'Pending' && (
                            <button
                              onClick={() => handleAcceptBooking(booking)}
                              className="text-emerald-400 hover:text-emerald-300 font-medium text-xs flex items-center space-x-1 transition-colors"
                              title="Accept Booking"
                            >
                              <FaCheck size={12} />
                              <span>Accept</span>
                            </button>
                          )}
                          {booking.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleCancelBooking(booking)}
                              className="text-red-400 hover:text-red-300 font-medium text-xs flex items-center space-x-1 transition-colors"
                              title="Cancel Booking"
                            >
                              <FaTimes size={12} />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Booking Details Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          title="Booking Details"
          onClose={() => setIsDetailModalOpen(false)}
          size="md"
        >
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Booking ID</p>
                  <p className="text-lg font-bold text-blue-300">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Booking Date</p>
                  <p className="text-lg font-bold text-blue-300">{selectedBooking.bookingDate}</p>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-4">
                <h3 className="font-bold text-blue-300 mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Name</p>
                    <p className="font-medium text-slate-200">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="font-medium text-slate-200">{selectedBooking.email}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-4">
                <h3 className="font-bold text-blue-300 mb-3">Journey Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Route</p>
                    <p className="font-medium text-slate-200">{selectedBooking.route}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Date</p>
                    <p className="font-medium text-slate-200">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Seats</p>
                    <p className="font-medium text-slate-200">{selectedBooking.seats}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Amount</p>
                    <p className="font-medium text-slate-200">{selectedBooking.totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-4">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Booking Status</p>
                  <span
                    className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                        : selectedBooking.status === 'Pending'
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                        : 'bg-red-500/30 text-red-300 border border-red-500/50'
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-slate-600">
                {selectedBooking.status === 'Pending' && (
                  <Button
                    variant="success"
                    onClick={() => {
                      handleAcceptBooking(selectedBooking)
                      setIsDetailModalOpen(false)
                    }}
                    className="flex-1"
                  >
                    Accept Booking
                  </Button>
                )}
                {selectedBooking.status !== 'Cancelled' && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleCancelBooking(selectedBooking)
                      setIsDetailModalOpen(false)
                    }}
                    className="flex-1"
                  >
                    Cancel Booking
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="flex-1"
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

export default BookingsPage
