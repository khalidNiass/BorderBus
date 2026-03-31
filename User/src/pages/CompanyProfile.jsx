import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaEnvelope,
  FaBolt,
  FaShieldAlt,
  FaRoute,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import {
  buses,
  companies,
  companyReviews,
} from '../data/mockData'
import companyCover from '../assets/company-cover.svg'
import busPlaceholder from '../assets/bus-placeholder.svg'

const tabs = ['Overview', 'Trips', 'Reviews', 'Fleet', 'Media']

function ProfileHeader({ company }) {
  const badges = []
  if (company.rating >= 4.7) badges.push('Top rated')
  if (company.onTime >= 95) badges.push('On-time leader')
  if (company.name.toLowerCase().includes('premium')) badges.push('Premium')

  return (
    <section className="company-hero">
      <div className="company-cover">
        <img src={companyCover} alt={`${company.name} cover`} />
        <div className="company-avatar large">
          <span>{company.name.slice(0, 2).toUpperCase()}</span>
        </div>
      </div>
      <div className="company-info">
        <div className="company-title">
          <h1>{company.name}</h1>
          <div className="rating-inline">
            <FaStar />
            <span>{company.rating}</span>
            <span className="muted">({company.ratingCount})</span>
          </div>
        </div>
        <p className="muted">{company.about}</p>
        <div className="company-badges">
          {badges.map((badge) => (
            <span key={badge} className="mini-badge">
              {badge}
            </span>
          ))}
        </div>
        <div className="company-meta-row">
          <span>
            <FaMapMarkerAlt /> {company.location}
          </span>
          <span>
            <FaPhoneAlt /> {company.phone}
          </span>
          <span>
            <FaEnvelope /> {company.email}
          </span>
        </div>
      </div>
    </section>
  )
}

function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function TripCard({ bus, onViewSeats }) {
  return (
    <div className="trip-card">
      <div>
        <strong>
          {bus.from} → {bus.to}
        </strong>
        <p className="muted">
          {bus.depart} · {bus.arrive}
        </p>
      </div>
      <div className="trip-meta">
        <span className="muted">${bus.price}</span>
        <button className="ghost-button compact" onClick={() => onViewSeats(bus)}>
          View Seats
        </button>
      </div>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="review">
      <div className="review-header">
        <strong>{review.name}</strong>
        <div className="rating-inline">
          <FaStar />
          <span>{review.rating}</span>
        </div>
      </div>
      <p className="muted">{review.comment}</p>
    </div>
  )
}

function FleetCard({ title, features }) {
  return (
    <div className="fleet-card">
      <img src={busPlaceholder} alt={title} />
      <div>
        <strong>{title}</strong>
        <ul className="fleet-features">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CompanyProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const company = useMemo(
    () => companies.find((item) => item.id === id),
    [id],
  )
  const companyBuses = useMemo(
    () => buses.filter((bus) => bus.companyId === id),
    [id],
  )
  const [activeTab, setActiveTab] = useState('Overview')
  const [activeMedia, setActiveMedia] = useState(0)

  const mediaItems = [busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder]
  const fleet = [
    { title: 'Luxury Bus', features: ['WiFi', 'Snacks', 'Recliner Seats'] },
    { title: 'AC Bus', features: ['AC', 'Charging Ports', 'Live Tracking'] },
    { title: 'Sleeper Bus', features: ['Sleeping Pods', 'Blankets', 'Quiet Zone'] },
  ]

  const topRoutes = useMemo(() => {
    return companyBuses
      .slice(0, 3)
      .map((bus) => ({
        from: bus.from,
        to: bus.to,
        price: bus.price,
        duration: bus.duration,
      }))
  }, [companyBuses])

  const reviews = useMemo(() => {
    if (!company) return []
    const offset = company.id.length % companyReviews.length
    return companyReviews.map((review, index) => {
      const rating = Math.max(3, Math.min(5, review.rating - (index + offset) % 2))
      return {
        ...review,
        id: `${company.id}-${review.id}`,
        rating,
      }
    })
  }, [company])

  const avgPrice = useMemo(() => {
    if (!companyBuses.length) return null
    const total = companyBuses.reduce((sum, bus) => sum + bus.price, 0)
    return Math.round(total / companyBuses.length)
  }, [companyBuses])

  const handleViewSeats = (bus) => {
    navigate('/seats', { state: bus })
  }

  const handleContactCall = () => {
    window.location.href = `tel:${company.phone.replace(/\s/g, '')}`
  }

  const handleContactEmail = () => {
    window.location.href = `mailto:${company.email}`
  }

  const handleDirections = () => {
    navigate('/search')
  }

  const showPrevMedia = () => {
    setActiveMedia((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1))
  }

  const showNextMedia = () => {
    setActiveMedia((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1))
  }

  if (!company) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Company not found</h1>
          <p className="muted">We could not locate that operator.</p>
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
        <span className="page-title">{company.name}</span>
        <div className="page-top-spacer"></div>
        <button className="icon-button" onClick={() => navigate('/search')}>
          <FaSearch />
        </button>
      </div>
      <ProfileHeader company={company} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'Overview' && (
        <div className="tab-content">
          <div className="card">
            <h3>Company Overview</h3>
            <p className="muted">{company.about}</p>
            <div className="company-stats">
              <div>
                <p className="label">On-time</p>
                <strong>{company.onTime}%</strong>
              </div>
              <div>
                <p className="label">Avg Price</p>
                <strong>{avgPrice ? `$${avgPrice}` : '—'}</strong>
              </div>
              <div>
                <p className="label">Routes</p>
                <strong>{company.routes}</strong>
              </div>
              <div>
                <p className="label">Support</p>
                <strong>{company.support}</strong>
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
                <p className="label">Trips</p>
                <strong>{company.tripsCompleted.toLocaleString()}</strong>
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
            <div className="route-highlights">
              <div className="card-title">Route highlights</div>
              {topRoutes.length === 0 ? (
                <p className="muted">No routes listed yet.</p>
              ) : (
                <div className="route-highlight-grid">
                  {topRoutes.map((route) => (
                    <div key={`${route.from}-${route.to}`} className="route-highlight">
                      <div>
                        <strong>
                          {route.from} → {route.to}
                        </strong>
                        <p className="muted">{route.duration}</p>
                      </div>
                      <span className="badge">${route.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="contact-grid">
              <div>
                <p className="label">Contact</p>
                <strong>{company.phone}</strong>
              </div>
              <div>
                <p className="label">Email</p>
                <strong>{company.email}</strong>
              </div>
              <div>
                <p className="label">Location</p>
                <strong>{company.location}</strong>
              </div>
              <div>
                <p className="label">Address</p>
                <strong>{company.address}</strong>
              </div>
            </div>
            <div className="contact-actions">
              <button className="ghost-button compact" onClick={handleContactCall}>
                <FaPhoneAlt /> Call
              </button>
              <button className="ghost-button compact" onClick={handleContactEmail}>
                <FaEnvelope /> Email
              </button>
              <button className="ghost-button compact" onClick={handleDirections}>
                <FaMapMarkerAlt /> Directions
              </button>
            </div>
            <div className="service-map">
              <div className="map-header">
                <div>
                  <strong>Service area</strong>
                  <p className="muted">Primary corridors and terminals.</p>
                </div>
                <div className="map-tags">
                  <span className="mini-badge">Coastal</span>
                  <span className="mini-badge">Regional</span>
                </div>
              </div>
              <div className="map-canvas">
                <div className="map-pin" style={{ top: '32%', left: '20%' }}></div>
                <div className="map-pin" style={{ top: '48%', left: '46%' }}></div>
                <div className="map-pin" style={{ top: '68%', left: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Trips' && (
        <div className="tab-content">
          <div className="card">
            <h3>Routes & Trips</h3>
            {companyBuses.length === 0 ? (
              <p className="muted">No trips listed yet.</p>
            ) : (
              <div className="stack">
                {companyBuses.map((bus) => (
                  <TripCard key={bus.id} bus={bus} onViewSeats={handleViewSeats} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="tab-content">
          <div className="card">
            <div className="review-summary">
              <div>
                <h3>Average Rating</h3>
                <div className="rating-inline">
                  <FaStar />
                  <span>{company.rating}</span>
                  <span className="muted">({company.ratingCount} reviews)</span>
                </div>
              </div>
            </div>
            <div className="review-list">
              {reviews.length === 0 ? (
                <p className="muted">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Fleet' && (
        <div className="tab-content">
          <div className="card">
            <h3>Fleet</h3>
            <div className="fleet-grid">
              {fleet.map((item) => (
                <FleetCard key={item.title} title={item.title} features={item.features} />
              ))}
            </div>
            <div className="fleet-highlights">
              <div className="fleet-highlight">
                <FaRoute />
                <div>
                  <strong>Wide coverage</strong>
                  <p className="muted">Multi-country service corridors</p>
                </div>
              </div>
              <div className="fleet-highlight">
                <FaShieldAlt />
                <div>
                  <strong>Safety checks</strong>
                  <p className="muted">Daily inspections and maintenance</p>
                </div>
              </div>
              <div className="fleet-highlight">
                <FaBolt />
                <div>
                  <strong>Fast boarding</strong>
                  <p className="muted">Digital tickets and priority lanes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Media' && (
        <div className="tab-content">
          <div className="card">
            <h3>Media</h3>
            {mediaItems.length === 0 ? (
              <p className="muted">No media uploaded yet.</p>
            ) : (
              <div className="media-carousel">
                <div className="media-hero">
                  <button className="hero-arrow left" onClick={showPrevMedia}>
                    <FaChevronLeft />
                  </button>
                  <img src={mediaItems[activeMedia]} alt="Bus media" />
                  <button className="hero-arrow right" onClick={showNextMedia}>
                    <FaChevronRight />
                  </button>
                </div>
                <div className="media-thumbs">
                  {mediaItems.map((item, index) => (
                    <button
                      key={`${item}-${index}`}
                      className={`thumb ${activeMedia === index ? 'active' : ''}`}
                      onClick={() => setActiveMedia(index)}
                      type="button"
                    >
                      <img src={item} alt="Media thumbnail" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyProfile
