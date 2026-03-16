import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../services/auth.js'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = useMemo(() => location.state?.from ?? null, [location.state])

  const [email, setEmail] = useState('member@gym.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const user = login({ email, password })
      const fallback = user.role === 'admin' ? '/admin-dashboard' : '/member-dashboard'
      navigate(from ?? fallback, { replace: true })
    } catch (err) {
      setError(err?.message ?? 'Login failed.')
    }
  }

  return (
    <div>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Welcome back</h1>
          <p className="pageSub">Sign in to manage your memberships and workouts.</p>
        </div>
      </div>

      {error ? <div className="errorBox">{error}</div> : null}

      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <div className="labelRow">
            <div className="label">Email</div>
            <div className="hint">Try `admin@gym.com` for admin</div>
          </div>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gym.com"
            required
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Password</div>
            <div className="hint">Demo accepts any password</div>
          </div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="btnRow">
          <button className="btn primary" type="submit">
            Login
          </button>
          <Link className="btn secondary" to="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  )
}

