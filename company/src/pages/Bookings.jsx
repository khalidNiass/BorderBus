/**
 * Manage Bookings Page
 * View, accept, and cancel bookings
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/ManagementPage.css';

const Bookings = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [bookings, setBookings] = useState(data.bookings || []);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  const filteredBookings = filterStatus === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: newStatus }
        : booking
    );
    setBookings(updatedBookings);
    const updatedData = { ...data, bookings: updatedBookings };
    setData(updatedData);
    updateAppData(updatedData);

    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const columns = [
    { key: 'id', label: 'Booking ID', width: '120px' },
    { key: 'customerName', label: 'Customer', width: '150px' },
    { key: 'numberOfSeats', label: 'Seats', width: '80px' },
    { key: 'totalAmount', label: 'Amount', width: '100px', render: (value) => `$${value}` },
    { 
      key: 'status', 
      label: 'Status', 
      width: '120px', 
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>
      )
    },
    { key: 'paymentStatus', label: 'Payment', width: '100px' },
    { key: 'bookingDate', label: 'Date', width: '120px' }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="management-container">
          <div className="page-header">
            <h2 className="page-title">Bookings Management</h2>
            <div className="filter-group">
              <select 
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Bookings</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <DataTable 
            columns={columns}
            data={filteredBookings}
            onEdit={handleViewDetails}
            onDelete={() => {}}
            actions={true}
          />

          <Modal 
            isOpen={showDetailModal}
            title="Booking Details"
            onClose={() => setShowDetailModal(false)}
            confirmText="Close"
            onConfirm={() => setShowDetailModal(false)}
          >
            {selectedBooking && (
              <div className="booking-details">
                <div className="detail-section">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                  <p><strong>Phone:</strong> {selectedBooking.customerPhone}</p>
                </div>

                <div className="detail-section">
                  <h4>Booking Information</h4>
                  <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
                  <p><strong>Number of Seats:</strong> {selectedBooking.numberOfSeats}</p>
                  <p><strong>Seat Numbers:</strong> {selectedBooking.seatNumbers.join(', ')}</p>
                  <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount}</p>
                  <p><strong>Booking Date:</strong> {selectedBooking.bookingDate}</p>
                </div>

                <div className="detail-section">
                  <h4>Payment & Status</h4>
                  <p><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</p>
                  <p><strong>Current Status:</strong> {selectedBooking.status}</p>
                </div>

                <div className="action-section">
                  <h4>Update Booking Status</h4>
                  <div className="status-buttons">
                    {selectedBooking.status !== 'Confirmed' && (
                      <button 
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'Confirmed')}
                      >
                        ✓ Confirm Booking
                      </button>
                    )}
                    {selectedBooking.status !== 'Pending' && selectedBooking.status !== 'Cancelled' && (
                      <button 
                        className="btn btn-warning"
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'Pending')}
                      >
                        ⏸️ Mark as Pending
                      </button>
                    )}
                    {selectedBooking.status !== 'Cancelled' && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'Cancelled')}
                      >
                        ✕ Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
