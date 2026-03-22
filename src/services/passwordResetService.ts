export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  success: boolean
  message: string
  token?: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
}

// Mock API service - in production, this would make real HTTP requests
export const passwordResetService = {
  async sendResetEmail(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email address')
    }

    // Mock success response with token
    return {
      success: true,
      message: 'Password reset email sent successfully. Check your inbox.',
      token: `reset_token_${Date.now()}`,
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock validation
    if (!data.token) {
      throw new Error('Reset token is required')
    }

    if (data.newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    // Mock success response
    return {
      success: true,
      message: 'Password reset successfully. You can now log in with your new password.',
    }
  },
}
