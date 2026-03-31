import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { FaComments, FaArrowLeft } from 'react-icons/fa'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import SearchTrips from './pages/SearchTrips'
import SearchResults from './pages/SearchResults'
import SeatSelection from './pages/SeatSelection'
import BookingPayment from './pages/BookingPayment'
import BusDetail from './pages/BusDetail'
import CompanyProfile from './pages/CompanyProfile'
import RoutesPage from './pages/RoutesPage'
import OperatorsPage from './pages/OperatorsPage'
import TicketPage from './pages/TicketPage'
import MyBookings from './pages/MyBookings'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

const pageTitles = {
  '/': 'Home',
  '/search': 'Search Trips',
  '/results': 'Search Results',
  '/routes': 'Routes',
  '/operators': 'Operators',
  '/seats': 'Seat Selection',
  '/booking': 'Booking & Payment',
  '/ticket': 'Ticket',
  '/bookings': 'My Bookings',
  '/profile': 'Profile',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem('borderbus.theme')
    return stored === 'light' || stored === 'dark' ? stored : 'dark'
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const title = useMemo(() => pageTitles[location.pathname] || 'BorderBus', [
    location.pathname,
  ])
  const showBack =
    location.pathname.startsWith('/company/') ||
    location.pathname.startsWith('/bus/') ||
    location.pathname === '/routes' ||
    location.pathname === '/operators'

  useEffect(() => {
    document.body.dataset.theme = theme
    window.localStorage.setItem('borderbus.theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div
        className={`overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <main className="content">
        <div className="mobile-header">
          {showBack ? (
            <button className="icon-button" onClick={() => window.history.back()}>
              <FaArrowLeft />
            </button>
          ) : (
            <button className="icon-button" onClick={() => setIsSidebarOpen(true)}>
              Menu
            </button>
          )}
          <h2>{title}</h2>
          <span className="pill">Live</span>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchTrips />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/operators" element={<OperatorsPage />} />
          <Route path="/bus/:id" element={<BusDetail />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/booking" element={<BookingPayment />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route
            path="/settings"
            element={<SettingsPage theme={theme} onToggleTheme={toggleTheme} />}
          />
        </Routes>
      </main>

      <button className="chat-fab" aria-label="Open chat support">
        <FaComments />
      </button>
    </div>
  )
}

export default App
