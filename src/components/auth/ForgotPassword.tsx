import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authAPI } from '../../lib/api'
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../lib/validation'
import { useForm } from '../../hooks/useForm'

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)

  const { mutate: requestReset, isPending, error } = useMutation({
    mutationFn: (email: string) => authAPI.forgotPassword(email),
    onSuccess: (data) => {
      setSubmitted(true)
      if (data.resetToken) {
        setResetToken(data.resetToken)
      }
    },
  })

  const { formData, errors, handleChange, handleSubmit } = useForm<ForgotPasswordFormData>({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (data) => requestReset(data.email),
  })

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              If an account exists with this email, you will receive a password reset link.
            </p>
            {resetToken && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 mb-2">Demo Mode: Use this link to reset your password:</p>
                <Link
                  to={`/reset-password/${resetToken}`}
                  className="text-blue-600 hover:text-blue-700 font-medium break-all"
                >
                  Reset Password Link
                </Link>
              </div>
            )}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              aria-label="Email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="error-text" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
              {error.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
            aria-busy={isPending}
          >
            {isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
