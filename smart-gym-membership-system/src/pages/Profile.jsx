import { useMemo, useState } from 'react'
import { getUser } from '../services/auth.js'

export function Profile() {
  const sessionUser = useMemo(() => getUser(), [])

  const [name, setName] = useState(sessionUser?.name ?? 'Member')
  const [email] = useState(sessionUser?.email ?? 'member@gym.com')
  const [phone, setPhone] = useState('+91 90000 00000')
  const [goal, setGoal] = useState('Build strength and improve cardio')
  const [saved, setSaved] = useState(false)

  function onSave(e) {
    e.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Profile</h1>
          <p className="pageSub">Update your details and training preferences.</p>
        </div>
      </div>

      {saved ? <div className="successBox">Profile saved (demo).</div> : null}

      <div className="grid cols2">
        <div className="card">
          <h2 className="cardTitle">Personal info</h2>
          <form className="form" onSubmit={onSave}>
            <div className="field">
              <div className="labelRow">
                <div className="label">Name</div>
              </div>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="field">
              <div className="labelRow">
                <div className="label">Email</div>
                <div className="hint">Read-only in demo</div>
              </div>
              <input className="input" value={email} disabled />
            </div>

            <div className="field">
              <div className="labelRow">
                <div className="label">Phone</div>
              </div>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="btnRow">
              <button className="btn primary" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h2 className="cardTitle">Fitness goal</h2>
          <form className="form" onSubmit={onSave}>
            <div className="field">
              <div className="labelRow">
                <div className="label">Goal</div>
                <div className="hint">What are you training for?</div>
              </div>
              <textarea
                className="input"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={6}
              />
            </div>
            <div className="btnRow">
              <button className="btn secondary" type="submit">
                Save goal
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <h2 className="cardTitle">Account</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Role: <strong style={{ color: 'rgba(255,255,255,0.92)' }}>{sessionUser?.role}</strong>
          <br />
          Joined: {sessionUser?.joinedAt ? new Date(sessionUser.joinedAt).toLocaleString() : '—'}
        </div>
      </div>
    </div>
  )
}

