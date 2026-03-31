/**
 * Manage Buses Page
 * Add, edit, and delete buses
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
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

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="management-container">
          <div className="page-header">
            <h2 className="page-title">Manage Buses</h2>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add New Bus
            </button>
          </div>

          <DataTable 
            columns={columns}
            data={buses}
            onEdit={() => handleOpenModal(arguments[0])}
            onDelete={handleDeleteBus}
          />

          <Modal 
            isOpen={showModal}
            title={editingBus ? 'Edit Bus' : 'Add New Bus'}
            onClose={handleCloseModal}
            onConfirm={handleSaveBus}
            confirmText={editingBus ? 'Update Bus' : 'Add Bus'}
          >
            <form className="modal-form">
              <div className="form-group">
                <label>Bus Number *</label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleFormChange}
                  placeholder="e.g., DB-001"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bus Type *</label>
                  <select name="type" value={formData.type} onChange={handleFormChange}>
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Sleeper">Sleeper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    placeholder="e.g., 45"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleFormChange}
                  placeholder="e.g., REG-BUS-001"
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
      </div>
    </div>
  );
};

export default Buses;
