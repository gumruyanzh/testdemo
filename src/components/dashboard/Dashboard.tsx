import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authAPI } from '../../lib/api'
import { useMutation } from '@tanstack/react-query'

export default function Dashboard() {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const { mutate: logout } = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      clearAuth()
      navigate('/login')
    },
  })

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h2>
          <p className="text-gray-600 mt-2">
            You're successfully logged into your account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              <span className="text-2xl">👤</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {user.emailVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              View and update your personal information
            </p>
            <Link
              to="/profile"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Go to Profile →
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <span className="text-2xl">🔒</span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Last login: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/profile"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
            >
              <div className="text-3xl mb-2">👤</div>
              <div className="font-medium text-gray-900">Edit Profile</div>
            </Link>

            <button
              onClick={() => alert('This feature would allow changing password')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
            >
              <div className="text-3xl mb-2">🔑</div>
              <div className="font-medium text-gray-900">Change Password</div>
            </button>

            <button
              onClick={() => alert('This feature would show activity log')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <div className="font-medium text-gray-900">Activity Log</div>
            </button>

            <button
              onClick={() => alert('This feature would manage settings')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-medium text-gray-900">Settings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
