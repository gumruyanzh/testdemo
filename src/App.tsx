import { useState } from 'react'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ResetPasswordForm from './components/ResetPasswordForm'
import { usePasswordResetStore } from './store/passwordResetStore'

function App() {
  const [currentView, setCurrentView] = useState<'forgot' | 'reset'>('forgot')
  const { resetToken } = usePasswordResetStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Password Recovery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {currentView === 'forgot'
              ? 'Enter your email to receive a password reset link'
              : 'Enter your new password'}
          </p>
        </div>

        {currentView === 'forgot' ? (
          <ForgotPasswordForm onSuccess={() => setCurrentView('reset')} />
        ) : (
          <ResetPasswordForm
            token={resetToken}
            onBack={() => setCurrentView('forgot')}
          />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentView(currentView === 'forgot' ? 'reset' : 'forgot')}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            {currentView === 'forgot'
              ? 'Already have a reset token?'
              : 'Back to forgot password'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
