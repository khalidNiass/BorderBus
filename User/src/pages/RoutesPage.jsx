import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buses, popularRoutes } from '../data/mockData'

function RoutesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('today')

  const toMinutes = (duration) => {
    const [hoursPart, minutesPart] = duration.split('h')
    const hours = Number(hoursPart.trim()) || 0
    const minutes = Number(minutesPart.replace('m', '').trim()) || 0
    return hours * 60 + minutes
  }

  const routes = useMemo(() => {
    const minPrice = Math.min(...popularRoutes.map((route) => route.price))
    const minDuration = Math.min(...popularRoutes.map((route) => toMinutes(route.duration)))
    return popularRoutes.map((route, index) => {
      const matching = buses.filter(
        (bus) => bus.from === route.from && bus.to === route.to,
      )
      const nextDeparture = matching
        .map((bus) => bus.depart)
        .sort((a, b) => a.localeCompare(b))[0]
      const badges = []
      if (route.price === minPrice) badges.push('Best value')
      if (toMinutes(route.duration) === minDuration) badges.push('Fastest')
      if (index === 0) badges.push('Most booked')
      return {
        ...route,
        tripsToday: matching.length,
        nextDeparture: nextDeparture || 'No departures',
        badges,
      }
    })
  }, [])

  const filteredRoutes = useMemo(() => {
    const list = [...routes]
    if (filter === 'budget') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (filter === 'fastest') {
      return list.sort((a, b) => toMinutes(a.duration) - toMinutes(b.duration))
    }
    if (filter === 'booked') {
      return list.sort((a, b) => b.tripsToday - a.tripsToday)
    }
    return list
  }, [filter, routes])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Popular Routes</h1>
        <p className="muted">Compare trending routes and quick availability.</p>
      </header>

      <div className="section-header">
        <div className="filter-tabs">
          <button
            className={`tab ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`tab ${filter === 'budget' ? 'active' : ''}`}
            onClick={() => setFilter('budget')}
          >
            Cheapest
          </button>
          <button
            className={`tab ${filter === 'fastest' ? 'active' : ''}`}
            onClick={() => setFilter('fastest')}
          >
            Fastest
          </button>
          <button
            className={`tab ${filter === 'booked' ? 'active' : ''}`}
            onClick={() => setFilter('booked')}
          >
            Most booked
          </button>
        </div>
      </div>

      <div className="route-grid">
        {filteredRoutes.map((route) => (
          <button
            key={`${route.from}-${route.to}`}
            type="button"
            className="route-card route-card-button"
            onClick={() =>
              navigate('/results', { state: { from: route.from, to: route.to } })
            }
          >
            <div className="route-card-header">
              <p>
                {route.from} → {route.to}
              </p>
              <div className="route-badges">
                {route.badges.map((badge) => (
                  <span key={badge} className="mini-badge">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="route-meta">
              <span className="muted">{route.duration}</span>
              <span className="muted">Next: {route.nextDeparture}</span>
              <span className="muted">{route.tripsToday} trips today</span>
            </div>
            <div className="route-card-footer">
              <strong>${route.price}</strong>
              <div className="route-actions">
                <span className="action-label">View trips</span>
                <span className="action-label secondary">Compare</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoutesPage
