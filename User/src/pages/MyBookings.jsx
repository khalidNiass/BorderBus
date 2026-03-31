import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingCard from '../components/BookingCard'
import { bookings } from '../data/mockData'

function MyBookings() {
  const navigate = useNavigate()
  const [items, setItems] = useState(bookings)

  const formatDate = (value) => {
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const enhanced = useMemo(
    () =>
      items.map((booking) => ({
        ...booking,
        dateLabel: formatDate(booking.date),
      })),
    [items],
  )

  const upcoming = useMemo(
    () => enhanced.filter((booking) => booking.status.toLowerCase() === 'upcoming'),
    [enhanced],
  )

  const completed = useMemo(
    () => enhanced.filter((booking) => booking.status.toLowerCase() === 'completed'),
    [enhanced],
  )

  const handleViewTicket = (booking) => {
    navigate('/ticket', { state: booking })
  }

  const handleCancel = (booking) => {
    const shouldCancel = window.confirm(
      `Cancel your trip from ${booking.from} to ${booking.to}?`,
    )
    if (!shouldCancel) return
    setItems((prev) => prev.filter((item) => item.id !== booking.id))
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>My Bookings</h1>
        <p className="muted">Manage upcoming and past trips.</p>
      </header>

      {enhanced.length === 0 ? (
        <div className="card">
          <h3>No bookings yet</h3>
          <p className="muted">
            When you book a trip, it will show up here for easy management.
          </p>
          <button className="primary-button compact" onClick={() => navigate('/search')}>
            Search Trips
          </button>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="card">
              <h3>Upcoming Trips</h3>
              <div className="card-grid">
                {upcoming.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewTicket={handleViewTicket}
                    onCancelBooking={handleCancel}
                  />
                ))}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div className="card">
              <h3>Completed Trips</h3>
              <div className="card-grid">
                {completed.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewTicket={handleViewTicket}
                    onCancelBooking={handleCancel}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyBookings
