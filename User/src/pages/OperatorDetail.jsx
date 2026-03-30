import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { operators } from '../data/mockData'

function OperatorDetail() {
  const { id } = useParams()
  const operator = useMemo(
    () => operators.find((item) => item.id === id),
    [id],
  )

  if (!operator) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Operator not found</h1>
          <p className="muted">We could not locate that operator.</p>
        </header>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>{operator.name}</h1>
        <p className="muted">{operator.tagline}</p>
      </header>

      <div className="card">
        <h3>Overview</h3>
        <p>{operator.about}</p>
        <div className="operator-detail-grid">
          <div>
            <p className="label">Rating</p>
            <strong>{operator.rating}</strong>
          </div>
          <div>
            <p className="label">Routes</p>
            <strong>{operator.routes}</strong>
          </div>
          <div>
            <p className="label">On-time</p>
            <strong>{operator.onTime}%</strong>
          </div>
          <div>
            <p className="label">Price From</p>
            <strong>${operator.priceFrom}</strong>
          </div>
        </div>
        <div className="operator-tags">
          {operator.highlights.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OperatorDetail
