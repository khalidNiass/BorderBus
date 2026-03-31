function SeatLayout({ seats, bookedSeats, selectedSeats, onToggle }) {
  return (
    <div className="seat-layout">
      <div className="seat-grid">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat)
          const isSelected = selectedSeats.includes(seat)
          return (
            <button
              key={seat}
              type="button"
              className={`seat ${isBooked ? 'booked' : ''} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => onToggle(seat)}
              disabled={isBooked}
            >
              {seat}
            </button>
          )
        })}
      </div>
      <div className="seat-legend">
        <span className="legend-item">
          <span className="dot available"></span>Available
        </span>
        <span className="legend-item">
          <span className="dot selected"></span>Selected
        </span>
        <span className="legend-item">
          <span className="dot booked"></span>Booked
        </span>
      </div>
    </div>
  )
}

export default SeatLayout
