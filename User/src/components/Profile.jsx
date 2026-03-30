function Profile({ user }) {
  return (
    <div className="card">
      <div className="profile-header">
        <div className="avatar">{user.initials}</div>
        <div>
          <h3>{user.name}</h3>
          <p className="muted">{user.email}</p>
        </div>
      </div>
      <div className="stack">
        <button className="ghost-button full">Edit Profile</button>
        <button className="danger-button full">Logout</button>
      </div>
    </div>
  )
}

export default Profile
