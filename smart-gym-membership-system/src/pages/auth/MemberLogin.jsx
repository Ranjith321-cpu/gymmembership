import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../../services/auth.js'

export function MemberLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? '/member-dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const user = login({ email, password })
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err?.message ?? 'Login failed.')
    }
  }

  return (
    <div className="authPage">
      <div className="authPageHeader">
        <h1 className="authPageTitle">Member Login</h1>
        <p className="authPageSub">Sign in to manage your membership and workouts.</p>
      </div>

      {error ? <div className="errorBox">{error}</div> : null}

      <form className="form authForm" onSubmit={onSubmit}>
        <div className="field">
          <label className="label" htmlFor="member-email">Email</label>
          <input
            id="member-email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="member-password">Password</label>
          <input
            id="member-password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="btnRow">
          <button className="btn primary btnBlock" type="submit">
            Login
          </button>
          <Link className="btn secondary btnBlock" to="/register">
            Create account
          </Link>
        </div>
      </form>

      <p className="authPageFooter">
        Admin? <Link to="/admin-login" className="authPageLink">Login here</Link>
      </p>
    </div>
  )
}
