import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { passwordResetService } from '../services/passwordResetService'
import Button from './ui/Button'
import Input from './ui/Input'
import Alert from './ui/Alert'

interface ResetPasswordFormProps {
  token: string
  onBack?: () => void
}

export default function ResetPasswordForm({ token, onBack }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const mutation = useMutation({
    mutationFn: passwordResetService.resetPassword,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    // Validate password match
    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters long')
      return
    }

    mutation.mutate({ token, newPassword })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="new-password"
          type="password"
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
          disabled={mutation.isPending || mutation.isSuccess}
          aria-label="New password"
        />

        <Input
          id="confirm-password"
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          disabled={mutation.isPending || mutation.isSuccess}
          aria-label="Confirm password"
        />

        {validationError && (
          <Alert variant="error" message={validationError} />
        )}

        {mutation.isError && (
          <Alert
            variant="error"
            message={mutation.error instanceof Error ? mutation.error.message : 'Failed to reset password'}
          />
        )}

        {mutation.isSuccess && (
          <Alert
            variant="success"
            message={mutation.data.message}
          />
        )}

        <div className="flex gap-3">
          {onBack && (
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              disabled={mutation.isPending}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            fullWidth
            isLoading={mutation.isPending}
            disabled={mutation.isPending || mutation.isSuccess || !newPassword || !confirmPassword}
          >
            {mutation.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  )
}
