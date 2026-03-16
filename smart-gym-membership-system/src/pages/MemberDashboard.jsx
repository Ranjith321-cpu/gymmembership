import { Link } from 'react-router-dom'
import { getUser } from '../services/auth.js'
import { IconPlans, IconPayments, IconWorkout, IconAttendance } from '../components/Icons.jsx'

const MEMBERSHIP_PLAN = 'Gold'
const EXPIRY_DATE = '2026-12-31'
const TOTAL_VISITS = 48
const REMAINING_DAYS = 298
const TRAINER_NAME = 'Riya Sharma'

const quickButtons = [
  { to: '/membership-plans', label: 'View Plans', Icon: IconPlans },
  { to: '/payments', label: 'Payment History', Icon: IconPayments },
  { to: '/workout', label: 'Workout Schedule', Icon: IconWorkout },
  { to: '/attendance', label: 'Attendance', Icon: IconAttendance },
]

export function MemberDashboard() {
  const user = getUser()
  const name = user?.name ?? 'Member'
  const initial = name.slice(0, 1).toUpperCase()

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Member Dashboard</h1>
          <p className="pageSub">Welcome back — here’s your overview.</p>
        </div>
      </div>

      {/* 1. Profile Card */}
      <section className="dashCard profileCard">
        <div className="profileAvatar" aria-hidden="true">
          {initial}
        </div>
        <div className="profileInfo">
          <h2 className="profileName">{name}</h2>
          <p className="profileMeta">
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Membership Plan:</strong>{' '}
            {MEMBERSHIP_PLAN}
          </p>
          <p className="profileMeta">
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Expiry Date:</strong>{' '}
            {new Date(EXPIRY_DATE).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* 2. Quick Stats */}
      <section className="grid cols3" style={{ gap: 16 }}>
        <div className="dashCard statCard">
          <div className="statValue">{TOTAL_VISITS}</div>
          <div className="statLabel">Total Gym Visits</div>
        </div>
        <div className="dashCard statCard">
          <div className="statValue">{REMAINING_DAYS}</div>
          <div className="statLabel">Remaining Days</div>
        </div>
        <div className="dashCard statCard statCardText">
          <div className="statValue">{TRAINER_NAME}</div>
          <div className="statLabel">Trainer Assigned</div>
        </div>
      </section>

      {/* 3. Quick Buttons */}
      <section className="dashCard">
        <h2 className="cardTitle" style={{ marginBottom: 16 }}>
          Quick actions
        </h2>
        <div className="quickBtnGrid">
          {quickButtons.map((btn) => {
            const Icon = btn.Icon
            return (
              <Link key={btn.to} to={btn.to}>
                <span className="quickBtnIcon" aria-hidden="true">
                  <Icon />
                </span>
                {btn.label}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
