import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { buses, recentSearches, popularRoutes } from '../data/mockData'

function SearchTrips() {
  const [values, setValues] = useState(() => {
    const stored = window.localStorage.getItem('borderbus.lastSearch')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return {
          from: parsed.from || '',
          to: parsed.to || '',
          date: parsed.date || '',
        }
      } catch (error) {
        return { from: '', to: '', date: '' }
      }
    }
    return { from: '', to: '', date: '' }
  })
  const [errors, setErrors] = useState({})
  const [activeField, setActiveField] = useState('from')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recent, setRecent] = useState(() => {
    const stored = window.localStorage.getItem('borderbus.recentSearches')
    if (!stored) return recentSearches
    try {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) && parsed.length ? parsed : recentSearches
    } catch (error) {
      return recentSearches
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!values.date) {
      const today = new Date().toISOString().slice(0, 10)
      setValues((prev) => ({ ...prev, date: today }))
    }
  }, [values.date])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSwap = () => {
    setValues((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  const validate = () => {
    const next = {}
    if (!values.from.trim()) next.from = 'Enter a departure city.'
    if (!values.to.trim()) next.to = 'Enter a destination.'
    if (!values.date) next.date = 'Choose a travel date.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    const payload = {
      from: values.from.trim(),
      to: values.to.trim(),
      date: values.date,
    }
    window.localStorage.setItem('borderbus.lastSearch', JSON.stringify(payload))
    setRecent((prev) => {
      const next = [payload, ...prev.filter((item) => item.from !== payload.from || item.to !== payload.to || item.date !== payload.date)]
        .slice(0, 5)
      window.localStorage.setItem('borderbus.recentSearches', JSON.stringify(next))
      return next
    })
    const params = new URLSearchParams(payload).toString()
    navigate(`/results?${params}`, { state: payload })
    setIsSubmitting(false)
  }

  const allCities = useMemo(() => {
    const cities = new Set()
    buses.forEach((bus) => {
      cities.add(bus.from)
      cities.add(bus.to)
    })
    recentSearches.forEach((item) => {
      cities.add(item.from)
      cities.add(item.to)
    })
    popularRoutes.forEach((item) => {
      cities.add(item.from)
      cities.add(item.to)
    })
    return Array.from(cities)
  }, [])

  const suggestions = useMemo(() => {
    const query = values[activeField]?.trim().toLowerCase()
    if (!query) return []
    return allCities.filter((city) => city.toLowerCase().includes(query)).slice(0, 6)
  }, [activeField, allCities, values])

  const handleSuggestion = (value) => {
    setValues((prev) => ({ ...prev, [activeField]: value }))
    setErrors((prev) => ({ ...prev, [activeField]: '' }))
  }

  const handleRecentClick = (item) => {
    setValues({ from: item.from, to: item.to, date: item.date })
    setErrors({})
    const params = new URLSearchParams(item).toString()
    navigate(`/results?${params}`, { state: item })
  }

  const previewCount = useMemo(() => {
    const from = values.from.trim().toLowerCase()
    const to = values.to.trim().toLowerCase()
    return buses.filter((bus) => {
      const fromOk = from ? bus.from.toLowerCase().includes(from) : true
      const toOk = to ? bus.to.toLowerCase().includes(to) : true
      return fromOk && toOk
    }).length
  }, [values.from, values.to])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Search Trips</h1>
        <p className="muted">Find the best bus options for your route.</p>
      </header>

      <SearchBar
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSwap={handleSwap}
        onFieldFocus={setActiveField}
        errors={errors}
        isSubmitting={isSubmitting}
      />

      {(errors.from || errors.to || errors.date) && (
        <div className="form-errors">
          {errors.from && <p>{errors.from}</p>}
          {errors.to && <p>{errors.to}</p>}
          {errors.date && <p>{errors.date}</p>}
        </div>
      )}

      <div className="search-meta">
        <span className="muted">
          {previewCount} {previewCount === 1 ? 'route' : 'routes'} available
        </span>
        {values.from && values.to && (
          <button type="button" className="ghost-button compact" onClick={handleSwap}>
            Reverse route
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="card">
          <div className="card-title">Suggested Cities</div>
          <div className="chip-row">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                className="chip-button"
                onClick={() => handleSuggestion(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Recent Searches</div>
        {recent.length === 0 ? (
          <p className="muted">Your recent routes will appear here.</p>
        ) : (
          <div className="recent-grid">
            {recent.map((item) => (
              <button
                key={`${item.from}-${item.to}-${item.date}`}
                type="button"
                className="recent-card"
                onClick={() => handleRecentClick(item)}
              >
                <div>
                  <strong>
                    {item.from} → {item.to}
                  </strong>
                  <p className="muted">{item.date}</p>
                </div>
                <span className="pill">Quick</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchTrips
