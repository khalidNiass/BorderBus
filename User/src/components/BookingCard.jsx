function BookingCard({ booking, onViewTicket, onCancelBooking }) {
  const isCompleted = booking.status.toLowerCase() === 'completed'

  return (
    <div className="booking-card">
      <div>
        <h3>
          {booking.from} → {booking.to}
        </h3>
        <p className="muted">{booking.dateLabel || booking.date}</p>
      </div>
      <div className="booking-meta">
        <span className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
        <div className="stack">
          <button className="ghost-button" onClick={() => onViewTicket(booking)}>
            View Ticket
          </button>
          <button
            className="ghost-button"
            onClick={() => onCancelBooking(booking)}
            disabled={isCompleted}
          >
            {isCompleted ? 'Trip Completed' : 'Cancel Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
