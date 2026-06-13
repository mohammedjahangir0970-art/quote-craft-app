import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ArrowRight,
  Clock,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  Star,
  Quote,
  ChevronRight,
  Sparkles,
  Receipt,
  BarChart3,
  Bell,
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const features = [
  {
    icon: Sparkles,
    title: 'AI Quote Generation',
    description: 'Describe the job in plain English. Our AI instantly builds a professional quote with accurate line items, materials, and labor estimates.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Clock,
    title: 'Create Quotes in 2 Minutes',
    description: 'Stop spending an hour on every quote. Our templates and smart suggestions cut quote creation time by 90%.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First for On-Site',
    description: 'Built for your phone and tablet. Create quotes while walking the job site. No laptop required.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Receipt,
    title: 'Professional Branded Quotes',
    description: 'Every quote includes your logo, company colors, and contact info. Look as professional as the big companies.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Win Rate Analytics',
    description: 'Track which quotes convert and which do not. Identify your most profitable job types and price points.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Bell,
    title: 'Automatic Follow-Ups',
    description: 'Never let a quote go cold. Automatic reminder emails to customers who have not responded.',
    color: 'bg-rose-50 text-rose-600',
  },
]

const trades = [
  { name: 'Electricians', count: '2,400+ users', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
  { name: 'Plumbers', count: '1,800+ users', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { name: 'HVAC Techs', count: '1,200+ users', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
  { name: 'Roofers', count: '900+ users', color: 'bg-slate-50 border-slate-200 hover:bg-slate-100' },
  { name: 'Painters', count: '750+ users', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
  { name: 'Landscapers', count: '600+ users', color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
  { name: 'Carpenters', count: '550+ users', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
  { name: 'General Contractors', count: '1,100+ users', color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
]

const testimonials = [
  {
    name: 'Mike Rodriguez',
    trade: 'Master Electrician',
    company: 'Rodriguez Electric',
    content: 'I was losing jobs because my handwritten quotes looked unprofessional. QuoteCraft changed everything. I have won 40% more jobs since switching, and my customers comment on how professional my quotes look.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    trade: 'Plumbing Contractor',
    company: 'Chen Plumbing Solutions',
    content: 'The AI quote generation is unreal. I describe a job like replace water heater and it builds the entire quote with parts, labor, and markup. What used to take 45 minutes now takes 5.',
    rating: 5,
  },
  {
    name: 'James Thompson',
    trade: 'HVAC Business Owner',
    company: 'Thompson Heating & Air',
    content: 'I run a 12-tech HVAC company. QuoteCraft lets my techs create quotes from their phones on-site. Our close rate went from 52% to 78% in three months. Best investment we have made.',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    trade: 'General Contractor',
    company: 'Park Renovations',
    content: 'The follow-up feature alone pays for the subscription. Quotes that used to sit forgotten now get automatic reminders. I have recovered at least $15,000 in jobs that would have slipped through the cracks.',
    rating: 5,
  },
  {
    name: 'David Okafor',
    trade: 'Roofing Contractor',
    company: 'Okafor Roofing',
    content: 'As a roofer, I am always on job sites. Being able to build a quote on my phone while walking a roof is a game-changer. The photo integration lets me attach drone shots directly to the quote.',
    rating: 5,
  },
  {
    name: 'Amanda Foster',
    trade: 'Painter',
    company: 'Foster Fine Painting',
    content: 'I was skeptical about another app, but QuoteCraft actually gets what painters need. Room-by-room breakdowns, paint calculations, and the customers love approving quotes with one tap.',
    rating: 5,
  },
]

const steps = [
  {
    number: '01',
    title: 'Describe the Job',
    description: 'Tell our AI what the job involves in plain language. Walk the site, take photos, and narrate.',
  },
  {
    number: '02',
    title: 'Review & Adjust',
    description: 'AI generates a complete quote with line items, materials, and pricing. Adjust anything with a tap.',
  },
  {
    number: '03',
    title: 'Send & Win',
    description: 'Send a branded, professional quote via email or text. Customer approves with one click.',
  },
]

const faqs = [
  {
    question: 'Is QuoteCraft really free to start?',
    answer: 'Yes. The Free plan includes 5 quotes per month with full access to AI generation and basic templates. No credit card required. Upgrade when you are ready to create unlimited quotes.',
  },
  {
    question: 'How does the AI quote generation work?',
    answer: 'Simply describe the job in plain English, e.g., "Replace a 50-gallon water heater in the basement with a tankless unit." Our AI breaks this into line items, estimates labor hours, suggests materials, and calculates pricing based on your trade and location.',
  },
  {
    question: 'Can I use this on my phone at job sites?',
    answer: 'Absolutely. QuoteCraft is designed mobile-first. It works on any phone or tablet with a web browser. No app download needed. You can create quotes while walking the job site, attach photos, and send before you leave.',
  },
  {
    question: 'Will my quotes look professional?',
    answer: 'Every quote is branded with your company logo, colors, and contact information. They look as polished as quotes from million-dollar contracting firms. Customers can approve quotes with a single tap.',
  },
  {
    question: 'What trades does QuoteCraft support?',
    answer: 'We support all major trades: electricians, plumbers, HVAC technicians, roofers, painters, landscapers, carpenters, general contractors, flooring installers, and more. Each trade has specialized templates and material databases.',
  },
  {
    question: 'Can I import my existing customer list?',
    answer: 'Yes. You can import customers via CSV from any spreadsheet or CRM. Our Pro and Business plans also offer integrations with popular tools like QuickBooks and ServiceTitan.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <Badge className="mb-6 px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                AI-Powered Quoting for Tradespeople
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Win More Jobs with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                  Professional Quotes
                </span>{' '}
                in 2 Minutes
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Stop losing jobs to sloppy handwritten estimates. QuoteCraft uses AI to turn your job descriptions into polished, branded quotes that customers approve faster. Built for electricians, plumbers, HVAC techs, and all skilled trades.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 text-base h-12"
                >
                  Start Creating Free Quotes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById('how-it-works')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-8 text-base h-12 border-slate-300"
                >
                  See How It Works
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Free forever plan
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  No credit card
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Cancel anytime
                </div>
              </div>
            </div>
            <div className="relative lg:pl-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="/hero-tradesperson.jpg"
                  alt="Professional tradesperson using QuoteCraft on tablet"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-2 text-sm font-medium">4.9/5 from 2,847 tradespeople</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200 p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Avg. 47% more wins</p>
                    <p className="text-xs text-slate-500">within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">
                <AnimatedCounter target={8500} suffix="+" />
              </p>
              <p className="text-sm text-slate-500 mt-1">Active Tradespeople</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                <AnimatedCounter target={124000} suffix="+" />
              </p>
              <p className="text-sm text-slate-500 mt-1">Quotes Created</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                $<AnimatedCounter target={47} suffix="M+" />
              </p>
              <p className="text-sm text-slate-500 mt-1">Quotes Sent</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                <AnimatedCounter target={47} suffix="%" />
              </p>
              <p className="text-sm text-slate-500 mt-1">Avg. Win Rate Boost</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-red-600 border-red-200 bg-red-50">
              The Problem
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Still Creating Quotes in Word Docs, Spreadsheets, or on the Back of a Receipt?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              67% of trade businesses lose jobs because of unprofessional quotes. The average tradesperson spends 8+ hours per week just on estimates.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 max-w-4xl mx-auto">
            <img
              src="/before-after.jpg"
              alt="Before: messy paper quote vs After: professional digital quote"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="border-red-100 bg-red-50/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-600">2.3 hrs</p>
                <p className="text-sm text-slate-600 mt-1">Avg. time per handwritten quote</p>
              </CardContent>
            </Card>
            <Card className="border-red-100 bg-red-50/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-600">34%</p>
                <p className="text-sm text-slate-600 mt-1">Of quotes have calculation errors</p>
              </CardContent>
            </Card>
            <Card className="border-red-100 bg-red-50/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-600">$12K</p>
                <p className="text-sm text-slate-600 mt-1">Avg. annual revenue lost to bad quotes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Quote Like a Pro
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Built from the ground up for how tradespeople actually work. No fluff, no complexity, just tools that win jobs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <CardContent className="pt-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              From Job Site to Approved Quote in 3 Steps
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-extrabold text-blue-100 leading-none mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ChevronRight className="h-8 w-8 text-blue-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <img
              src="/quote-illustration.png"
              alt="QuoteCraft interface illustration"
              className="max-w-lg w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* TRADES SECTION */}
      <section id="trades" className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
              Built For Your Trade
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Specialized Templates for Every Trade
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Not a generic tool with trade stickers slapped on. QuoteCraft has custom templates, material databases, and workflows built specifically for your industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trades.map((trade) => (
              <Card
                key={trade.name}
                className={`${trade.color} border-2 cursor-pointer hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{trade.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{trade.count}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Tradespeople Who Never Looked Back
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-slate-200 bg-white hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-blue-200 mb-3" />
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{t.content}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.trade} at {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-600 text-white hover:bg-blue-600 border-0">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Start Free, Scale When You Are Ready
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Every paid plan pays for itself with one extra job won per month.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-medium text-slate-400 mb-2">Free</p>
                <p className="text-4xl font-bold text-white">$0</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">/month</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />5 quotes/month
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />Basic templates
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />AI quote generation
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-medium text-blue-400 mb-2">Starter</p>
                <p className="text-4xl font-bold text-white">$29</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">/month</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />Unlimited quotes
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />All templates
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />Photo attachments
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/signup')}>
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-blue-600 border-blue-500 relative scale-105 shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-white text-blue-600 hover:bg-white font-semibold px-3">Most Popular</Badge>
              </div>
              <CardContent className="pt-8 text-center">
                <p className="text-sm font-medium text-blue-200 mb-2">Pro</p>
                <p className="text-4xl font-bold text-white">$59</p>
                <p className="text-xs text-blue-200 mt-1 mb-4">/month</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />Everything in Starter
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />Win rate analytics
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />Auto follow-ups
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />Customer portal
                  </li>
                </ul>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" onClick={() => navigate('/signup')}>
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-medium text-slate-400 mb-2">Business</p>
                <p className="text-4xl font-bold text-white">$99</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">/month</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />Everything in Pro
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />5 team members
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />QuickBooks sync
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />Priority support
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white" onClick={() => navigate('/signup')}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Questions? Answered.
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-200">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Stop Losing Jobs to Bad Quotes
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Join 8,500+ tradespeople who create professional quotes in minutes, win more jobs, and look like the company they aspire to be.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 text-base h-12 font-semibold"
            >
              Create Your First Quote Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            No credit card required. Free plan includes 5 quotes/month.
          </p>
        </div>
      </section>
    </div>
  )
}
