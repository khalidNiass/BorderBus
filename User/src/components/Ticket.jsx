import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { FaDownload, FaShareAlt, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa'

function Ticket({ booking }) {
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    const payload = JSON.stringify({
      ticketId: booking.ticketId || booking.id,
      bookingId: booking.id,
      name: booking.name,
      from: booking.from,
      to: booking.to,
      dateTime: booking.dateTime,
      seats: booking.seats,
    })
    QRCode.toDataURL(payload, { margin: 1, width: 160 })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''))
  }, [booking])

  const handleDownload = () => {
    const content = [
      `BorderBus Ticket`,
      `Booking ID: ${booking.id}`,
      `Ticket ID: ${booking.ticketId}`,
      `Passenger: ${booking.name}`,
      `Route: ${booking.from} → ${booking.to}`,
      `Date & Time: ${booking.dateTime}`,
      `Seats: ${booking.seats.join(', ')}`,
      `Operator: ${booking.company}`,
      `Bus Type: ${booking.busType}`,
      `Terminal: ${booking.terminal}`,
      `Gate: ${booking.gate}`,
      `Amount: $${booking.amount}`,
      `Payment Status: ${booking.paymentStatus}`,
    ].join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${booking.ticketId || booking.id}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const shareText = `BorderBus Ticket ${booking.ticketId || booking.id}: ${booking.from} → ${booking.to} on ${booking.dateTime}. Seats ${booking.seats.join(', ')}.`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BorderBus Ticket',
          text: shareText,
        })
        return
      } catch (error) {
        // fallback below
      }
    }
    await navigator.clipboard.writeText(shareText)
    alert('Ticket details copied to clipboard.')
  }

  const handleAddCalendar = () => {
    const [datePart, timePart] = booking.dateTime.split('·').map((part) => part.trim())
    const startDate = new Date(`${datePart} ${timePart}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
    const format = (date) =>
      date
        .toISOString()
        .replace(/[-:]/g, '')
        .split('.')[0] + 'Z'
    const details = encodeURIComponent(
      `${booking.company} ${booking.from} → ${booking.to}. Seats: ${booking.seats.join(', ')}.`,
    )
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${format(startDate)}`,
      `DTEND:${format(endDate)}`,
      `SUMMARY:${booking.from} → ${booking.to}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${booking.terminal}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${booking.ticketId || booking.id}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleCallSupport = () => {
    window.location.href = `tel:${booking.support.replace(/\s/g, '')}`
  }

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div>
          <p className="muted">Booking ID</p>
          <h3>{booking.id}</h3>
          <p className="muted">Ticket #{booking.ticketId}</p>
        </div>
        <div className="qr">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Ticket QR" />
          ) : (
            <span>QR</span>
          )}
          <small>{booking.ticketId}</small>
        </div>
      </div>
      <div className="ticket-status">
        <span className="status upcoming">{booking.paymentStatus}</span>
        <span className="muted">Amount: ${booking.amount}</span>
      </div>
      <div className="ticket-body">
        <div>
          <p className="label">Passenger</p>
          <p>{booking.name}</p>
        </div>
        <div>
          <p className="label">Route</p>
          <p>
            {booking.from} → {booking.to}
          </p>
        </div>
        <div>
          <p className="label">Date & Time</p>
          <p>{booking.dateTime}</p>
        </div>
        <div>
          <p className="label">Seat(s)</p>
          <p>{booking.seats.join(', ')}</p>
        </div>
        <div>
          <p className="label">Operator</p>
          <p>{booking.company}</p>
        </div>
        <div>
          <p className="label">Bus Type</p>
          <p>{booking.busType}</p>
        </div>
        <div>
          <p className="label">Terminal</p>
          <p>{booking.terminal}</p>
        </div>
        <div>
          <p className="label">Gate</p>
          <p>{booking.gate}</p>
        </div>
      </div>
      <div className="ticket-note">
        <p className="label">Boarding Instructions</p>
        <p className="muted">
          Arrive 30 minutes early with a valid ID. Present the QR code at the
          boarding gate for a smooth check-in.
        </p>
      </div>
      <div className="ticket-note">
        <p className="label">Cancellation Policy</p>
        <p className="muted">{booking.policy}</p>
      </div>
      <div className="ticket-note">
        <p className="label">Support</p>
        <p className="muted">Call {booking.support} for assistance.</p>
      </div>
      <div className="ticket-actions">
        <button className="ghost-button" onClick={handleDownload}>
          <FaDownload /> Download Ticket
        </button>
        <button className="ghost-button" onClick={handleShare}>
          <FaShareAlt /> Share Ticket
        </button>
        <button className="ghost-button" onClick={handleAddCalendar}>
          <FaCalendarAlt /> Add to Calendar
        </button>
        <button className="ghost-button" onClick={handleCallSupport}>
          <FaPhoneAlt /> Call Support
        </button>
      </div>
    </div>
  )
}

export default Ticket
