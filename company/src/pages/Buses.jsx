/**
 * Manage Buses Page
 * Add, edit, and delete buses
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import DashboardLayout from '../components/DashboardLayout';
import { FaBus, FaCheckCircle, FaTools, FaUsers } from 'react-icons/fa';
import '../styles/ManagementPage.css';

const Buses = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [buses, setBuses] = useState(data.buses || []);
  const [showModal, setShowModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: '',
    type: 'AC',
    capacity: '',
    registrationNumber: '',
    manufacturingYear: new Date().getFullYear(),
    status: 'Active'
  });

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  const handleOpenModal = (bus = null) => {
    if (bus) {
      setEditingBus(bus);
      setFormData({
        busNumber: bus.busNumber,
        type: bus.type,
        capacity: bus.capacity,
        registrationNumber: bus.registrationNumber,
        manufacturingYear: bus.manufacturingYear,
        status: bus.status
      });
    } else {
      setEditingBus(null);
      setFormData({
        busNumber: '',
        type: 'AC',
        capacity: '',
        registrationNumber: '',
        manufacturingYear: new Date().getFullYear(),
        status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBus(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'manufacturingYear' ? parseInt(value) : value
    }));
  };

  const handleSaveBus = () => {
    if (!formData.busNumber || !formData.capacity || !formData.registrationNumber) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedBuses;
    if (editingBus) {
      updatedBuses = buses.map(bus =>
        bus.id === editingBus.id
          ? { ...bus, ...formData, totalSeats: formData.capacity }
          : bus
      );
    } else {
      const newBus = {
        id: Math.max(...buses.map(b => b.id), 0) + 1,
        ...formData,
        totalSeats: formData.capacity
      };
      updatedBuses = [...buses, newBus];
    }

    setBuses(updatedBuses);
    const updatedData = { ...data, buses: updatedBuses };
    setData(updatedData);
    updateAppData(updatedData);
    handleCloseModal();
  };

  const handleDeleteBus = (bus) => {
    if (window.confirm(`Are you sure you want to delete bus ${bus.busNumber}?`)) {
      const updatedBuses = buses.filter(b => b.id !== bus.id);
      setBuses(updatedBuses);
      const updatedData = { ...data, buses: updatedBuses };
      setData(updatedData);
      updateAppData(updatedData);
    }
  };

  const columns = [
    { key: 'busNumber', label: 'Bus Number', width: '120px' },
    { key: 'type', label: 'Type', width: '100px' },
    { key: 'capacity', label: 'Capacity', width: '100px' },
    { key: 'registrationNumber', label: 'Registration No.', width: '150px' },
    { key: 'manufacturingYear', label: 'Year', width: '80px' },
    { key: 'status', label: 'Status', width: '100px', render: (value) => (
      <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>
    )}
  ];

  const activeBuses = buses.filter(b => b.status === 'Active').length;
  const maintenanceBuses = buses.filter(b => b.status === 'Maintenance').length;
  const totalCapacity = buses.reduce((sum, b) => sum + (b.capacity || 0), 0);

  return (
    <DashboardLayout>
      <div className="management-container">
          <div className="page-header">
            <div className="header-content">
              <h2 className="page-title">Manage Buses</h2>
              <p className="page-subtitle">Monitor and manage your fleet operations</p>
            </div>
            <button className="btn btn-primary btn-add-new" onClick={() => handleOpenModal()}>
              <span className="btn-icon-plus">+</span> Add New Bus
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <FaBus className="stat-icon" />
                <h3>Total Buses</h3>
              </div>
              <div className="stat-value">{buses.length}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <FaCheckCircle className="stat-icon" />
                <h3>Active</h3>
              </div>
              <div className="stat-value stat-active">{activeBuses}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <FaTools className="stat-icon" />
                <h3>In Maintenance</h3>
              </div>
              <div className="stat-value stat-maintenance">{maintenanceBuses}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <FaUsers className="stat-icon" />
                <h3>Total Capacity</h3>
              </div>
              <div className="stat-value">{totalCapacity}</div>
            </div>
          </div>

          <div className="table-section">
            <div className="table-header">
              <h3>Fleet Details</h3>
              <p className="table-subtitle">Complete list of all buses in your fleet</p>
            </div>

            <DataTable 
              columns={columns}
              data={buses}
              onEdit={handleOpenModal}
              onDelete={handleDeleteBus}
            />
          </div>

          <Modal 
            isOpen={showModal}
            title={editingBus ? 'Edit Bus' : 'Add New Bus'}
            onClose={handleCloseModal}
            onConfirm={handleSaveBus}
            confirmText={editingBus ? 'Update Bus' : 'Add Bus'}
          >
            <form className="modal-form">
              <div className="form-group">
                <label>Bus Number <span className="required">*</span></label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleFormChange}
                  placeholder="e.g., DB-001"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bus Type <span className="required">*</span></label>
                  <select name="type" value={formData.type} onChange={handleFormChange} required>
                    <option value="AC">AC (Air-Conditioned)</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Sleeper">Sleeper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Capacity <span className="required">*</span></label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    placeholder="e.g., 45"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Registration Number <span className="required">*</span></label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleFormChange}
                  placeholder="e.g., REG-BUS-001"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Manufacturing Year</label>
                  <input
                    type="number"
                    name="manufacturingYear"
                    value={formData.manufacturingYear}
                    onChange={handleFormChange}
                    placeholder="2024"
                    min="1990"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Buses;
