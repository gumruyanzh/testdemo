import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkSession } = useAuthStore()

  useEffect(() => {
    // Check if session is still valid
    checkSession()
  }, [checkSession])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
