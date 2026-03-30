import { NavLink } from 'react-router-dom'

function BookingPayment() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Booking & Payment</h1>
        <p className="muted">Secure your seats and get your ticket instantly.</p>
      </header>

      <div className="split">
        <div className="card summary">
          <h3>Trip Summary</h3>
          <div className="summary-item">
            <span>Route</span>
            <strong>Dakar → Banjul</strong>
          </div>
          <div className="summary-item">
            <span>Date</span>
            <strong>03 Apr 2026</strong>
          </div>
          <div className="summary-item">
            <span>Bus Company</span>
            <strong>Atlantic Express</strong>
          </div>
          <div className="summary-item">
            <span>Seat(s)</span>
            <strong>3, 4</strong>
          </div>
          <div className="summary-item total">
            <span>Total Price</span>
            <strong>$64</strong>
          </div>
        </div>

        <div className="card">
          <h3>Passenger Details</h3>
          <div className="form-grid">
            <label>
              Full Name
              <input type="text" placeholder="Khalid Niass" />
            </label>
            <label>
              Email
              <input type="email" placeholder="khalid@email.com" />
            </label>
            <label>
              Phone Number
              <input type="tel" placeholder="+220 555 1234" />
            </label>
          </div>
          <h3>Payment</h3>
          <div className="form-grid">
            <label>
              Card Number
              <input type="text" placeholder="1234 5678 9012 3456" />
            </label>
            <label>
              Cardholder Name
              <input type="text" placeholder="Khalid Niass" />
            </label>
            <label>
              Expiry Date
              <input type="text" placeholder="MM/YY" />
            </label>
            <label>
              CVC
              <input type="text" placeholder="123" />
            </label>
          </div>
          <div className="radio-group">
            <label>
              <input type="radio" name="payment" defaultChecked />
              Pay with card
            </label>
            <label>
              <input type="radio" name="payment" />
              Pay on arrival
            </label>
          </div>
          <NavLink to="/ticket" className="primary-button full">
            Confirm Booking
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default BookingPayment
