import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FileText, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

interface AuthPageProps {
  mode: 'login' | 'signup'
}

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [trade, setTrade] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    login(name || 'Demo User', email, mode === 'signup' ? 'pro' : 'free')
    navigate(mode === 'signup' ? '/quote/new' : '/dashboard')
  }

  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL - FORM */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Quote<span className="text-blue-600">Craft</span>
            </span>
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {isLogin ? 'Welcome back' : 'Create your free account'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isLogin
                ? 'Sign in to access your quotes and dashboard'
                : 'Start creating professional quotes in minutes'}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mike Rodriguez"
                      required
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mike@yourelectric.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="trade">Your Trade (optional)</Label>
                    <select
                      id="trade"
                      value={trade}
                      onChange={(e) => setTrade(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select your trade</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="hvac">HVAC</option>
                      <option value="roofing">Roofing</option>
                      <option value="painting">Painting</option>
                      <option value="landscaping">Landscaping</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="general">General Contracting</option>
                    </select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : isLogin ? (
                    'Sign In'
                  ) : (
                    <>
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                No credit card required for signup
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                  Get started free
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - SOCIAL PROOF (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-800 flex-col justify-center items-center px-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="relative max-w-md">
          <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI-Powered Quoting
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            "I have won 40% more jobs since switching to QuoteCraft"
          </h2>
          <p className="text-slate-300 mb-8">
            Join 8,500+ tradespeople who create professional quotes in minutes, win more jobs, and look like the company they aspire to be.
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-white">8,500+</p>
              <p className="text-xs text-slate-400">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">47%</p>
              <p className="text-xs text-slate-400">Avg Win Boost</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">124K+</p>
              <p className="text-xs text-slate-400">Quotes Created</p>
            </div>
          </div>

          <Separator className="my-8 bg-slate-700" />

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['MR', 'SC', 'JT', 'LP'].map((initials) => (
                <div
                  key={initials}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 border-2 border-slate-800 text-white text-xs font-semibold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">Rated 4.9/5 by 2,847 tradespeople</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
