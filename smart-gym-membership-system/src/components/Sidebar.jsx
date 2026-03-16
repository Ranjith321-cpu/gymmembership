import { NavLink } from 'react-router-dom'
import {
  IconDashboard,
  IconPlans,
  IconPayments,
  IconAttendance,
  IconWorkout,
  IconProfile,
  IconClose,
} from './Icons.jsx'

function SideNavLink({ to, children, end, icon: Icon }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `sideLink ${isActive ? 'active' : ''}`}
    >
      {Icon ? <span className="sideLinkIcon"><Icon /></span> : null}
      {children}
    </NavLink>
  )
}

export function Sidebar({ user, open, onClose }) {
  const isAdmin = user?.role === 'admin'

  return (
    <>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sideBar ${open ? 'open' : ''}`}>
        <div className="sideHeader">
          <div className="sideTitle">Navigation</div>
          <button className="iconBtn" onClick={onClose} type="button">
            <IconClose aria-hidden="true" />
            <span className="srOnly">Close sidebar</span>
          </button>
        </div>

        <nav className="sideNav" onClick={() => open && onClose()}>
          {isAdmin ? (
            <>
              <SideNavLink to="/admin-dashboard" end icon={IconDashboard}>
                Admin Dashboard
              </SideNavLink>
              <div className="sideSectionLabel">Members</div>
              <SideNavLink to="/member-dashboard" end icon={IconDashboard}>
                Member Dashboard
              </SideNavLink>
              <SideNavLink to="/membership-plans" icon={IconPlans}>Membership Plans</SideNavLink>
              <SideNavLink to="/payments" icon={IconPayments}>Payment History</SideNavLink>
              <SideNavLink to="/attendance" icon={IconAttendance}>Attendance</SideNavLink>
              <SideNavLink to="/workout" icon={IconWorkout}>Workout Schedule</SideNavLink>
              <SideNavLink to="/profile" icon={IconProfile}>Profile</SideNavLink>
            </>
          ) : (
            <>
              <SideNavLink to="/member-dashboard" end icon={IconDashboard}>
                Dashboard
              </SideNavLink>
              <SideNavLink to="/membership-plans" icon={IconPlans}>Membership Plans</SideNavLink>
              <SideNavLink to="/payments" icon={IconPayments}>Payment History</SideNavLink>
              <SideNavLink to="/attendance" icon={IconAttendance}>Attendance</SideNavLink>
              <SideNavLink to="/workout" icon={IconWorkout}>Workout Schedule</SideNavLink>
              <SideNavLink to="/profile" icon={IconProfile}>Profile</SideNavLink>
            </>
          )}
        </nav>

        <div className="sideFooter">
          <div className="sideHint">
            Tip: login with an email containing <strong>admin</strong> to see the admin
            area.
          </div>
        </div>
      </aside>
    </>
  )
}

