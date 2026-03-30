import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { FaBus, FaClipboardList, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'

/**
 * Dashboard Component
 * Main dashboard page showing company statistics
 */
const Dashboard = ({ onLogout }) => {
  // Dummy data
  const [company] = useState(
    JSON.parse(localStorage.getItem('companyAuth')) || {
      companyName: 'Demo Bus Company',
    }
  )

  // Statistics data (dummy)
  const stats = [
    {
      title: 'Total Buses',
      value: '24',
      icon: '🚌',
      color: 'blue',
    },
    {
      title: 'Total Bookings',
      value: '1,245',
      icon: '📋',
      color: 'green',
    },
    {
      title: 'Total Routes',
      value: '12',
      icon: '🗺️',
      color: 'purple',
    },
    {
      title: 'Total Revenue',
      value: '$45,320',
      icon: '💰',
      color: 'orange',
    },
  ]

  // Recent bookings (dummy data)
  const recentBookings = [
    {
      id: 1,
      bookingId: 'BK001',
      customerName: 'John Doe',
      route: 'New York - Boston',
      date: '2026-04-05',
      status: 'Confirmed',
      amount: '$120',
    },
    {
      id: 2,
      bookingId: 'BK002',
      customerName: 'Jane Smith',
      route: 'Boston - Philadelphia',
      date: '2026-04-06',
      status: 'Pending',
      amount: '$95',
    },
    {
      id: 3,
      bookingId: 'BK003',
      customerName: 'Mike Johnson',
      route: 'Philadelphia - Washington DC',
      date: '2026-04-07',
      status: 'Confirmed',
      amount: '$110',
    },
    {
      id: 4,
      bookingId: 'BK004',
      customerName: 'Sarah Williams',
      route: 'Washington DC - Atlanta',
      date: '2026-04-08',
      status: 'Cancelled',
      amount: '$130',
    },
  ]

  // Get status color with professional styling
  const getStatusColor = (status) => {
    const colors = {
      Confirmed: 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50',
      Pending: 'bg-amber-500/30 text-amber-300 border border-amber-500/50',
      Cancelled: 'bg-red-500/30 text-red-300 border border-red-500/50',
    }
    return colors[status] || 'bg-slate-600/30 text-slate-300 border border-slate-500/50'
  }

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-700 p-8 sticky top-0 z-10 backdrop-blur-sm border-b border-slate-600/50">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
            Welcome back, {company?.companyName || 'Company'}!
          </h1>
          <p className="text-slate-400 mt-2 text-lg font-light tracking-wide">
            Here's what's happening with your buses today
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                />
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-slate-700 backdrop-blur-sm animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Recent Bookings
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
            </div>

            <div className="overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-500 [&::-webkit-scrollbar-thumb]:to-cyan-500 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-600">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600">
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-blue-500/10 transition-all duration-300 group"
                    >
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                        <span className="font-semibold text-blue-400">{booking.bookingId}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                        {booking.route}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
