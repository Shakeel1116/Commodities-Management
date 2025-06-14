import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRoles, user }) {
  if (!user) return <Navigate to="/" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/products" replace />
  return children
}