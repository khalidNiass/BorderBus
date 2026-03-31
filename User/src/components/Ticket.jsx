import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { FaDownload, FaShareAlt, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa'

function Ticket({ booking }) {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const safeBooking = useMemo(() => {
    return {
      id: booking?.id || '—',
      ticketId: booking?.ticketId || booking?.id || '—',
      name: booking?.name || '—',
      from: booking?.from || '—',
      to: booking?.to || '—',
      dateTime: booking?.dateTime || '—',
      seats: Array.isArray(booking?.seats) ? booking.seats : [],
      company: booking?.company || '—',
      busType: booking?.busType || '—',
      terminal: booking?.terminal || '—',
      gate: booking?.gate || '—',
      paymentStatus: booking?.paymentStatus || 'Pending',
      amount: Number.isFinite(booking?.amount) ? booking.amount : 0,
      policy: booking?.policy || '—',
      support: booking?.support || '',
    }
  }, [booking])

  useEffect(() => {
    if (!QRCode?.toDataURL) {
      setQrDataUrl('')
      return
    }
    const payload = JSON.stringify({
      ticketId: safeBooking.ticketId,
      bookingId: safeBooking.id,
      name: safeBooking.name,
      from: safeBooking.from,
      to: safeBooking.to,
      dateTime: safeBooking.dateTime,
      seats: safeBooking.seats,
    })
    QRCode.toDataURL(payload, { margin: 1, width: 160 })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''))
  }, [safeBooking])

  const handleDownload = () => {
    const content = [
      `BorderBus Ticket`,
      `Booking ID: ${safeBooking.id}`,
      `Ticket ID: ${safeBooking.ticketId}`,
      `Passenger: ${safeBooking.name}`,
      `Route: ${safeBooking.from} → ${safeBooking.to}`,
      `Date & Time: ${safeBooking.dateTime}`,
      `Seats: ${safeBooking.seats.join(', ') || '—'}`,
      `Operator: ${safeBooking.company}`,
      `Bus Type: ${safeBooking.busType}`,
      `Terminal: ${safeBooking.terminal}`,
      `Gate: ${safeBooking.gate}`,
      `Amount: $${safeBooking.amount}`,
      `Payment Status: ${safeBooking.paymentStatus}`,
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
    const shareText = `BorderBus Ticket ${safeBooking.ticketId}: ${safeBooking.from} → ${safeBooking.to} on ${safeBooking.dateTime}. Seats ${safeBooking.seats.join(', ') || '—'}.`
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
    const [datePart, timePart] = safeBooking.dateTime.split('·').map((part) => part.trim())
    const startDate = new Date(`${datePart} ${timePart}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
    const format = (date) =>
      date
        .toISOString()
        .replace(/[-:]/g, '')
        .split('.')[0] + 'Z'
    const details = encodeURIComponent(
      `${safeBooking.company} ${safeBooking.from} → ${safeBooking.to}. Seats: ${safeBooking.seats.join(', ') || '—'}.`,
    )
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${format(startDate)}`,
      `DTEND:${format(endDate)}`,
      `SUMMARY:${safeBooking.from} → ${safeBooking.to}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${safeBooking.terminal}`,
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
    if (!safeBooking.support) return
    window.location.href = `tel:${safeBooking.support.replace(/\s/g, '')}`
  }

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div>
          <p className="muted">Booking ID</p>
          <h3>{safeBooking.id}</h3>
          <p className="muted">Ticket #{safeBooking.ticketId}</p>
        </div>
        <div className="qr">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Ticket QR" />
          ) : (
            <span>QR</span>
          )}
          <small>{safeBooking.ticketId}</small>
        </div>
      </div>
      <div className="ticket-status">
        <span className="status upcoming">{safeBooking.paymentStatus}</span>
        <span className="muted">Amount: ${safeBooking.amount}</span>
      </div>
      <div className="ticket-body">
        <div>
          <p className="label">Passenger</p>
          <p>{safeBooking.name}</p>
        </div>
        <div>
          <p className="label">Route</p>
          <p>
            {safeBooking.from} → {safeBooking.to}
          </p>
        </div>
        <div>
          <p className="label">Date & Time</p>
          <p>{safeBooking.dateTime}</p>
        </div>
        <div>
          <p className="label">Seat(s)</p>
          <p>{safeBooking.seats.join(', ') || '—'}</p>
        </div>
        <div>
          <p className="label">Operator</p>
          <p>{safeBooking.company}</p>
        </div>
        <div>
          <p className="label">Bus Type</p>
          <p>{safeBooking.busType}</p>
        </div>
        <div>
          <p className="label">Terminal</p>
          <p>{safeBooking.terminal}</p>
        </div>
        <div>
          <p className="label">Gate</p>
          <p>{safeBooking.gate}</p>
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
        <p className="muted">{safeBooking.policy}</p>
      </div>
      <div className="ticket-note">
        <p className="label">Support</p>
        <p className="muted">
          {safeBooking.support
            ? `Call ${safeBooking.support} for assistance.`
            : 'Support contact unavailable.'}
        </p>
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
