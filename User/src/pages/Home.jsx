import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BusFeedCard from '../components/BusFeedCard'
import { buses } from '../data/mockData'

function Home() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    price: 60,
    time: 'any',
    type: 'any',
    rating: 'any',
    seats: 10,
  })

  const filteredBuses = useMemo(() => {
    const matchesTime = (time) => {
      if (filters.time === 'any') return true
      const [hours] = time.split(':').map(Number)
      if (filters.time === 'morning') return hours >= 5 && hours <= 11
      if (filters.time === 'afternoon') return hours >= 12 && hours <= 17
      if (filters.time === 'evening') return hours >= 18 && hours <= 23
      return true
    }

    return buses
      .filter((bus) => bus.price <= Number(filters.price))
      .filter((bus) => bus.seats >= Number(filters.seats))
      .filter((bus) => (filters.type === 'any' ? true : bus.type === filters.type))
      .filter((bus) =>
        filters.rating === 'any' ? true : bus.rating >= Number(filters.rating),
      )
      .filter((bus) => matchesTime(bus.depart))
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <span className="badge">Trusted by 1.2M travelers</span>
          <h1>Plan your next BorderBus trip</h1>
          <p className="muted">
            Search routes, compare prices, and book seats in minutes.
          </p>
          <div className="hero-highlights">
            <div>
              <strong>98% on-time</strong>
              <span className="muted">Top-rated operators</span>
            </div>
            <div>
              <strong>24/7 support</strong>
              <span className="muted">Live border assistance</span>
            </div>
            <div>
              <strong>Instant tickets</strong>
              <span className="muted">No printing needed</span>
            </div>
          </div>
        </div>
      </section>

      <div className="feed-header">
        <div>
          <h2>Live departures</h2>
          <p className="muted">Real-time updates from trusted operators.</p>
        </div>
        <span className="pill">Live</span>
      </div>

      <div className="card filter-card">
        <div className="filter-grid">
          <label>
            Max Price (${filters.price})
            <input
              type="range"
              min="10"
              max="80"
              value={filters.price}
              onChange={(event) => handleFilterChange('price', event.target.value)}
            />
          </label>
          <label>
            Time
            <select
              value={filters.time}
              onChange={(event) => handleFilterChange('time', event.target.value)}
            >
              <option value="any">Any time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </label>
          <label>
            Bus Type
            <select
              value={filters.type}
              onChange={(event) => handleFilterChange('type', event.target.value)}
            >
              <option value="any">Any</option>
              <option value="Luxury">Luxury</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </label>
          <label>
            Minimum Rating
            <select
              value={filters.rating}
              onChange={(event) => handleFilterChange('rating', event.target.value)}
            >
              <option value="any">Any</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </select>
          </label>
          <label>
            Min Seats ({filters.seats})
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={filters.seats}
              onChange={(event) => handleFilterChange('seats', event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="feed">
        {filteredBuses.map((bus) => (
          <BusFeedCard key={bus.id} bus={bus} />
        ))}
      </div>

      <div className="home-cta">
        <div>
          <h3>Ready to book?</h3>
          <p className="muted">Find routes and compare prices in seconds.</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/search')}>
          Search Trips
        </button>
      </div>
    </div>
  )
}

export default Home
