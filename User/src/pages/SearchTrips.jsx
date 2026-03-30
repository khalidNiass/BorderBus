import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { popularRoutes } from '../data/mockData'

function SearchTrips() {
  const [values, setValues] = useState({
    from: '',
    to: '',
    date: '',
  })
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/results')
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Search Trips</h1>
        <p className="muted">Find the best bus options for your route.</p>
      </header>

      <SearchBar values={values} onChange={handleChange} onSubmit={handleSubmit} />

      <div className="card">
        <h3>Popular Routes Today</h3>
        <div className="route-grid">
          {popularRoutes.map((route) => (
            <div key={`${route.from}-${route.to}`} className="route-card">
              <p>
                {route.from} → {route.to}
              </p>
              <span className="muted">{route.duration}</span>
              <strong>${route.price}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchTrips
