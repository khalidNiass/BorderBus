import { FaFire } from 'react-icons/fa'

function RightSidebar() {
  return (
    <aside className="rightbar">
      <div className="card">
        <div className="card-title">
          <FaFire />
          <span>Promotions</span>
        </div>
        <p className="muted">No active promotions right now.</p>
      </div>

    </aside>
  )
}

export default RightSidebar
