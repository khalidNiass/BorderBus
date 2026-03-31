import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function BusCard({ bus }) {
  return (
    <div className="bus-card">
      <div className="bus-card-header">
        <div>
          <h3>{bus.company}</h3>
          <p className="muted">
            {bus.from} → {bus.to}
          </p>
        </div>
        <span className="chip">{bus.type}</span>
      </div>
      <div className="bus-card-body">
        <div>
          <p className="label">Departure</p>
          <p>{bus.depart}</p>
        </div>
        <div>
          <p className="label">Arrival</p>
          <p>{bus.arrive}</p>
        </div>
        <div>
          <p className="label">Duration</p>
          <p>{bus.duration}</p>
        </div>
        <div>
          <p className="label">Seats</p>
          <p>{bus.seats} available</p>
        </div>
        <div>
          <p className="label">Price</p>
          <p className="price">${bus.price}</p>
        </div>
      </div>
      <div className="bus-card-footer">
        <div className="rating">
          <FaStar />
          <span>{bus.rating}</span>
        </div>
        <NavLink to="/seats" className="ghost-button">
          View Seats
        </NavLink>
      </div>
    </div>
  )
}

export default BusCard
