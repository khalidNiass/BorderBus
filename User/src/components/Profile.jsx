import { useEffect, useMemo, useState } from 'react'

function Profile({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
    birthdate: user.birthdate || '',
  })
  const [avatarUrl, setAvatarUrl] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)
  const [status, setStatus] = useState('')

  const initials = useMemo(() => {
    if (form.name) {
      return form.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    }
    return user.initials
  }, [form.name, user.initials])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('borderbus.profile')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored)
      setForm((prev) => ({ ...prev, ...parsed }))
      if (parsed.avatarUrl) setAvatarUrl(parsed.avatarUrl)
    } catch (error) {
      // ignore invalid storage
    }
  }, [])

  const handleSave = () => {
    const payload = { ...form, avatarUrl }
    window.localStorage.setItem('borderbus.profile', JSON.stringify(payload))
    setStatus('Profile updated.')
  }

  return (
    <div className="profile-grid">
      <div className="card">
        <div className="profile-header">
          <div className="avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" />
            ) : (
              initials
            )}
          </div>
          <div>
            <h3>{form.name}</h3>
            <p className="muted">{form.email}</p>
            <label className="avatar-upload">
              Change photo
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>
        </div>

        <div className="profile-section">
          <h4>Personal Information</h4>
          <div className="form-grid">
            <label>
              Full name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
              Email
              <input name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <label>
              Location
              <input name="location" value={form.location} onChange={handleChange} />
            </label>
            <label>
              Birthdate
              <input
                type="date"
                name="birthdate"
                value={form.birthdate}
                onChange={handleChange}
              />
            </label>
          </div>
          {status && <p className="status-text">{status}</p>}
          <button className="primary-button compact" onClick={handleSave}>
            Update Profile
          </button>
        </div>
      </div>

      <div className="card">
        <div className="profile-section">
          <h4>Account Stats</h4>
          <div className="profile-stats">
            <div>
              <p className="label">Trips</p>
              <strong>{user.stats?.trips || 12}</strong>
            </div>
            <div>
              <p className="label">Upcoming</p>
              <strong>{user.stats?.upcoming || 2}</strong>
            </div>
            <div>
              <p className="label">Loyalty</p>
              <strong>{user.stats?.points || '2,140'}</strong>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h4>Payment Method</h4>
          <div className="payment-card">
            <div>
              <p className="label">Card</p>
              <strong>Visa •••• 3481</strong>
            </div>
            <span className="badge">Primary</span>
          </div>
        </div>

        <div className="profile-section">
          <h4>Security</h4>
          <div className="toggle-row">
            <div>
              <strong>Two-factor authentication</strong>
              <p className="muted">Add extra protection to your account.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(event) => setTwoFactor(event.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="security-actions">
            <button className="ghost-button">Reset Password</button>
            <button className="danger-button">Log out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
