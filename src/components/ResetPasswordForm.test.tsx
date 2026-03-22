import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ResetPasswordForm from './ResetPasswordForm'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('ResetPasswordForm', () => {
  const mockToken = 'test-token-123'

  it('renders the form with password inputs', () => {
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument()
  })

  it('disables submit button when passwords are empty', () => {
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    const submitButton = screen.getByRole('button', { name: /reset password/i })
    expect(submitButton).toBeDisabled()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    await user.type(newPasswordInput, 'password123')
    await user.type(confirmPasswordInput, 'password456')

    const submitButton = screen.getByRole('button', { name: /reset password/i })
    await user.click(submitButton)

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('shows error for short password', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    await user.type(newPasswordInput, 'short')
    await user.type(confirmPasswordInput, 'short')

    const submitButton = screen.getByRole('button', { name: /reset password/i })
    await user.click(submitButton)

    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('shows success message after successful password reset', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    await user.type(newPasswordInput, 'newpassword123')
    await user.type(confirmPasswordInput, 'newpassword123')

    const submitButton = screen.getByRole('button', { name: /reset password/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/password reset successfully/i)).toBeInTheDocument()
    })
  })

  it('shows loading state when submitting', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ResetPasswordForm token={mockToken} />)

    const newPasswordInput = screen.getByLabelText(/new password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    await user.type(newPasswordInput, 'newpassword123')
    await user.type(confirmPasswordInput, 'newpassword123')

    const submitButton = screen.getByRole('button', { name: /reset password/i })
    await user.click(submitButton)

    expect(screen.getByText(/resetting/i)).toBeInTheDocument()
  })
})
