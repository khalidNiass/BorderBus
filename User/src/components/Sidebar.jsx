import { NavLink } from 'react-router-dom'
import {
  FaHome,
  FaSearch,
  FaTicketAlt,
  FaBell,
  FaCog,
  FaBus,
} from 'react-icons/fa'

const navItems = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/search', label: 'Search Trips', icon: FaSearch },
  { to: '/bookings', label: 'My Bookings', icon: FaTicketAlt },
  { to: '/notifications', label: 'Notifications', icon: FaBell },
  { to: '/settings', label: 'Settings', icon: FaCog },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <FaBus />
          <span>BorderBus</span>
        </div>
        <button className="icon-button mobile-only" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="mini-profile">
        <div className="avatar sm">KN</div>
        <div>
          <h4>Traveler Profile</h4>
          <p className="muted">Khalid Niass · Premium Member</p>
          <NavLink to="/profile" className="ghost-button compact">
            View Profile
          </NavLink>
        </div>
      </div>

      <nav className="nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/search" className="primary-button">
          Book Trip
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
