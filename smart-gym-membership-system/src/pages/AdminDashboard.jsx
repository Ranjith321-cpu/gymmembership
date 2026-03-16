import { useMemo } from 'react'
import { getUser } from '../services/auth.js'
import { IconMembers, IconPlans, IconTrainers, IconReports } from '../components/Icons.jsx'

const STATS = {
  totalMembers: 312,
  activeMemberships: 284,
  expiredMemberships: 28,
  monthlyRevenue: 4.72,
}

const REVENUE_CHART_DATA = [
  { month: 'Sep', value: 3.8 },
  { month: 'Oct', value: 4.1 },
  { month: 'Nov', value: 4.0 },
  { month: 'Dec', value: 4.4 },
  { month: 'Jan', value: 4.2 },
  { month: 'Feb', value: 4.72 },
]

const MANAGEMENT_ACTIONS = [
  { id: 'members', label: 'Manage Members', Icon: IconMembers },
  { id: 'plans', label: 'Manage Plans', Icon: IconPlans },
  { id: 'trainers', label: 'Manage Trainers', Icon: IconTrainers },
  { id: 'reports', label: 'View Reports', Icon: IconReports },
]

function formatRevenue(lakhs) {
  return `₹ ${lakhs}L`
}

export function AdminDashboard() {
  const user = useMemo(() => getUser(), [])

  const chartMax = useMemo(
    () => Math.max(...REVENUE_CHART_DATA.map((d) => d.value), 1),
    [],
  )

  function handleAction(id) {
    // Demo: in a real app these would navigate or open modals
    console.log('Admin action:', id)
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Admin Dashboard</h1>
          <p className="pageSub">Welcome, {user?.name ?? 'Admin'}. Overview of your gym.</p>
        </div>
      </div>

      {/* 1. Stat cards: Total Members, Active, Expired, Monthly Revenue */}
      <div className="grid adminStatsGrid">
        <div className="dashCard statCard">
          <div className="statValue">{STATS.totalMembers}</div>
          <div className="statLabel">Total Members</div>
        </div>
        <div className="dashCard statCard">
          <div className="statValue">{STATS.activeMemberships}</div>
          <div className="statLabel">Active Memberships</div>
        </div>
        <div className="dashCard statCard">
          <div className="statValue">{STATS.expiredMemberships}</div>
          <div className="statLabel">Expired Memberships</div>
        </div>
        <div className="dashCard statCard">
          <div className="statValue">{formatRevenue(STATS.monthlyRevenue)}</div>
          <div className="statLabel">Monthly Revenue</div>
        </div>
      </div>

      <div className="grid cols2" style={{ gap: 20 }}>
        {/* Management buttons */}
        <div className="dashCard">
          <h2 className="cardTitle" style={{ marginBottom: 16 }}>
            Management
          </h2>
          <div className="adminActionGrid">
            {MANAGEMENT_ACTIONS.map((action) => {
              const Icon = action.Icon
              return (
                <button
                  key={action.id}
                  type="button"
                  className="adminActionBtn"
                  onClick={() => handleAction(action.id)}
                >
                  <span className="adminActionIcon">
                    <Icon />
                  </span>
                  {action.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Revenue chart */}
        <div className="dashCard">
          <h2 className="cardTitle" style={{ marginBottom: 16 }}>
            Monthly Revenue (Lakhs)
          </h2>
          <div className="barChart">
            {REVENUE_CHART_DATA.map((d) => (
              <div key={d.month} className="barChartRow">
                <span className="barChartLabel">{d.month}</span>
                <div className="barChartTrack">
                  <div
                    className="barChartBar"
                    style={{ width: `${(d.value / chartMax) * 100}%` }}
                  />
                </div>
                <span className="barChartValue">{d.value}L</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
