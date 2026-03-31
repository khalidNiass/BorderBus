import { useEffect, useMemo, useState } from 'react'

function SettingsPage({ theme, onToggleTheme }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState('en-US')
  const [region, setRegion] = useState('West Africa')
  const [prefStatus, setPrefStatus] = useState('')
  const [prefSnapshot, setPrefSnapshot] = useState(null)

  useEffect(() => {
    const storedNotifications = window.localStorage.getItem(
      'borderbus.notifications',
    )
    const storedLanguage = window.localStorage.getItem('borderbus.language')
    const storedRegion = window.localStorage.getItem('borderbus.region')

    const next = {
      notificationsEnabled: storedNotifications
        ? storedNotifications === 'true'
        : true,
      language: storedLanguage || 'en-US',
      region: storedRegion || 'West Africa',
    }

    setNotificationsEnabled(next.notificationsEnabled)
    setLanguage(next.language)
    setRegion(next.region)
    setPrefSnapshot(next)
  }, [])

  const passwordChecks = useMemo(() => {
    const hasLength = newPassword.length >= 8
    const hasNumber = /\d/.test(newPassword)
    const hasSymbol = /[^A-Za-z0-9]/.test(newPassword)
    const matches = newPassword && newPassword === confirmPassword
    return { hasLength, hasNumber, hasSymbol, matches }
  }, [newPassword, confirmPassword])

  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    setPasswordMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('Please fill in all password fields.')
      return
    }
    if (!passwordChecks.hasLength || !passwordChecks.hasNumber || !passwordChecks.hasSymbol) {
      setPasswordMessage('Your new password does not meet the security rules.')
      return
    }
    if (!passwordChecks.matches) {
      setPasswordMessage('New password and confirmation do not match.')
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordMessage('Password updated successfully.')
  }

  const handleSavePreferences = () => {
    const payload = {
      notificationsEnabled,
      language,
      region,
    }
    window.localStorage.setItem(
      'borderbus.notifications',
      String(payload.notificationsEnabled),
    )
    window.localStorage.setItem('borderbus.language', payload.language)
    window.localStorage.setItem('borderbus.region', payload.region)
    setPrefSnapshot(payload)
    setPrefStatus('Preferences saved.')
  }

  const handleCancelPreferences = () => {
    if (!prefSnapshot) return
    setNotificationsEnabled(prefSnapshot.notificationsEnabled)
    setLanguage(prefSnapshot.language)
    setRegion(prefSnapshot.region)
    setPrefStatus('Changes discarded.')
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'This will permanently delete your account. Continue?',
    )
    if (!confirmed) return
    setPrefStatus('Account deletion requested. Our team will follow up.')
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Settings</h1>
        <p className="muted">Customize your BorderBus experience.</p>
      </header>

      <div className="split">
        <div className="card">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-grid">
              <label>
                Current Password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
              </label>
              <label>
                New Password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </label>
              <label>
                Confirm Password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </label>
            </div>
            <div className="password-hints">
              <p className={passwordChecks.hasLength ? 'muted' : 'warning-text'}>
                Minimum 8 characters
              </p>
              <p className={passwordChecks.hasNumber ? 'muted' : 'warning-text'}>
                Include at least one number
              </p>
              <p className={passwordChecks.hasSymbol ? 'muted' : 'warning-text'}>
                Include a symbol
              </p>
              <p className={passwordChecks.matches ? 'muted' : 'warning-text'}>
                New password matches confirmation
              </p>
            </div>
            {passwordMessage && <p className="status-text">{passwordMessage}</p>}
            <div className="form-actions">
              <button
                className="ghost-button"
                type="button"
                onClick={() => setShowPasswords((prev) => !prev)}
              >
                {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
              </button>
              <button className="primary-button compact" type="submit">
                Update Password
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3>Preferences</h3>
          <div className="toggle-row">
            <div>
              <strong>Notifications</strong>
              <p className="muted">Get booking alerts via email.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(event) => setNotificationsEnabled(event.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-row">
            <div>
              <strong>Dark Mode</strong>
              <p className="muted">Switch between light and dark themes.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={onToggleTheme}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="form-grid">
            <label>
              Language
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="fr-FR">Français</option>
                <option value="es-ES">Español</option>
              </select>
            </label>
            <label>
              Region
              <select value={region} onChange={(event) => setRegion(event.target.value)}>
                <option value="West Africa">West Africa</option>
                <option value="North Africa">North Africa</option>
                <option value="Central Africa">Central Africa</option>
                <option value="East Africa">East Africa</option>
              </select>
            </label>
          </div>
          {prefStatus && <p className="status-text">{prefStatus}</p>}
          <div className="form-actions">
            <button className="ghost-button" type="button" onClick={handleCancelPreferences}>
              Cancel Changes
            </button>
            <button className="primary-button compact" type="button" onClick={handleSavePreferences}>
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div className="split">
        <div className="card account-card">
          <h3>Account Info</h3>
          <div className="account-header">
            <div className="account-avatar">KN</div>
            <div className="account-meta">
              <span className="account-name">Khalid Niass</span>
              <span className="account-sub">khalid.niass@email.com</span>
              <div className="account-badges">
                <span className="account-badge">Verified</span>
                <span className="account-badge subtle">Premium</span>
              </div>
            </div>
          </div>
          <div className="account-grid">
            <div className="account-item">
              <p className="label">Phone</p>
              <strong>+221 555 0101</strong>
            </div>
            <div className="account-item">
              <p className="label">Member Since</p>
              <strong>Apr 2023</strong>
            </div>
            <div className="account-item">
              <p className="label">Home Terminal</p>
              <strong>Dakar Central</strong>
            </div>
            <div className="account-item">
              <p className="label">Loyalty</p>
              <strong>BorderMiles 2,140</strong>
            </div>
          </div>
        </div>

        <div className="card account-actions-card">
          <h3>Account Actions</h3>
          <p className="muted">
            Manage your session and security. You can sign out on all devices or
            request account deletion.
          </p>
          <div className="account-actions">
            <div className="account-action">
              <div>
                <strong>Sign Out</strong>
                <p className="muted">Log out of this device.</p>
              </div>
              <button className="ghost-button compact" type="button">
                Sign Out
              </button>
            </div>
            <div className="account-action">
              <div>
                <strong>Sign Out Everywhere</strong>
                <p className="muted">End sessions on all devices.</p>
              </div>
              <button className="ghost-button compact" type="button">
                Sign Out All
              </button>
            </div>
            <div className="account-action danger">
              <div>
                <strong>Delete Account</strong>
                <p className="muted">This action is permanent.</p>
              </div>
              <button
                className="danger-button compact"
                type="button"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
