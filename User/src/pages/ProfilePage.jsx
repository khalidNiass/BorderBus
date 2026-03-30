import Profile from '../components/Profile'

function ProfilePage() {
  const user = {
    name: 'Khalid Niass',
    email: 'khalid@email.com',
    initials: 'KN',
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Profile</h1>
        <p className="muted">Manage your personal details.</p>
      </header>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
