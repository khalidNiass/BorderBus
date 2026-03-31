import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaEnvelope } from 'react-icons/fa'
import {
  buses,
  companies,
  companyReviews,
} from '../data/mockData'
import companyCover from '../assets/company-cover.svg'
import busPlaceholder from '../assets/bus-placeholder.svg'

const tabs = ['Overview', 'Trips', 'Reviews', 'Fleet', 'Media']

function ProfileHeader({ company }) {
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
        <div className="company-actions">
          <button className="primary-button">Book Trip</button>
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

function TripCard({ bus }) {
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
        <button className="ghost-button compact">View Seats</button>
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

function MediaGrid({ items }) {
  return (
    <div className="media-grid">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="media-card">
          <img src={item} alt="Bus media" />
        </div>
      ))}
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

  const mediaItems = [busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder, busPlaceholder]
  const fleet = [
    { title: 'Luxury Bus', features: ['WiFi', 'Snacks', 'Recliner Seats'] },
    { title: 'AC Bus', features: ['AC', 'Charging Ports', 'Live Tracking'] },
    { title: 'Sleeper Bus', features: ['Sleeping Pods', 'Blankets', 'Quiet Zone'] },
  ]

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
          </div>
        </div>
      )}

      {activeTab === 'Trips' && (
        <div className="tab-content">
          <div className="card">
            <h3>Routes & Trips</h3>
            <div className="stack">
              {companyBuses.map((bus) => (
                <TripCard key={bus.id} bus={bus} />
              ))}
            </div>
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
              {companyReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
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
          </div>
        </div>
      )}

      {activeTab === 'Media' && (
        <div className="tab-content">
          <div className="card">
            <h3>Media</h3>
            <MediaGrid items={mediaItems} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyProfile
