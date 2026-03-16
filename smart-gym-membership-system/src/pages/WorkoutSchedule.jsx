const WEEKLY_PLAN = [
  { day: 'Monday', focus: 'Chest' },
  { day: 'Tuesday', focus: 'Back' },
  { day: 'Wednesday', focus: 'Legs' },
  { day: 'Thursday', focus: 'Shoulders' },
  { day: 'Friday', focus: 'Arms' },
  { day: 'Saturday', focus: 'Cardio' },
]

export function WorkoutSchedule() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Workout Schedule</h1>
          <p className="pageSub">Your weekly workout plan.</p>
        </div>
      </div>

      <div className="workoutCardGrid">
        {WEEKLY_PLAN.map((item) => (
          <article className="workoutDayCard" key={item.day}>
            <div className="workoutDayName">{item.day}</div>
            <div className="workoutDayFocus">{item.focus}</div>
          </article>
        ))}
      </div>

      <div className="dashCard">
        <h2 className="cardTitle" style={{ marginBottom: 16 }}>
          Weekly summary
        </h2>
        <div className="tableWrap">
          <table className="paymentTable">
            <thead>
              <tr>
                <th>Day</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_PLAN.map((row) => (
                <tr key={row.day}>
                  <td style={{ fontWeight: 700 }}>{row.day}</td>
                  <td className="muted">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
