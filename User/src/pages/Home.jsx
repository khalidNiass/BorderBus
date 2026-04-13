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

  const popularRoutes = [
    {
      id: 1,
      route: 'Dakar → Bamako',
      duration: '10h 25m',
      price: '$48',
      seats: '18 left',
    },
    {
      id: 2,
      route: 'Casablanca → Tangier',
      duration: '5h 10m',
      price: '$34',
      seats: '12 left',
    },
    {
      id: 3,
      route: 'Abidjan → Accra',
      duration: '7h 45m',
      price: '$55',
      seats: '9 left',
    },
    {
      id: 4,
      route: 'Lagos → Cotonou',
      duration: '8h 10m',
      price: '$42',
      seats: '21 left',
    },
  ]

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

      <section className="mb-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Popular routes to book now</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Top-rated cross-border trips with the most available seats.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 px-5 py-2 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Explore all routes
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {popularRoutes.map((route) => (
            <div
              key={route.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/80 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text)]">{route.route}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{route.duration}</p>
              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="text-[var(--text)] font-semibold">{route.price}</span>
                <span className="rounded-full bg-[var(--border)]/90 px-3 py-1 text-[var(--text-muted)]">{route.seats}</span>
              </div>
            </div>
          ))}
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
