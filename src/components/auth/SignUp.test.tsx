import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SignUp from './SignUp'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const renderSignUp = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('SignUp Component', () => {
  it('renders sign up form', () => {
    renderSignUp()

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('has link to login page', () => {
    renderSignUp()

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument()
  })

  it('allows user to type in all fields', async () => {
    const user = userEvent.setup()
    renderSignUp()

    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
    const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/^email$/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'Password123')
    await user.type(confirmPasswordInput, 'Password123')

    expect(firstNameInput.value).toBe('John')
    expect(lastNameInput.value).toBe('Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(passwordInput.value).toBe('Password123')
    expect(confirmPasswordInput.value).toBe('Password123')
  })
})
