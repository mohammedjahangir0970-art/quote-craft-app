import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  FileText,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Zap,
  ZapOff,
  Flame,
  Building2,
} from 'lucide-react'
import { useState } from 'react'

const tradeCategories = [
  { name: 'Electricians', icon: Zap, desc: 'Panel upgrades, wiring, outlets' },
  { name: 'Plumbers', icon: ZapOff, desc: 'Repairs, installs, inspections' },
  { name: 'HVAC Techs', icon: Flame, desc: 'Heating, cooling, ventilation' },
  { name: 'General Contractors', icon: Building2, desc: 'Renovations, new builds' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLanding = location.pathname === '/'

  const scrollToSection = (id: string) => {
    if (!isLanding) {
      navigate('/#' + id)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Quote<span className="text-blue-600">Craft</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-50">
                Trades
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Built For Your Trade
              </div>
              {tradeCategories.map((cat) => (
                <DropdownMenuItem
                  key={cat.name}
                  className="flex items-start gap-3 p-3 cursor-pointer rounded-lg"
                  onClick={() => scrollToSection('trades')}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                    <cat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{cat.name}</p>
                    <p className="text-xs text-slate-500">{cat.desc}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => scrollToSection('features')}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-50"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-50"
          >
            How It Works
          </button>
          <Link
            to="/pricing"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-50"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-50"
          >
            About
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-slate-600"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/quote/new')}>
                    <FileText className="h-4 w-4 mr-2" />
                    New Quote
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started Free
              </Button>
            </>
          )}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-4 mt-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Navigation
              </p>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md"
              >
                How It Works
              </button>
              <Link
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md"
              >
                About
              </Link>

              <div className="border-t pt-4 mt-2">
                {user ? (
                  <>
                    <Button
                      className="w-full mb-2"
                      onClick={() => {
                        navigate('/dashboard')
                        setMobileOpen(false)
                      }}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600"
                      onClick={() => {
                        logout()
                        setMobileOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => {
                        navigate('/login')
                        setMobileOpen(false)
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        navigate('/signup')
                        setMobileOpen(false)
                      }}
                    >
                      Get Started Free
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
