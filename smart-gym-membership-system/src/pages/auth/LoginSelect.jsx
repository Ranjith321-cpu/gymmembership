import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { IconProfile, IconDashboard } from '../../components/Icons.jsx'
import { getUser, isAuthenticated } from '../../services/auth.js'

const cards = [
  {
    title: 'Member Login',
    description: 'Sign in to manage your membership and workouts.',
    to: '/member-login',
    Icon: IconProfile,
  },
  {
    title: 'Admin Login',
    description: 'Sign in to manage the gym.',
    to: '/admin-login',
    Icon: IconDashboard,
  },
]

export function LoginSelect() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getUser()
      navigate(user?.role === 'admin' ? '/admin-dashboard' : '/member-dashboard', { replace: true })
    }
  }, [navigate])

  return (
    <div className="authShell loginSelectShell">
      <div className="loginSelectPage">
        <h1 className="loginSelectTitle">Smart Gym</h1>
        <p className="loginSelectSub">Choose how you want to sign in.</p>

        <div className="loginSelectGrid">
          {cards.map((card) => {
            const Icon = card.Icon
            return (
              <Link to={card.to} key={card.to} className="loginSelectCard">
                <span className="loginSelectCardIcon">
                  <Icon />
                </span>
                <h2 className="loginSelectCardTitle">{card.title}</h2>
                <p className="loginSelectCardDesc">{card.description}</p>
                <span className="btn primary loginSelectCardBtn">Continue</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
