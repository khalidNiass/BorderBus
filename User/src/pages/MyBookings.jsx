import BookingCard from '../components/BookingCard'
import { bookings } from '../data/mockData'

function MyBookings() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>My Bookings</h1>
        <p className="muted">Manage upcoming and past trips.</p>
      </header>

      <div className="card-grid">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}

export default MyBookings
