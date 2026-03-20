import { User } from '../store/authStore'
import { SignUpFormData, LoginFormData, ProfileUpdateFormData } from './validation'

interface AuthResponse {
  user: User
  token: string
  expiresIn: number
}

// Mock API implementation for demonstration
// In production, replace with actual API calls
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 1000))

// Mock user database (in-memory)
const mockUsers = new Map<string, {
  password: string
  user: User
  verificationToken?: string
  resetToken?: string
}>()

export const authAPI = {
  async signUp(data: SignUpFormData): Promise<{ message: string; verificationToken: string }> {
    await mockDelay()

    // Check if user already exists
    if (mockUsers.has(data.email)) {
      throw new Error('Email already registered')
    }

    const verificationToken = Math.random().toString(36).substring(2, 15)
    const user: User = {
      id: Math.random().toString(36).substring(2, 11),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }

    mockUsers.set(data.email, {
      password: data.password, // In production, this should be hashed
      user,
      verificationToken,
    })

    return {
      message: 'Account created successfully. Please check your email for verification.',
      verificationToken, // In production, this would be sent via email
    }
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    await mockDelay()

    const userRecord = mockUsers.get(data.email)
    if (!userRecord || userRecord.password !== data.password) {
      throw new Error('Invalid email or password')
    }

    // Auto-verify for demo purposes
    if (!userRecord.user.emailVerified) {
      userRecord.user.emailVerified = true
    }

    return {
      user: userRecord.user,
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      expiresIn: 3600, // 1 hour
    }
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    await mockDelay()

    for (const [, userRecord] of mockUsers) {
      if (userRecord.verificationToken === token) {
        userRecord.user.emailVerified = true
        delete userRecord.verificationToken
        return { message: 'Email verified successfully' }
      }
    }

    throw new Error('Invalid or expired verification token')
  },

  async forgotPassword(email: string): Promise<{ message: string; resetToken?: string }> {
    await mockDelay()

    const userRecord = mockUsers.get(email)
    if (!userRecord) {
      // Don't reveal if email exists for security
      return { message: 'If an account exists with this email, you will receive a password reset link.' }
    }

    const resetToken = Math.random().toString(36).substring(2, 15)
    userRecord.resetToken = resetToken

    return {
      message: 'If an account exists with this email, you will receive a password reset link.',
      resetToken, // In production, this would be sent via email
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    await mockDelay()

    for (const [, userRecord] of mockUsers) {
      if (userRecord.resetToken === token) {
        userRecord.password = newPassword // In production, hash this
        delete userRecord.resetToken
        return { message: 'Password reset successfully' }
      }
    }

    throw new Error('Invalid or expired reset token')
  },

  async updateProfile(data: ProfileUpdateFormData): Promise<User> {
    await mockDelay()

    // Find user by token (simplified for demo)
    for (const [, userRecord] of mockUsers) {
      userRecord.user.firstName = data.firstName
      userRecord.user.lastName = data.lastName
      return userRecord.user
    }

    throw new Error('User not found')
  },

  async logout(): Promise<void> {
    await mockDelay()
    // In production, invalidate the token on the server
  },
}
