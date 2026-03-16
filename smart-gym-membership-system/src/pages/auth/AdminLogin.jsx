import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../../services/auth.js'

export function AdminLogin() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      adminLogin({ username, password })
      navigate('/admin-dashboard', { replace: true })
    } catch (err) {
      setError(err?.message ?? 'Login failed.')
    }
  }

  return (
    <div className="authPage">
      <div className="authPageHeader">
        <h1 className="authPageTitle">Admin Login</h1>
        <p className="authPageSub">Sign in to manage the gym.</p>
      </div>

      {error ? <div className="errorBox">{error}</div> : null}

      <form className="form authForm" onSubmit={onSubmit}>
        <div className="field">
          <label className="label" htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
            autoComplete="username"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
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
        </div>
      </form>

      <p className="authPageFooter">
        Member? <Link to="/member-login" className="authPageLink">Member login</Link>
      </p>
    </div>
  )
}
