import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Target,
  Heart,
  Zap,
  Shield,
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Built for Trades, Not Desks',
    description: 'We design every feature for people who work with their hands, not at a desk. Mobile-first, dirty-hands-friendly, and job-site tested.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Heart,
    title: 'Your Success Is Our Success',
    description: 'We only win when you win more jobs. Every feature, every template, every AI prompt is designed to help you close more work.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Zap,
    title: 'Speed Is a Feature',
    description: 'If a quote takes longer in QuoteCraft than on paper, we have failed. Speed of quote creation is our most important metric.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: 'No Lock-In, No Games',
    description: 'Cancel anytime. Export your data. No retention specialists. We earn your business every single month by delivering value.',
    color: 'bg-green-50 text-green-600',
  },
]

const milestones = [
  { year: '2023', title: 'The Problem Identified', description: 'After interviewing 200+ tradespeople, we discovered that 67% lose jobs due to unprofessional quotes.' },
  { year: '2024', title: 'Beta Launch', description: 'Released first version with 50 electricians. Average quote creation time dropped from 2.3 hours to 8 minutes.' },
  { year: '2025', title: 'AI Generation', description: 'Added AI quote generation. Users describe jobs in plain English and get complete quotes instantly.' },
  { year: '2025', title: '8,500+ Users', description: 'Expanded to all major trades across the US and Canada. $47M in quotes sent through the platform.' },
]

const team = [
  { name: 'Alex Morgan', role: 'Founder & CEO', bio: 'Former contractor who built QuoteCraft after losing a $28K job to a competitor with better-looking quotes.' },
  { name: 'Jordan Lee', role: 'Head of Product', bio: 'Product leader with 10+ years in construction tech. Obsessed with making software that works on job sites.' },
  { name: 'Casey Rivera', role: 'Lead Engineer', bio: 'Full-stack engineer and former electrician. Built the first version while still doing service calls on weekends.' },
  { name: 'Riley Park', role: 'Head of Customer Success', bio: 'Former trade business owner who grew her company from 2 to 18 employees using systematic quoting.' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
            About Us
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Built by Tradespeople,<br />for Tradespeople
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            QuoteCraft was born on a job site, not in a venture capital office. Our founder lost a $28,000 renovation contract because his hand-written quote looked unprofessional next to a competitor's polished proposal. That moment sparked a mission: give every tradesperson the tools to quote like a million-dollar company.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">8,500+</p>
              <p className="text-sm text-slate-600 mt-1">Active Tradespeople</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">$47M</p>
              <p className="text-sm text-slate-600 mt-1">Quotes Sent</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">47%</p>
              <p className="text-sm text-slate-600 mt-1">Avg Win Rate Boost</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">2 min</p>
              <p className="text-sm text-slate-600 mt-1">Avg Quote Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
            <p className="mt-4 text-lg text-slate-600">
              These principles guide every decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${value.color} mb-4`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
            <p className="mt-4 text-lg text-slate-600">
              From a problem on a job site to helping thousands of tradespeople win more work.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 hidden sm:block" />
            <div className="space-y-8">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="relative sm:pl-12">
                  <div className="hidden sm:flex absolute left-2 top-2 h-5 w-5 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <Card className="bg-white">
                    <CardContent className="pt-5">
                      <Badge className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-50">{milestone.year}</Badge>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{milestone.title}</h3>
                      <p className="text-sm text-slate-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">The Team</h2>
            <p className="mt-4 text-lg text-slate-600">
              We have walked in your boots. Every team member has either worked in the trades or grown up in a trade family.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="border-slate-200 text-center">
                <CardContent className="pt-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl font-bold mx-auto mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join 8,500+ Tradespeople Who Quote Smarter
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Whether you are a solo electrician or a 20-person HVAC company, QuoteCraft helps you win more work with professional quotes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-8"
            >
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="border-white text-white hover:bg-white/10 px-8"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
