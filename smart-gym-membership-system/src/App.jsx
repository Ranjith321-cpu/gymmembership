import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout.jsx'
import { AuthLayout } from './layouts/AuthLayout.jsx'
import { LoginSelect } from './pages/auth/LoginSelect.jsx'
import { MemberLogin } from './pages/auth/MemberLogin.jsx'
import { AdminLogin } from './pages/auth/AdminLogin.jsx'
import { Register } from './pages/Register.jsx'
import { MemberDashboard } from './pages/MemberDashboard.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { MembershipPlans } from './pages/MembershipPlans.jsx'
import { PaymentHistory } from './pages/PaymentHistory.jsx'
import { Attendance } from './pages/Attendance.jsx'
import { WorkoutSchedule } from './pages/WorkoutSchedule.jsx'
import { Profile } from './pages/Profile.jsx'
import { ProtectedRoute } from './services/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSelect />} />

      <Route element={<AuthLayout />}>
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/member-dashboard" replace />} />

        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/membership-plans" element={<MembershipPlans />} />
        <Route path="/payments" element={<PaymentHistory />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/workout" element={<WorkoutSchedule />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
