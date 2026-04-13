/**
 * Manage Routes Page
 * Add, edit, and delete routes
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/ManagementPage.css';

const Routes = () => {
  const { appData, updateAppData } = useAuth();
  const [data, setData] = useState(appData || initialData);
  const [routes, setRoutes] = useState(data.routes || []);
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    departureLocation: '',
    destinationLocation: '',
    from: '',
    to: '',
    price: '',
    travelDuration: '',
    distance: '',
    stops: ''
  });

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setData(initialData);
    }
  }, [appData, updateAppData]);

  const handleOpenModal = (route = null) => {
    if (route) {
      setEditingRoute(route);
      setFormData({
        routeName: route.routeName,
        departureLocation: route.departureLocation,
        destinationLocation: route.destinationLocation,
        from: route.from || route.departureLocation.split(' ')[0],
        to: route.to || route.destinationLocation.split(' ')[0],
        price: route.price || '',
        travelDuration: route.travelDuration,
        distance: route.distance,
        stops: route.stops.join(', ')
      });
    } else {
      setEditingRoute(null);
      setFormData({
        routeName: '',
        departureLocation: '',
        destinationLocation: '',
        from: '',
        to: '',
        price: '',
        travelDuration: '',
        distance: '',
        stops: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoute(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveRoute = () => {
    if (!formData.routeName || !formData.departureLocation || !formData.destinationLocation || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const stops = formData.stops
      .split(',')
      .map(stop => stop.trim())
      .filter(stop => stop !== '');

    let updatedRoutes;
    if (editingRoute) {
      updatedRoutes = routes.map(route =>
        route.id === editingRoute.id
          ? {
              ...route,
              routeName: formData.routeName,
              departureLocation: formData.departureLocation,
              destinationLocation: formData.destinationLocation,
              from: formData.from,
              to: formData.to,
              price: parseFloat(formData.price),
              travelDuration: formData.travelDuration,
              distance: parseInt(formData.distance),
              stops: stops
            }
          : route
      );
    } else {
      const newRoute = {
        id: Math.max(...routes.map(r => r.id), 0) + 1,
        routeName: formData.routeName,
        departureLocation: formData.departureLocation,
        destinationLocation: formData.destinationLocation,
        from: formData.from,
        to: formData.to,
        price: parseFloat(formData.price),
        travelDuration: formData.travelDuration,
        distance: parseInt(formData.distance),
        stops: stops,
        createdDate: new Date().toISOString().split('T')[0]
      };
      updatedRoutes = [...routes, newRoute];
    }

    setRoutes(updatedRoutes);
    const updatedData = { ...data, routes: updatedRoutes };
    setData(updatedData);
    updateAppData(updatedData);
    handleCloseModal();
  };

  const handleDeleteRoute = (route) => {
    if (window.confirm(`Are you sure you want to delete route ${route.routeName}?`)) {
      const updatedRoutes = routes.filter(r => r.id !== route.id);
      setRoutes(updatedRoutes);
      const updatedData = { ...data, routes: updatedRoutes };
      setData(updatedData);
      updateAppData(updatedData);
    }
  };

  const columns = [
    { key: 'routeName', label: 'Route Name', width: '150px' },
    { key: 'departureLocation', label: 'Departure', width: '150px' },
    { key: 'destinationLocation', label: 'Destination', width: '150px' },
    { key: 'travelDuration', label: 'Duration', width: '120px' },
    { key: 'distance', label: 'Distance (km)', width: '120px' },
    { key: 'stops', label: 'Stops', width: '150px', render: (stops) => stops.join(', ') }
  ];

  return (
    <DashboardLayout>
      <div className="management-container">
          <div className="page-header">
            <h2 className="page-title">Manage Routes</h2>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add New Route
            </button>
          </div>

          <DataTable 
            columns={columns}
            data={routes}
            onEdit={handleOpenModal}
            onDelete={handleDeleteRoute}
          />

          <Modal 
            isOpen={showModal}
            title={editingRoute ? 'Edit Route' : 'Add New Route'}
            onClose={handleCloseModal}
            onConfirm={handleSaveRoute}
            confirmText={editingRoute ? 'Update Route' : 'Add Route'}
          >
            <form className="modal-form">
              <div className="form-group">
                <label>Route Name *</label>
                <input
                  type="text"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleFormChange}
                  placeholder="e.g., City A to City B"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Departure Location *</label>
                  <input
                    type="text"
                    name="departureLocation"
                    value={formData.departureLocation}
                    onChange={handleFormChange}
                    placeholder="e.g., City A Central Station"
                  />
                </div>

                <div className="form-group">
                  <label>Destination Location *</label>
                  <input
                    type="text"
                    name="destinationLocation"
                    value={formData.destinationLocation}
                    onChange={handleFormChange}
                    placeholder="e.g., City B Bus Depot"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Travel Duration</label>
                  <input
                    type="text"
                    name="travelDuration"
                    value={formData.travelDuration}
                    onChange={handleFormChange}
                    placeholder="e.g., 4 hours 30 minutes"
                  />
                </div>

                <div className="form-group">
                  <label>Price per Ticket *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g., 500"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Origin (Short form)</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleFormChange}
                    placeholder="e.g., City A"
                  />
                </div>

                <div className="form-group">
                  <label>Destination (Short form)</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleFormChange}
                    placeholder="e.g., City B"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Distance (km)</label>
                  <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleFormChange}
                    placeholder="e.g., 320"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Stops (comma-separated)</label>
                <textarea
                  name="stops"
                  value={formData.stops}
                  onChange={handleFormChange}
                  placeholder="e.g., Station 1, Station 2, Station 3"
                  rows="3"
                />
              </div>
            </form>
          </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Routes;
