import { NavLink, useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import busPlaceholder from '../assets/bus-placeholder.svg'

function BusFeedCard({ bus }) {
  const navigate = useNavigate()

  const goToBus = () => {
    navigate(`/bus/${bus.id}`)
  }

  const stopBubble = (event) => {
    event.stopPropagation()
  }

  return (
    <div className="operator-post clickable" onClick={goToBus} role="button">
      <div className="operator-post-header">
        <NavLink
          to={`/company/${bus.companyId}`}
          className="company-pic"
          onClick={stopBubble}
        >
          <span>{bus.company.slice(0, 2).toUpperCase()}</span>
        </NavLink>
        <div>
          <h3>{bus.company}</h3>
          <p className="muted">
            {bus.from} → {bus.to}
          </p>
        </div>
      </div>

      <div className="bus-media">
        <img src={busPlaceholder} alt={`${bus.company} bus`} />
      </div>

      <div className="operator-post-body">
        <p>
          Departs {bus.depart} · Arrives {bus.arrive} · {bus.duration}
        </p>
        <div className="operator-tags">
          {bus.amenities.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="operator-post-footer">
        <div className="rating">
          <FaStar />
          <span>{bus.rating}</span>
        </div>
        <div className="operator-stats">
          <span className="muted">{bus.seats} seats</span>
          <span className="muted">{bus.type}</span>
          <span className="muted">${bus.price}</span>
        </div>
      </div>
    </div>
  )
}

export default BusFeedCard
