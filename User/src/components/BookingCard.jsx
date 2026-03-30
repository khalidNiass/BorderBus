function BookingCard({ booking }) {
  return (
    <div className="booking-card">
      <div>
        <h3>
          {booking.from} → {booking.to}
        </h3>
        <p className="muted">{booking.date}</p>
      </div>
      <div className="booking-meta">
        <span className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
        <div className="stack">
          <button className="ghost-button">View Ticket</button>
          <button className="ghost-button">Cancel Booking</button>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
