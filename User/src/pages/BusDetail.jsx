import { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import { buses, companies } from '../data/mockData'

function BusDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const bus = useMemo(() => buses.find((item) => item.id === id), [id])
  const company = useMemo(
    () => companies.find((item) => item.id === bus?.companyId),
    [bus],
  )
  const images = bus?.images?.length ? bus.images : ['bus-placeholder.svg']
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
  }, [id])

  const showPrev = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNext = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!bus) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Bus not found</h1>
          <p className="muted">We could not locate that bus trip.</p>
        </header>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-top-bar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="page-title">{bus.company}</span>
        <div className="page-top-spacer"></div>
        <button className="icon-button" onClick={() => navigate('/search')}>
          <FaSearch />
        </button>
      </div>

      {company && (
        <section className="company-profile">
          <div className="company-meta">
            <NavLink to={`/company/${company.id}`} className="company-avatar">
              <span>{company.name.slice(0, 2).toUpperCase()}</span>
            </NavLink>
            <div>
              <NavLink to={`/company/${company.id}`} className="company-name">
                {company.name}
              </NavLink>
              <p className="muted">{company.about}</p>
            </div>
          </div>
          <div className="operator-detail-grid">
            <div>
              <p className="label">Rating</p>
              <strong>{company.rating}</strong>
            </div>
            <div>
              <p className="label">Destinations</p>
              <strong>{company.routes}</strong>
            </div>
            <div>
              <p className="label">On-time</p>
              <strong>{company.onTime}%</strong>
            </div>
            <div>
              <p className="label">Support</p>
              <strong>{company.support}</strong>
            </div>
          </div>
          <div className="operator-tags">
            {company.highlights.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      <header className="page-header">
        <h1>
          {bus.from} → {bus.to}
        </h1>
        <p className="muted">{bus.company}</p>
      </header>

      <div className="card">
        <h3>Trip Details</h3>
        <div className="bus-hero">
          <button
            type="button"
            className="hero-arrow left"
            onClick={showPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={new URL(`../assets/${images[activeImage]}`, import.meta.url).href}
            alt={`${bus.company} bus`}
          />
          <div className="hero-counter">
            {activeImage + 1}/{images.length}
          </div>
          <button
            type="button"
            className="hero-arrow right"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
        <div className="operator-detail-grid">
          <div>
            <p className="label">Departure</p>
            <strong>{bus.depart}</strong>
          </div>
          <div>
            <p className="label">Arrival</p>
            <strong>{bus.arrive}</strong>
          </div>
          <div>
            <p className="label">Duration</p>
            <strong>{bus.duration}</strong>
          </div>
          <div>
            <p className="label">Seats</p>
            <strong>{bus.seats}</strong>
          </div>
          <div>
            <p className="label">Price</p>
            <strong>${bus.price}</strong>
          </div>
          <div>
            <p className="label">Type</p>
            <strong>{bus.type}</strong>
          </div>
        </div>
        <div className="operator-tags">
          {bus.amenities.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <div className="stops">
          <p className="label">Stops</p>
          <div className="coverage-chips">
            {bus.stops.map((stop) => (
              <span key={stop} className="chip">
                {stop}
              </span>
            ))}
          </div>
        </div>
        <div className="stack align-right">
          <NavLink to="/seats" className="primary-button small">
            Select Seats
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default BusDetail
