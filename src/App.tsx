import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { LoginPage } from "@/routes/LoginPage"
import { DashboardOverviewPage } from "@/routes/DashboardOverviewPage"
import { PaymentHistoryPage } from "@/routes/PaymentHistoryPage"
import { PlansPage } from "@/routes/PlansPage"
import { SettingsPage } from "@/routes/SettingsPage"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="payments" element={<PaymentHistoryPage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors offset={{ top: "76px", right: "16px" }} />
    </ThemeProvider>
  )
}

export default App
