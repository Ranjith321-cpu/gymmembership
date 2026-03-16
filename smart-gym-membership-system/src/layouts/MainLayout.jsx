import { Outlet } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { getUser } from '../services/auth.js'

export function MainLayout() {
  const user = useMemo(() => getUser(), [])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="appShell">
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="appBody">
        <Sidebar
          user={user}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="appMain">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

