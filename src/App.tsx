import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import QuoteBuilderPage from './pages/QuoteBuilderPage'
import AuthPage from './pages/AuthPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import './App.css'

interface AuthContextType {
  user: { name: string; email: string; plan: string } | null
  login: (name: string, email: string, plan?: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string; plan: string } | null>(null)

  const login = (name: string, email: string, plan = 'free') => {
    setUser({ name, email, plan })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/pricing" element={<AppLayout><PricingPage /></AppLayout>} />
        <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <AppLayout><DashboardPage /></AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/quote/new"
          element={
            user ? (
              <AppLayout><QuoteBuilderPage /></AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </AuthContext.Provider>
  )
}
