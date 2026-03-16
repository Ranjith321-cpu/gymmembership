import { useMemo } from 'react'

const ATTENDANCE_HISTORY = [
  { id: 1, date: '2026-03-08', checkIn: '06:30', checkOut: '07:45' },
  { id: 2, date: '2026-03-07', checkIn: '18:00', checkOut: '19:15' },
  { id: 3, date: '2026-03-06', checkIn: '06:45', checkOut: '08:00' },
  { id: 4, date: '2026-03-04', checkIn: '07:00', checkOut: '08:20' },
  { id: 5, date: '2026-03-02', checkIn: '17:30', checkOut: '18:50' },
  { id: 6, date: '2026-03-01', checkIn: '06:30', checkOut: '07:40' },
  { id: 7, date: '2026-02-28', checkIn: '18:15', checkOut: '19:30' },
  { id: 8, date: '2026-02-26', checkIn: '07:00', checkOut: '08:10' },
  { id: 9, date: '2026-02-24', checkIn: '06:45', checkOut: '07:55' },
  { id: 10, date: '2026-02-22', checkIn: '17:45', checkOut: '19:00' },
]

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function formatTime(t) {
  if (!t) return '—'
  const [h, m] = t.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 || 12
  return `${h12}:${m || '00'} ${ampm}`
}

export function Attendance() {
  const now = useMemo(() => new Date(), [])
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const stats = useMemo(() => {
    const total = ATTENDANCE_HISTORY.length
    const monthly = ATTENDANCE_HISTORY.filter((r) => {
      const d = new Date(r.date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    }).length
    return { total, monthly }
  }, [currentMonth, currentYear])

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Gym Attendance</h1>
          <p className="pageSub">Track your check-ins and visit history.</p>
        </div>
      </div>

      <div className="grid cols2" style={{ gap: 16 }}>
        <div className="dashCard statCard">
          <div className="statValue">{stats.total}</div>
          <div className="statLabel">Total visits</div>
        </div>
        <div className="dashCard statCard">
          <div className="statValue">{stats.monthly}</div>
          <div className="statLabel">Monthly visits</div>
        </div>
      </div>

      <div className="dashCard">
        <h2 className="cardTitle" style={{ marginBottom: 16 }}>
          Attendance history
        </h2>
        <div className="tableWrap">
          <table className="paymentTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_HISTORY.map((row) => (
                <tr key={row.id}>
                  <td className="muted">{formatDate(row.date)}</td>
                  <td>{formatTime(row.checkIn)}</td>
                  <td>{formatTime(row.checkOut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
