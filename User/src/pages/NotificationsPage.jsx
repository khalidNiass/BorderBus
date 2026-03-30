import { notifications } from '../data/mockData'

function NotificationsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Notifications</h1>
        <p className="muted">Stay updated about your trips.</p>
      </header>

      <div className="stack">
        {notifications.map((note) => (
          <div key={note.id} className="card notification">
            <div>
              <h3>{note.title}</h3>
              <p className="muted">{note.description}</p>
            </div>
            <span className="muted">{note.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsPage
