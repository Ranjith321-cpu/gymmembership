import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth.js'
import { IconMenu, IconLogout } from './Icons.jsx'

export function Navbar({ user, sidebarOpen, onToggleSidebar }) {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="navBar">
      <div className="navLeft">
        <button className="iconBtn" onClick={onToggleSidebar} aria-pressed={sidebarOpen}>
          <IconMenu aria-hidden="true" />
          <span className="srOnly">Toggle sidebar</span>
        </button>

        <Link
          to={user?.role === 'admin' ? '/admin-dashboard' : '/member-dashboard'}
          className="navBrand"
        >
          <span className="brandMark small">SG</span>
          <span className="navBrandText">Smart Gym</span>
        </Link>
      </div>

      <div className="navRight">
        <div className="userChip">
          <div className="avatar" aria-hidden="true">
            {String(user?.name ?? 'U')
              .slice(0, 1)
              .toUpperCase()}
          </div>
          <div className="userMeta">
            <div className="userName">{user?.name ?? 'User'}</div>
            <div className="userRole">{user?.role ?? 'member'}</div>
          </div>
        </div>

        <button className="btn secondary" onClick={handleLogout}>
          <IconLogout style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Logout
        </button>
      </div>
    </header>
  )
}

