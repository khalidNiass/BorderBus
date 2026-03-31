import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import SeatLayout from '../components/SeatLayout'
import { bookedSeats, buses, seatMap } from '../data/mockData'

function SeatSelection() {
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState([3, 4])
  const pricePerSeat = buses[0].price

  const total = useMemo(
    () => selectedSeats.length * pricePerSeat,
    [selectedSeats, pricePerSeat],
  )

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    )
  }

  return (
    <div className="page">
      <div className="page-top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="page-title">Choose your seats</span>
        <div className="page-top-spacer"></div>
        <button className="icon-button" onClick={() => navigate('/search')}>
          <FaSearch />
        </button>
      </div>
      <header className="page-header">
        <h1>Choose your seats</h1>
        <p className="muted">Atlantic Express · Dakar → Banjul</p>
      </header>

      <div className="split">
        <div className="card">
          <SeatLayout
            seats={seatMap}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />
        </div>
        <div className="card summary">
          <h3>Selection Summary</h3>
          <div className="summary-item">
            <span>Selected seats</span>
            <strong>{selectedSeats.join(', ') || 'None'}</strong>
          </div>
          <div className="summary-item">
            <span>Price per seat</span>
            <strong>${pricePerSeat}</strong>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
          <NavLink to="/booking" className="primary-button small">
            Continue to Payment
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection
