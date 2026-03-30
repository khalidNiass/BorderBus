import { useEffect, useMemo, useState } from 'react'
import BusCard from '../components/BusCard'
import Filters from '../components/Filters'
import { buses as busResults } from '../data/mockData'

function SearchResults() {
  const [filters, setFilters] = useState({
    price: 60,
    time: 'any',
    type: 'any',
    sort: 'cheapest',
  })

  const filtered = useMemo(() => {
    const matchesTime = (time) => {
      if (filters.time === 'any') return true
      const [hours] = time.split(':').map(Number)
      if (filters.time === 'morning') return hours >= 5 && hours <= 11
      if (filters.time === 'afternoon') return hours >= 12 && hours <= 17
      if (filters.time === 'evening') return hours >= 18 && hours <= 23
      return true
    }

    return busResults
      .filter((bus) => bus.price <= Number(filters.price))
      .filter((bus) => (filters.type === 'any' ? true : bus.type === filters.type))
      .filter((bus) => matchesTime(bus.depart))
  }, [filters])

  const [sorted, setSorted] = useState(filtered)

  useEffect(() => {
    let next = [...filtered]
    if (filters.sort === 'cheapest') {
      next.sort((a, b) => a.price - b.price)
    }
    if (filters.sort === 'fastest') {
      const toMinutes = (duration) => {
        const [hoursPart, minutesPart] = duration.split('h')
        const hours = Number(hoursPart.trim())
        const minutes = Number(minutesPart.replace('m', '').trim())
        return hours * 60 + minutes
      }
      next.sort((a, b) => toMinutes(a.duration) - toMinutes(b.duration))
    }
    if (filters.sort === 'rating') {
      next.sort((a, b) => b.rating - a.rating)
    }
    setSorted(next)
  }, [filters.sort, filtered])

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Search Results</h1>
        <p className="muted">
          Showing {sorted.length} buses for Dakar → Banjul
        </p>
      </header>

      <Filters filters={filters} onChange={handleChange} />

      <div className="card-grid">
        {sorted.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
