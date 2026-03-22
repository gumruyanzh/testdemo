import { describe, it, expect } from 'vitest'
import { passwordResetService } from './passwordResetService'

describe('passwordResetService', () => {
  describe('sendResetEmail', () => {
    it('returns success response for valid email', async () => {
      const response = await passwordResetService.sendResetEmail({
        email: 'test@example.com',
      })

      expect(response.success).toBe(true)
      expect(response.message).toContain('Password reset email sent successfully')
      expect(response.token).toBeDefined()
      expect(response.token).toMatch(/^reset_token_/)
    })

    it('throws error for invalid email', async () => {
      await expect(
        passwordResetService.sendResetEmail({ email: 'invalid-email' })
      ).rejects.toThrow('Invalid email address')
    })

    it('throws error for empty email', async () => {
      await expect(
        passwordResetService.sendResetEmail({ email: '' })
      ).rejects.toThrow('Invalid email address')
    })
  })

  describe('resetPassword', () => {
    it('returns success response for valid password reset', async () => {
      const response = await passwordResetService.resetPassword({
        token: 'valid-token',
        newPassword: 'newpassword123',
      })

      expect(response.success).toBe(true)
      expect(response.message).toContain('Password reset successfully')
    })

    it('throws error for missing token', async () => {
      await expect(
        passwordResetService.resetPassword({ token: '', newPassword: 'password123' })
      ).rejects.toThrow('Reset token is required')
    })

    it('throws error for short password', async () => {
      await expect(
        passwordResetService.resetPassword({ token: 'valid-token', newPassword: 'short' })
      ).rejects.toThrow('Password must be at least 8 characters long')
    })
  })
})
