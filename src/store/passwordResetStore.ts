import { create } from 'zustand'

interface PasswordResetState {
  resetToken: string
  email: string
  setResetToken: (token: string) => void
  setEmail: (email: string) => void
  clearState: () => void
}

export const usePasswordResetStore = create<PasswordResetState>((set) => ({
  resetToken: '',
  email: '',
  setResetToken: (token) => set({ resetToken: token }),
  setEmail: (email) => set({ email }),
  clearState: () => set({ resetToken: '', email: '' }),
}))
