import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBell, FaCheckCircle, FaInfoCircle, FaRegClock } from 'react-icons/fa'
import { notifications } from '../data/mockData'

function NotificationsPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(
    notifications.map((note, index) => ({
      ...note,
      read: index > 0,
    })),
  )
  const [filter, setFilter] = useState('all')

  const tagFor = (note) => {
    const title = note.title.toLowerCase()
    if (title.includes('booking')) return 'booking'
    if (title.includes('reminder')) return 'reminder'
    if (title.includes('update')) return 'update'
    return 'info'
  }

  const iconFor = (tag) => {
    if (tag === 'booking') return <FaCheckCircle />
    if (tag === 'reminder') return <FaRegClock />
    if (tag === 'update') return <FaInfoCircle />
    return <FaBell />
  }

  const actionFor = (tag) => {
    if (tag === 'booking') return { label: 'View Ticket', to: '/ticket' }
    if (tag === 'reminder') return { label: 'My Bookings', to: '/bookings' }
    if (tag === 'update') return { label: 'View Update', to: '/bookings' }
    return { label: 'Search Trips', to: '/search' }
  }

  const markAllRead = () => {
    setItems((prev) => prev.map((note) => ({ ...note, read: true })))
  }

  const markRead = (id) => {
    setItems((prev) =>
      prev.map((note) => (note.id === id ? { ...note, read: true } : note)),
    )
  }

  const filtered = useMemo(() => {
    if (filter === 'unread') return items.filter((note) => !note.read)
    if (filter === 'important')
      return items.filter((note) => ['booking', 'reminder'].includes(tagFor(note)))
    return items
  }, [filter, items])

  const grouped = useMemo(() => {
    const buckets = { Today: [], Yesterday: [], Earlier: [] }
    filtered.forEach((note) => {
      if (note.timestamp) {
        const date = new Date(note.timestamp)
        const now = new Date()
        const diffMs = now - date
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        if (diffDays === 0) buckets.Today.push(note)
        else if (diffDays === 1) buckets.Yesterday.push(note)
        else buckets.Earlier.push(note)
        return
      }
      const timeText = note.time.toLowerCase()
      if (timeText.includes('h ago') || timeText.includes('min')) {
        buckets.Today.push(note)
      } else if (timeText.includes('yesterday')) {
        buckets.Yesterday.push(note)
      } else {
        buckets.Earlier.push(note)
      }
    })
    return buckets
  }, [filtered])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Notifications</h1>
        <p className="muted">Stay updated about your trips.</p>
      </header>

      <div className="card notification-toolbar">
        <div className="tabs">
          {['all', 'unread', 'important'].map((tab) => (
            <button
              key={tab}
              className={`tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'all' ? 'All' : tab === 'unread' ? 'Unread' : 'Important'}
            </button>
          ))}
        </div>
        <button className="ghost-button compact" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <h3>All caught up</h3>
          <p className="muted">
            You have no notifications right now. We will let you know when
            something happens.
          </p>
          <button className="primary-button compact" onClick={() => navigate('/search')}>
            Search Trips
          </button>
        </div>
      ) : (
        <div className="stack">
          {Object.entries(grouped).map(([label, notes]) =>
            notes.length ? (
              <div key={label} className="notification-group">
                <p className="label">{label}</p>
                <div className="stack">
                  {notes.map((note) => {
                    const tag = tagFor(note)
                    const action = actionFor(tag)
                    return (
                      <div
                        key={note.id}
                        className={`card notification ${note.read ? '' : 'unread'}`}
                      >
                        <div className="notification-main">
                          <div className={`notification-icon ${tag}`}>
                            {iconFor(tag)}
                          </div>
                          <div>
                            <h3>{note.title}</h3>
                            <p className="muted">{note.description}</p>
                            <div className="notification-actions">
                              <button
                                className="ghost-button compact"
                                onClick={() => navigate(action.to, { state: note })}
                              >
                                {action.label}
                              </button>
                              {!note.read && (
                                <button
                                  className="ghost-button compact"
                                  onClick={() => markRead(note.id)}
                                >
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="muted">{note.time}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
