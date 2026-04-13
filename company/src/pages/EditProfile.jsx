/**
 * Full-screen Edit Profile page for company side.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import '../styles/Profile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const { appData, updateAppData } = useAuth();
  const [draft, setDraft] = useState(initialData.companyProfile);

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setDraft(initialData.companyProfile);
      return;
    }

    if (appData.companyProfile) {
      setDraft(appData.companyProfile);
    }
  }, [appData, updateAppData]);

  const handleChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRouteChange = (index, field, value) => {
    setDraft((prev) => {
      const updated = [...prev.routeHighlights];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return { ...prev, routeHighlights: updated };
    });
  };

  const handleServiceAreaChange = (value) => {
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    setDraft((prev) => ({ ...prev, serviceArea: items }));
  };

  const handleSave = () => {
    const updatedData = {
      ...(appData || initialData),
      companyProfile: draft
    };
    updateAppData(updatedData);
    navigate('/profile');
  };

  return (
    <DashboardLayout>
      <div className="company-profile-page">
        <div className="profile-actions">
          <button className="ghost-button compact" type="button" onClick={() => navigate('/profile')}>
            Back to Profile
          </button>
          <div className="profile-action-group">
            <button className="ghost-button compact" type="button" onClick={() => navigate('/profile')}>
              Cancel
            </button>
            <button className="primary-button compact" type="button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>

        <div className="card profile-edit-card">
          <h3>Edit Profile</h3>
          <div className="form-group">
            <label>Cover Title</label>
            <input
              type="text"
              value={draft.coverTitle}
              onChange={(event) => handleChange('coverTitle', event.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Initials</label>
              <input
                type="text"
                value={draft.initials}
                onChange={(event) => handleChange('initials', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={draft.name}
                onChange={(event) => handleChange('name', event.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                value={draft.rating}
                onChange={(event) => handleChange('rating', Number(event.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Review Count</label>
              <input
                type="number"
                value={draft.ratingCount}
                onChange={(event) => handleChange('ratingCount', Number(event.target.value))}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Overview</label>
            <textarea
              rows="3"
              value={draft.about}
              onChange={(event) => handleChange('about', event.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={draft.location}
                onChange={(event) => handleChange('location', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={draft.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={draft.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>On-time %</label>
              <input
                type="number"
                value={draft.onTime}
                onChange={(event) => handleChange('onTime', Number(event.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Avg Price</label>
              <input
                type="number"
                value={draft.avgPrice}
                onChange={(event) => handleChange('avgPrice', Number(event.target.value))}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Routes</label>
              <input
                type="number"
                value={draft.routes}
                onChange={(event) => handleChange('routes', Number(event.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Support</label>
              <input
                type="text"
                value={draft.support}
                onChange={(event) => handleChange('support', event.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Trips Completed</label>
            <input
              type="number"
              value={draft.tripsCompleted}
              onChange={(event) => handleChange('tripsCompleted', Number(event.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Route highlights</label>
            {draft.routeHighlights.map((route, index) => (
              <div className="form-row" key={`${route.from}-${route.to}-${index}`}>
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    value={route.from}
                    onChange={(event) => handleRouteChange(index, 'from', event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    value={route.to}
                    onChange={(event) => handleRouteChange(index, 'to', event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={route.duration}
                    onChange={(event) => handleRouteChange(index, 'duration', event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={route.price}
                    onChange={(event) => handleRouteChange(index, 'price', Number(event.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={draft.address}
                onChange={(event) => handleChange('address', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Service area (comma separated)</label>
              <input
                type="text"
                value={draft.serviceArea.join(', ')}
                onChange={(event) => handleServiceAreaChange(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
