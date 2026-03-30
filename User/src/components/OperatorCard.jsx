import { NavLink } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

function OperatorCard({ operator }) {
  return (
    <div className="operator-post">
      <div className="operator-post-header">
        <div className="avatar sm">{operator.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <h3>{operator.name}</h3>
          <p className="muted">{operator.tagline}</p>
        </div>
      </div>

      <div className="operator-post-body">
        <p>{operator.about}</p>
        <div className="operator-tags">
          {operator.highlights.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="operator-post-footer">
        <div className="rating">
          <FaStar />
          <span>{operator.rating}</span>
        </div>
        <div className="operator-stats">
          <span className="muted">{operator.routes} routes</span>
          <span className="muted">{operator.onTime}% on-time</span>
          <span className="muted">from ${operator.priceFrom}</span>
        </div>
        <NavLink to={`/operators/${operator.id}`} className="ghost-button compact">
          View Details
        </NavLink>
      </div>
    </div>
  )
}

export default OperatorCard
