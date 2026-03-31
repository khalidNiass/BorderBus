import { FaDownload, FaShareAlt } from 'react-icons/fa'

function Ticket({ booking }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div>
          <p className="muted">Booking ID</p>
          <h3>{booking.id}</h3>
        </div>
        <div className="qr">QR</div>
      </div>
      <div className="ticket-body">
        <div>
          <p className="label">Passenger</p>
          <p>{booking.name}</p>
        </div>
        <div>
          <p className="label">Route</p>
          <p>
            {booking.from} → {booking.to}
          </p>
        </div>
        <div>
          <p className="label">Date & Time</p>
          <p>{booking.dateTime}</p>
        </div>
        <div>
          <p className="label">Seat(s)</p>
          <p>{booking.seats.join(', ')}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="ghost-button">
          <FaDownload /> Download Ticket
        </button>
        <button className="ghost-button">
          <FaShareAlt /> Share Ticket
        </button>
      </div>
    </div>
  )
}

export default Ticket
