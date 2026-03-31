import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import SeatLayout from '../components/SeatLayout'
import { buses, seatMap } from '../data/mockData'

function SeatSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedBus = location.state || buses[0]
  const pricePerSeat = selectedBus?.price || 0
  const [selectedSeats, setSelectedSeats] = useState([])
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [note, setNote] = useState('')
  const [persistedKey] = useState(() =>
    selectedBus?.id ? `borderbus.seats.${selectedBus.id}` : 'borderbus.seats.default',
  )
  const [notice, setNotice] = useState('')
  const [bookedForBus, setBookedForBus] = useState([])

  const passengerTotal = useMemo(
    () => adultCount + childCount,
    [adultCount, childCount],
  )

  const adjustedTotal = useMemo(() => {
    const childPrice = pricePerSeat * 0.7
    return adultCount * pricePerSeat + childCount * childPrice
  }, [adultCount, childCount, pricePerSeat])

  const isReady = useMemo(() => {
    return selectedSeats.length > 0 && selectedSeats.length === passengerTotal
  }, [passengerTotal, selectedSeats.length])

  const seatStateKey = useMemo(() => {
    return persistedKey
  }, [persistedKey])

  useEffect(() => {
    if (!selectedBus) return
    const totalSeats = seatMap.length
    const availableSeats = Math.max(0, Math.min(totalSeats, selectedBus.seats || 0))
    const bookedCount = Math.max(0, totalSeats - availableSeats)
    const seed = Array.from(selectedBus.id).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    )
    const random = (index) => {
      const value = Math.sin(seed + index) * 10000
      return value - Math.floor(value)
    }
    const pool = [...seatMap]
    const booked = []
    for (let i = 0; i < bookedCount && pool.length; i += 1) {
      const pick = Math.floor(random(i + bookedCount) * pool.length)
      booked.push(pool.splice(pick, 1)[0])
    }
    setBookedForBus(booked)
  }, [selectedBus])

  useEffect(() => {
    const stored = window.localStorage.getItem(seatStateKey)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed.selectedSeats)) {
        const sanitized = parsed.selectedSeats.filter(
          (seat) => !bookedForBus.includes(seat),
        )
        setSelectedSeats(sanitized)
      }
      if (Number.isFinite(parsed.adultCount)) setAdultCount(parsed.adultCount)
      if (Number.isFinite(parsed.childCount)) setChildCount(parsed.childCount)
      if (typeof parsed.note === 'string') setNote(parsed.note)
    } catch (error) {
      // ignore invalid storage
    }
  }, [bookedForBus, seatStateKey])

  useEffect(() => {
    const payload = {
      selectedSeats,
      adultCount,
      childCount,
      note,
    }
    window.localStorage.setItem(seatStateKey, JSON.stringify(payload))
  }, [adultCount, childCount, note, seatStateKey, selectedSeats])

  const toggleSeat = (seat) => {
    if (bookedForBus.includes(seat)) return
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    )
  }

  const clearSeats = () => {
    setSelectedSeats([])
  }

  const suggestedSeats = useMemo(() => {
    const available = seatMap.filter(
      (seat) => !bookedForBus.includes(seat) && !selectedSeats.includes(seat),
    )
    return available.slice(0, passengerTotal || 1)
  }, [bookedForBus, passengerTotal, selectedSeats])

  const applySuggested = () => {
    if (!suggestedSeats.length) return
    setSelectedSeats(suggestedSeats)
  }

  const updateAdultCount = (value) => {
    const next = Math.max(1, Math.min(6, Number(value) || 1))
    setAdultCount(next)
  }

  const updateChildCount = (value) => {
    const next = Math.max(0, Math.min(6, Number(value) || 0))
    setChildCount(next)
  }

  useEffect(() => {
    if (selectedSeats.length === 0) {
      setNotice('Select seats to continue.')
      return
    }
    if (selectedSeats.length !== passengerTotal) {
      setNotice('Seat count must match passenger count.')
      return
    }
    setNotice('')
  }, [passengerTotal, selectedSeats.length])

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
        {selectedBus ? (
          <p className="muted">
            {selectedBus.company} · {selectedBus.from} → {selectedBus.to}
          </p>
        ) : (
          <p className="muted">No bus selected.</p>
        )}
      </header>

      <div className="split">
        <div className="card">
          {selectedBus ? (
            <SeatLayout
              seats={seatMap}
              bookedSeats={bookedForBus}
              selectedSeats={selectedSeats}
              onToggle={toggleSeat}
            />
          ) : (
            <p className="muted">Select a trip to choose seats.</p>
          )}
          <div className="seat-actions">
            <button className="ghost-button compact" onClick={clearSeats}>
              Clear selection
            </button>
            <button className="ghost-button compact" onClick={applySuggested}>
              Select best seats
            </button>
          </div>
        </div>
        <div className="card summary">
          <h3>Selection Summary</h3>
          <div className="summary-item">
            <span>Trip</span>
            <strong>
              {selectedBus ? `${selectedBus.from} → ${selectedBus.to}` : '—'}
            </strong>
          </div>
          <div className="summary-item">
            <span>Departure</span>
            <strong>
              {selectedBus ? `${selectedBus.depart} · ${selectedBus.duration}` : '—'}
            </strong>
          </div>
          <div className="summary-item">
            <span>Bus</span>
            <strong>
              {selectedBus ? `${selectedBus.company} · ${selectedBus.type}` : '—'}
            </strong>
          </div>
          <div className="summary-item">
            <span>Selected seats</span>
            <strong>{selectedSeats.join(', ') || 'None'}</strong>
          </div>
          <div className="summary-item">
            <span>Passengers</span>
            <strong>{passengerTotal} total</strong>
          </div>
          <div className="passenger-grid">
            <label>
              Adults
              <input
                type="number"
                min="1"
                max="6"
                value={adultCount}
                onChange={(event) => updateAdultCount(event.target.value)}
              />
            </label>
            <label>
              Children
              <input
                type="number"
                min="0"
                max="6"
                value={childCount}
                onChange={(event) => updateChildCount(event.target.value)}
              />
            </label>
          </div>
          <div className="summary-item">
            <span>Price per seat</span>
            <strong>${pricePerSeat}</strong>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <strong>${adjustedTotal.toFixed(0)}</strong>
          </div>
          <div className="summary-item">
            <span>Notes</span>
            <input
              type="text"
              placeholder="Add pickup notes"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
          {notice && <p className="status-text">{notice}</p>}
          <button
            className="primary-button small"
            type="button"
            disabled={!isReady}
            onClick={() => isReady && navigate('/booking')}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection
