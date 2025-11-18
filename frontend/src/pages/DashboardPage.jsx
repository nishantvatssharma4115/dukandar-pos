import { useAuth } from '../context/AuthContext.jsx';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const profileName = user?.name || 'DukanDar merchant';

  return (
    <main className="dashboard">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <p className="eyebrow">Kirana control room</p>
          <h1>You're synced, {profileName.split(' ')[0]}.</h1>
          <p>
            Review your secure store credentials, automate GST billing hooks, and keep inventory, credit,
            and staff access in harmony with DukanDar.
          </p>
        </header>

        <section className="dashboard-grid">
          <article className="card highlight">
            <h2>Account identity</h2>
            <div className="info">
              <p>
                <strong>Name</strong>
                <span>{profileName}</span>
              </p>
              <p>
                <strong>Email</strong>
                <span>{user?.email || 'Not provided'}</span>
              </p>
              <p>
                <strong>User ID</strong>
                <span>{user?._id || '---'}</span>
              </p>
            </div>
          </article>

          <article className="card">
            <h2>Session controls</h2>
            <p>Protect your POS access by signing out of shared devices after every shift.</p>
            <div className="actions">
              <button type="button" className="muted" onClick={logout}>
                Logout
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;

