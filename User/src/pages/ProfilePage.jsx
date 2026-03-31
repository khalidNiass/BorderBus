import Profile from '../components/Profile'

function ProfilePage() {
  const user = {
    name: 'Khalid Niass',
    email: 'khalid@email.com',
    initials: 'KN',
    phone: '+221 555 0101',
    location: 'Dakar, Senegal',
    birthdate: '1995-06-14',
    stats: {
      trips: 18,
      upcoming: 2,
      points: '2,140',
    },
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
