import { useLocation } from 'react-router-dom'
import Ticket from '../components/Ticket'

function TicketPage() {
  const location = useLocation()
  const booking =
    location.state || {
      id: 'BK-44512',
      name: 'Khalid Niass',
      from: 'Dakar',
      to: 'Banjul',
      dateTime: '03 Apr 2026 · 06:30',
      seats: [3, 4],
      company: 'Atlantic Express',
      busType: 'Luxury',
      terminal: 'Terminal 4, Dakar',
      gate: 'G3',
      paymentStatus: 'Paid',
      amount: 64,
      policy: 'Free cancellation up to 2 hours before departure.',
      support: '+221 555 0131',
      ticketId: 'BB-2026-0412',
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
