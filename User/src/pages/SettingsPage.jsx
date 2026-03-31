function SettingsPage({ theme, onToggleTheme }) {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Settings</h1>
        <p className="muted">Customize your BorderBus experience.</p>
      </header>

      <div className="split">
        <div className="card">
          <h3>Change Password</h3>
          <div className="form-grid">
            <label>
              Current Password
              <input type="password" placeholder="••••••••" />
            </label>
            <label>
              New Password
              <input type="password" placeholder="Create a strong password" />
            </label>
            <label>
              Confirm Password
              <input type="password" placeholder="Repeat new password" />
            </label>
          </div>
          <button className="ghost-button">Update Password</button>
        </div>

        <div className="card">
          <h3>Preferences</h3>
          <div className="toggle-row">
            <div>
              <strong>Notifications</strong>
              <p className="muted">Get booking alerts via email.</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
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
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
