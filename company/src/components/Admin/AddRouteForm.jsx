/**
 * Add Route Form Component
 * Premium UI with Animated Lucide Icons and Framer Motion
 * Creates routes with Origin, Destination, Price structure
 */

import { useState } from 'react';
import { MapPin, DollarSign, Road, Clock, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import './AddRouteForm.css';

function AddRouteForm({ onAdd, onCancel, editingRoute = null }) {
  const [formData, setFormData] = useState({
    origin: editingRoute?.departureLocation || '',
    destination: editingRoute?.destinationLocation || '',
    price: editingRoute?.price || '',
    duration: editingRoute?.travelDuration || '',
    distance: editingRoute?.distance || '',
    stops: editingRoute?.stops?.join(', ') || '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    const routeData = {
      departureLocation: formData.origin,
      destinationLocation: formData.destination,
      price: parseFloat(formData.price),
      travelDuration: formData.duration,
      distance: parseInt(formData.distance) || 0,
      stops: formData.stops
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== ''),
      from: formData.origin,
      to: formData.destination,
    };

    // Simulate API call
    setTimeout(() => {
      onAdd(routeData);
      setIsLoading(false);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <motion.div
      className="add-route-form-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <form onSubmit={handleSubmit} className="add-route-form">
        <div className="form-grid">
          {/* Origin Field */}
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <label htmlFor="origin">From</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <MapPin size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Departure city"
                className={errors.origin ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.origin && (
              <motion.span
                className="error-text"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.origin}
              </motion.span>
            )}
          </motion.div>

          {/* Destination Field */}
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="destination">To</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <MapPin size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Destination city"
                className={errors.destination ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.destination && (
              <motion.span
                className="error-text"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.destination}
              </motion.span>
            )}
          </motion.div>

          {/* Price Field */}
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label htmlFor="price">Price</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <DollarSign size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Base fare"
                step="0.01"
                min="0"
                className={errors.price ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.price && (
              <motion.span
                className="error-text"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.price}
              </motion.span>
            )}
          </motion.div>

          {/* Duration Field */}
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="duration">Duration</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Clock size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 4h 30m"
                className={errors.duration ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.duration && (
              <motion.span
                className="error-text"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.duration}
              </motion.span>
            )}
          </motion.div>

          {/* Distance Field */}
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label htmlFor="distance">Distance</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Road size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <input
                type="number"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="km"
                disabled={isLoading}
              />
            </div>
          </motion.div>

          {/* Stops Field */}
          <motion.div
            className="form-group full-width"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="stops">Stops</label>
            <div className="form-field">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <MapPin size={18} strokeWidth={2} className="icon-accent" />
              </motion.div>
              <textarea
                id="stops"
                name="stops"
                value={formData.stops}
                onChange={handleChange}
                placeholder="Comma-separated stops"
                rows="2"
                disabled={isLoading}
              />
            </div>
          </motion.div>
        </div>

        {/* Form Actions */}
        <motion.div
          className="form-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <motion.button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 10px 30px rgba(29, 155, 240, 0.3)' } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10,
              rotate: isSubmitting ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0 }
            }}
          >
            {isLoading ? (
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader size={18} strokeWidth={2} />
                <span>{editingRoute ? 'Updating...' : 'Publishing...'}</span>
              </motion.div>
            ) : (
              editingRoute ? 'Update Route' : 'Publish Route'
            )}
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            Cancel
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default AddRouteForm;
