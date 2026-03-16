import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authHeader">
          <div className="brandMark">SG</div>
          <div>
            <div className="brandTitle">Smart Gym</div>
            <div className="brandSub">Membership System</div>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="authAside" aria-hidden="true">
        <div className="authAsideInner">
          <div className="authAsideTitle">Train smarter.</div>
          <div className="authAsideText">
            Track attendance, manage memberships, view payments, and plan workouts in one
            place.
          </div>
          <div className="authAsideStats">
            <div className="pill">Responsive UI</div>
            <div className="pill">Member & Admin</div>
            <div className="pill">Router-ready</div>
          </div>
        </div>
      </div>
    </div>
  )
}

