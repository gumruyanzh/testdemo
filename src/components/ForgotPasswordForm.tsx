import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { passwordResetService } from '../services/passwordResetService'
import { usePasswordResetStore } from '../store/passwordResetStore'
import Button from './ui/Button'
import Input from './ui/Input'
import Alert from './ui/Alert'

interface ForgotPasswordFormProps {
  onSuccess?: () => void
}

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const { setResetToken, setEmail: setStoreEmail } = usePasswordResetStore()

  const mutation = useMutation({
    mutationFn: passwordResetService.sendResetEmail,
    onSuccess: (data) => {
      if (data.token) {
        setResetToken(data.token)
        setStoreEmail(email)
      }
      onSuccess?.()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={mutation.isPending}
          aria-label="Email address"
        />

        {mutation.isError && (
          <Alert
            variant="error"
            message={mutation.error instanceof Error ? mutation.error.message : 'Failed to send reset email'}
          />
        )}

        {mutation.isSuccess && (
          <Alert
            variant="success"
            message={mutation.data.message}
          />
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={mutation.isPending}
          disabled={mutation.isPending || !email}
        >
          {mutation.isPending ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  )
}
