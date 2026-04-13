/**
 * Company Profile Page
 * Mirrors the user-side profile styling with inline editing.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar
} from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { initialData } from '../data/mockData';
import companyCover from '../assets/company-cover.svg';
import '../styles/Profile.css';

const tabs = ['Overview', 'Trips', 'Reviews', 'Fleet', 'Media'];

const Profile = () => {
  const { appData, updateAppData } = useAuth();
  const [profile, setProfile] = useState(initialData.companyProfile);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (!appData) {
      updateAppData(initialData);
      setProfile(initialData.companyProfile);
      return;
    }

    if (appData.companyProfile) {
      setProfile(appData.companyProfile);
    }
  }, [appData, updateAppData]);

  const badges = useMemo(() => {
    const list = [];
    if (profile.rating >= 4.7) list.push('Top rated');
    if (profile.onTime >= 95) list.push('On-time leader');
    if (profile.name.toLowerCase().includes('premium')) list.push('Premium');
    return list;
  }, [profile]);

  if (!profile) return null;

  return (
    <DashboardLayout>
      <div className="company-profile-page">
        <div className="profile-actions">
          <Link className="ghost-button compact" to="/profile/edit">
            Edit Profile
          </Link>
        </div>

        <section className="company-hero">
          <div className="company-cover">
            <img src={companyCover} alt={profile.coverTitle} />
            <div className="company-avatar large">
              <span>{profile.initials}</span>
            </div>
          </div>
          <div className="company-info">
            <div className="company-title">
              <h1 className="company-name">{profile.name}</h1>
              <div className="rating-inline">
                <FaStar />
                <span>{profile.rating}</span>
                <span className="muted">({profile.ratingCount})</span>
              </div>
            </div>
            <p className="muted">{profile.about}</p>
            <div className="company-badges">
              {badges.map((badge) => (
                <span key={badge} className="mini-badge">
                  {badge}
                </span>
              ))}
            </div>
            <div className="company-meta-row">
              <span>
                <FaMapMarkerAlt />
                {profile.location}
              </span>
              <span>
                <FaPhoneAlt />
                {profile.phone}
              </span>
              <span>
                <FaEnvelope />
                {profile.email}
              </span>
            </div>
          </div>
        </section>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="tab-content">
            <div className="card">
              <h3>Company Overview</h3>
              <p className="muted">{profile.about}</p>
              <div className="company-stats">
                <div>
                  <p className="label">On-time</p>
                  <strong>{profile.onTime}%</strong>
                </div>
                <div>
                  <p className="label">Avg Price</p>
                  <strong>${profile.avgPrice}</strong>
                </div>
                <div>
                  <p className="label">Routes</p>
                  <strong>{profile.routes}</strong>
                </div>
                <div>
                  <p className="label">Support</p>
                  <strong>{profile.support}</strong>
                </div>
              </div>
              <div className="operator-detail-grid">
                <div>
                  <p className="label">Rating</p>
                  <strong>{profile.rating}</strong>
                </div>
                <div>
                  <p className="label">Destinations</p>
                  <strong>{profile.routes}</strong>
                </div>
                <div>
                  <p className="label">Trips</p>
                  <strong>{(profile.tripsCompleted ?? 0).toLocaleString()}</strong>
                </div>
                <div>
                  <p className="label">On-time</p>
                  <strong>{profile.onTime}%</strong>
                </div>
                <div>
                  <p className="label">Support</p>
                  <strong>{profile.support}</strong>
                </div>
              </div>
              <div className="route-highlights">
                <div className="card-title">Route highlights</div>
                <div className="route-highlight-grid">
                  {profile.routeHighlights.map((route, index) => (
                    <div key={`${route.from}-${route.to}-${index}`} className="route-highlight">
                      <div>
                        <strong>
                          {route.from} → {route.to}
                        </strong>
                        <p className="muted">{route.duration}</p>
                      </div>
                      <span className="badge">${route.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="contact-grid">
                <div>
                  <p className="label">Contact</p>
                  <strong>{profile.phone}</strong>
                </div>
                <div>
                  <p className="label">Email</p>
                  <strong>{profile.email}</strong>
                </div>
                <div>
                  <p className="label">Location</p>
                  <strong>{profile.location}</strong>
                </div>
                <div>
                  <p className="label">Address</p>
                  <strong>{profile.address}</strong>
                </div>
              </div>
              <div className="contact-actions">
                <button className="ghost-button compact" type="button">
                  <FaPhoneAlt /> Call
                </button>
                <button className="ghost-button compact" type="button">
                  <FaEnvelope /> Email
                </button>
                <button className="ghost-button compact" type="button">
                  <FaMapMarkerAlt /> Directions
                </button>
              </div>
              <div className="service-map">
                <div className="map-header">
                  <div>
                    <strong>Service area</strong>
                    <p className="muted">Primary corridors and terminals.</p>
                  </div>
                  <div className="map-tags">
                    {profile.serviceArea.map((tag) => (
                      <span key={tag} className="mini-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="map-canvas">
                  <div className="map-pin" style={{ top: '32%', left: '20%' }}></div>
                  <div className="map-pin" style={{ top: '48%', left: '46%' }}></div>
                  <div className="map-pin" style={{ top: '68%', left: '72%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && (
          <div className="tab-content">
            <div className="card">
              <h3>{activeTab}</h3>
              <p className="muted">Content editing for this section is coming next.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
