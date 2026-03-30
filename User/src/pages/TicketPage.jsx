import Ticket from '../components/Ticket'

function TicketPage() {
  const booking = {
    id: 'BK-44512',
    name: 'Khalid Niass',
    from: 'Dakar',
    to: 'Banjul',
    dateTime: '03 Apr 2026 · 06:30',
    seats: [3, 4],
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Your Ticket</h1>
        <p className="muted">Present this ticket at the boarding gate.</p>
      </header>

      <Ticket booking={booking} />
    </div>
  )
}

export default TicketPage
