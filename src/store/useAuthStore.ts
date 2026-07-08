import { create } from "zustand"

const SESSION_KEY = "payment-admin-authenticated"

interface AuthState {
  isAuthenticated: boolean
  adminId: string
  login: (id: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: sessionStorage.getItem(SESSION_KEY) === "true",
  adminId: "admin",
  login: (id, password) => {
    const success = id === "admin" && password === "admin"
    if (success) {
      sessionStorage.setItem(SESSION_KEY, "true")
      set({ isAuthenticated: true })
    }
    return success
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_KEY)
    set({ isAuthenticated: false })
  },
}))
