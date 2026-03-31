/**
 * Manage Schedules Page
 * Add, edit, and delete bus schedules
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/ManagementPage.css';

const Schedules = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [schedules, setSchedules] = useState(data.schedules || []);
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    routeId: '',
    busId: '',
    departureDate: '',
    departureTime: '',
    estimatedArrivalTime: '',
    ticketPrice: '',
    status: 'Active'
  });

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  const handleOpenModal = (schedule = null) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData({
        routeId: schedule.routeId,
        busId: schedule.busId,
        departureDate: schedule.departureDate,
        departureTime: schedule.departureTime,
        estimatedArrivalTime: schedule.estimatedArrivalTime,
        ticketPrice: schedule.ticketPrice,
        status: schedule.status
      });
    } else {
      setEditingSchedule(null);
      setFormData({
        routeId: '',
        busId: '',
        departureDate: '',
        departureTime: '',
        estimatedArrivalTime: '',
        ticketPrice: '',
        status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSchedule(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'routeId' || name === 'busId' || name === 'ticketPrice' 
        ? parseInt(value) || value 
        : value
    }));
  };

  const handleSaveSchedule = () => {
    if (!formData.routeId || !formData.busId || !formData.departureDate || !formData.ticketPrice) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedSchedules;
    if (editingSchedule) {
      updatedSchedules = schedules.map(schedule =>
        schedule.id === editingSchedule.id
          ? {
              ...schedule,
              routeId: parseInt(formData.routeId),
              busId: parseInt(formData.busId),
              departureDate: formData.departureDate,
              departureTime: formData.departureTime,
              estimatedArrivalTime: formData.estimatedArrivalTime,
              ticketPrice: parseInt(formData.ticketPrice),
              status: formData.status
            }
          : schedule
      );
    } else {
      const newSchedule = {
        id: Math.max(...schedules.map(s => s.id), 0) + 1,
        routeId: parseInt(formData.routeId),
        busId: parseInt(formData.busId),
        departureDate: formData.departureDate,
        departureTime: formData.departureTime,
        estimatedArrivalTime: formData.estimatedArrivalTime,
        ticketPrice: parseInt(formData.ticketPrice),
        bookedSeats: 0,
        totalSeats: 45,
        status: formData.status
      };
      updatedSchedules = [...schedules, newSchedule];
    }

    setSchedules(updatedSchedules);
    const updatedData = { ...data, schedules: updatedSchedules };
    setData(updatedData);
    updateAppData(updatedData);
    handleCloseModal();
  };

  const handleDeleteSchedule = (schedule) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      const updatedSchedules = schedules.filter(s => s.id !== schedule.id);
      setSchedules(updatedSchedules);
      const updatedData = { ...data, schedules: updatedSchedules };
      setData(updatedData);
      updateAppData(updatedData);
    }
  };

  const getRouteName = (routeId) => {
    const route = data.routes.find(r => r.id === routeId);
    return route ? route.routeName : `Route ${routeId}`;
  };

  const getBusNumber = (busId) => {
    const bus = data.buses.find(b => b.id === busId);
    return bus ? bus.busNumber : `Bus ${busId}`;
  };

  const columns = [
    { key: 'routeId', label: 'Route', width: '150px', render: (value) => getRouteName(value) },
    { key: 'busId', label: 'Bus', width: '120px', render: (value) => getBusNumber(value) },
    { key: 'departureDate', label: 'Departure Date', width: '120px' },
    { key: 'departureTime', label: 'Departure Time', width: '120px' },
    { key: 'ticketPrice', label: 'Price', width: '100px', render: (value) => `$${value}` },
    { key: 'status', label: 'Status', width: '100px', render: (value) => (
      <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>
    )}
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="management-container">
          <div className="page-header">
            <h2 className="page-title">Manage Schedules</h2>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add New Schedule
            </button>
          </div>

          <DataTable 
            columns={columns}
            data={schedules}
            onEdit={() => handleOpenModal(arguments[0])}
            onDelete={handleDeleteSchedule}
          />

          <Modal 
            isOpen={showModal}
            title={editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
            onClose={handleCloseModal}
            onConfirm={handleSaveSchedule}
            confirmText={editingSchedule ? 'Update Schedule' : 'Add Schedule'}
          >
            <form className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Route *</label>
                  <select name="routeId" value={formData.routeId} onChange={handleFormChange}>
                    <option value="">Select Route</option>
                    {data.routes.map(route => (
                      <option key={route.id} value={route.id}>
                        {route.routeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Bus *</label>
                  <select name="busId" value={formData.busId} onChange={handleFormChange}>
                    <option value="">Select Bus</option>
                    {data.buses.map(bus => (
                      <option key={bus.id} value={bus.id}>
                        {bus.busNumber} ({bus.type})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Departure Date *</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Departure Time</label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Arrival Time</label>
                  <input
                    type="time"
                    name="estimatedArrivalTime"
                    value={formData.estimatedArrivalTime}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ticket Price * ($)</label>
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleFormChange}
                    placeholder="e.g., 500"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
