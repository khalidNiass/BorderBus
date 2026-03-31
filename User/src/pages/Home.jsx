import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BusFeedCard from '../components/BusFeedCard'
import { buses } from '../data/mockData'

function Home() {
  const [values, setValues] = useState({
    from: 'Dakar',
    to: 'Banjul',
    date: '2026-04-03',
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
        <h1>Plan your next BorderBus trip</h1>
        <p className="muted">
          Search routes, compare prices, and book seats in minutes.
        </p>
      </header>

      <SearchBar values={values} onChange={handleChange} onSubmit={handleSubmit} />

      <div className="feed">
        {buses.map((bus) => (
          <BusFeedCard key={bus.id} bus={bus} />
        ))}
      </div>

    </div>
  )
}

export default Home
