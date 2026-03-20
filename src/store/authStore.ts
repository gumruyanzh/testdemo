import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  emailVerified: boolean
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  sessionExpiry: number | null
  setAuth: (user: User, token: string, expiresIn: number) => void
  clearAuth: () => void
  updateUser: (user: Partial<User>) => void
  checkSession: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      sessionExpiry: null,

      setAuth: (user, token, expiresIn) => {
        const expiryTime = Date.now() + expiresIn * 1000
        set({
          user,
          token,
          isAuthenticated: true,
          sessionExpiry: expiryTime,
        })
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          sessionExpiry: null,
        })
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },

      checkSession: () => {
        const { sessionExpiry, clearAuth } = get()
        if (sessionExpiry && Date.now() >= sessionExpiry) {
          clearAuth()
          return false
        }
        return true
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        sessionExpiry: state.sessionExpiry,
      }),
    }
  )
)
