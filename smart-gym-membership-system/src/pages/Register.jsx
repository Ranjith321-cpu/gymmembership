import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth.js'

export function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const ageNum = Number(age)
    if (age && (ageNum < 1 || ageNum > 120)) {
      setError('Please enter a valid age (1–120).')
      return
    }

    try {
      register({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        age: age.trim(),
        gender: gender.trim(),
        password,
      })
      navigate('/member-login', { replace: true })
    } catch (err) {
      setError(err?.message ?? 'Registration failed.')
    }
  }

  return (
    <div>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Create account</h1>
          <p className="pageSub">Join Smart Gym and start tracking your progress.</p>
        </div>
      </div>

      {error ? <div className="errorBox">{error}</div> : null}

      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <div className="labelRow">
            <div className="label">Full Name</div>
          </div>
          <input
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Email</div>
          </div>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Phone Number</div>
          </div>
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Age</div>
          </div>
          <input
            className="input"
            type="number"
            min={1}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Gender</div>
          </div>
          <select
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Password</div>
            <div className="hint">Min 6 characters</div>
          </div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <div className="label">Confirm Password</div>
          </div>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <div className="btnRow">
          <button className="btn primary" type="submit">
            Register
          </button>
          <Link className="btn secondary" to="/member-login">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}
