import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './Login'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const renderLogin = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('Login Component', () => {
  it('renders login form', () => {
    renderLogin()

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('has links to sign up and forgot password', () => {
    renderLogin()

    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument()
  })

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('shows loading state when submitting valid form', async () => {
    const user = userEvent.setup()
    renderLogin()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /log in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'Password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument()
    })
  })
})
