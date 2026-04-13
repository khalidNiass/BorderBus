/**
 * Manage Customers Page
 * View customer list and booking history
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/ManagementPage.css';

const Customers = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [customers, setCustomers] = useState(data.customers || []);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const getCustomerBookings = (customerId) => {
    return data.bookings.filter(b => b.customerId === customerId);
  };

  const columns = [
    { key: 'name', label: 'Customer Name', width: '160px' },
    { key: 'email', label: 'Email', width: '180px' },
    { key: 'phone', label: 'Phone', width: '140px' },
    { key: 'totalBookings', label: 'Total Bookings', width: '120px' },
    { key: 'totalSpent', label: 'Total Spent', width: '120px', render: (value) => `$${value}` },
    { key: 'registrationDate', label: 'Joined', width: '120px' }
  ];

  return (
    <DashboardLayout>
      <div className="management-container">
          <div className="page-header">
            <h2 className="page-title">Customers Management</h2>
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DataTable 
            columns={columns}
            data={filteredCustomers}
            onEdit={handleViewDetails}
            onDelete={() => {}}
            actions={true}
          />

          <Modal 
            isOpen={showDetailModal}
            title="Customer Details"
            onClose={() => setShowDetailModal(false)}
            confirmText="Close"
            onConfirm={() => setShowDetailModal(false)}
          >
            {selectedCustomer && (
              <div className="customer-details">
                <div className="detail-section">
                  <h4>Personal Information</h4>
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p><strong>Joined:</strong> {selectedCustomer.registrationDate}</p>
                </div>

                <div className="detail-section">
                  <h4>Booking Statistics</h4>
                  <p><strong>Total Bookings:</strong> {selectedCustomer.totalBookings}</p>
                  <p><strong>Total Amount Spent:</strong> ${selectedCustomer.totalSpent}</p>
                  <p><strong>Average Booking Value:</strong> ${Math.round(selectedCustomer.totalSpent / selectedCustomer.totalBookings)}</p>
                  <p><strong>Preferred Bus Type:</strong> {selectedCustomer.preferredBusType}</p>
                </div>

                <div className="detail-section">
                  <h4>Booking History</h4>
                  {getCustomerBookings(selectedCustomer.id).length > 0 ? (
                    <div className="booking-list">
                      {getCustomerBookings(selectedCustomer.id).map(booking => (
                        <div key={booking.id} className="booking-item">
                          <span className="booking-id">{booking.id}</span>
                          <span className="booking-amount">${booking.totalAmount}</span>
                          <span className={`booking-status status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                          <span className="booking-date">{booking.bookingDate}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No bookings found</p>
                  )}
                </div>
              </div>
            )}
          </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
