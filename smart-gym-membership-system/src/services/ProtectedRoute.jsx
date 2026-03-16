import { Navigate, useLocation } from 'react-router-dom'
import { getUser, isAuthenticated } from './auth.js'

export function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  if (requiredRole) {
    const user = getUser()
    if (!user || user.role !== requiredRole) {
      return <Navigate to="/member-dashboard" replace />
    }
  }

  return children
}

