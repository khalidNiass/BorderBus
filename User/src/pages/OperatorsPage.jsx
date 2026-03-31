import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { companies } from '../data/mockData'

function OperatorsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('top')

  const operators = useMemo(() => {
    const topRating = Math.max(...companies.map((company) => company.rating))
    const topOnTime = Math.max(...companies.map((company) => company.onTime))
    const topRoutes = Math.max(...companies.map((company) => company.routes))
    return companies.map((company) => {
      const badges = []
      if (company.rating === topRating) badges.push('Top rated')
      if (company.onTime === topOnTime) badges.push('On-time leader')
      if (company.routes === topRoutes) badges.push('Most routes')
      if (company.name.toLowerCase().includes('premium')) badges.push('Premium')
      return { ...company, badges }
    })
  }, [])

  const filteredOperators = useMemo(() => {
    const list = [...operators]
    if (filter === 'routes') {
      return list.sort((a, b) => b.routes - a.routes)
    }
    if (filter === 'ontime') {
      return list.sort((a, b) => b.onTime - a.onTime)
    }
    return list.sort((a, b) => b.rating - a.rating)
  }, [filter, operators])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Operators</h1>
        <p className="muted">Compare ratings, on-time scores, and coverage.</p>
      </header>

      <div className="section-header">
        <div className="filter-tabs">
          <button
            className={`tab ${filter === 'top' ? 'active' : ''}`}
            onClick={() => setFilter('top')}
          >
            Top rated
          </button>
          <button
            className={`tab ${filter === 'ontime' ? 'active' : ''}`}
            onClick={() => setFilter('ontime')}
          >
            On-time
          </button>
          <button
            className={`tab ${filter === 'routes' ? 'active' : ''}`}
            onClick={() => setFilter('routes')}
          >
            Most routes
          </button>
        </div>
      </div>

      <div className="operator-grid">
        {filteredOperators.map((company) => (
          <div key={company.id} className="operator-card operator-card-rich">
            <div>
              <strong>{company.name}</strong>
              <p className="muted">{company.location}</p>
              <div className="operator-stats">
                <span>{company.onTime}% on-time</span>
                <span>{company.routes} routes</span>
              </div>
            </div>
            <div className="operator-meta">
              <span className="badge">{company.rating}★</span>
              <div className="operator-badges">
                {company.badges.map((badge) => (
                  <span key={badge} className="mini-badge">
                    {badge}
                  </span>
                ))}
              </div>
              <button
                className="ghost-button compact"
                onClick={() => navigate(`/company/${company.id}`)}
              >
                View profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OperatorsPage
