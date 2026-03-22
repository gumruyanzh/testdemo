import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgotPasswordForm from './ForgotPasswordForm'

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

describe('ForgotPasswordForm', () => {
  it('renders the form with email input', () => {
    renderWithQueryClient(<ForgotPasswordForm />)

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('disables submit button when email is empty', () => {
    renderWithQueryClient(<ForgotPasswordForm />)

    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when email is entered', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ForgotPasswordForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')

    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    expect(submitButton).not.toBeDisabled()
  })

  it('shows loading state when submitting', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ForgotPasswordForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')

    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    await user.click(submitButton)

    expect(screen.getByText(/sending/i)).toBeInTheDocument()
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    renderWithQueryClient(<ForgotPasswordForm onSuccess={onSuccess} />)

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'test@example.com')

    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/password reset email sent successfully/i)).toBeInTheDocument()
    })

    expect(onSuccess).toHaveBeenCalled()
  })

  it('shows error message for invalid email', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ForgotPasswordForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })
})
