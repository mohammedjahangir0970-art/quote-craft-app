import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  User,
  HelpCircle,
} from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    description: 'Get started with professional quoting',
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: User,
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      { text: '5 quotes per month', included: true },
      { text: 'Basic trade templates', included: true },
      { text: 'AI quote generation', included: true },
      { text: 'Email delivery', included: true },
      { text: 'Mobile-friendly', included: true },
      { text: 'Customer name on quotes', included: false },
      { text: 'Photo attachments', included: false },
      { text: 'Win rate analytics', included: false },
      { text: 'Automatic follow-ups', included: false },
      { text: 'Team members', included: false },
      { text: 'QuickBooks integration', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Starter',
    description: 'For solo tradespeople winning more jobs',
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: Zap,
    cta: 'Start Free Trial',
    ctaVariant: 'default' as const,
    popular: false,
    features: [
      { text: 'Unlimited quotes', included: true },
      { text: 'All trade templates', included: true },
      { text: 'AI quote generation', included: true },
      { text: 'Email & SMS delivery', included: true },
      { text: 'Mobile-friendly', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Photo attachments', included: true },
      { text: 'Win rate analytics', included: false },
      { text: 'Automatic follow-ups', included: false },
      { text: 'Team members', included: false },
      { text: 'QuickBooks integration', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For growing trade businesses',
    monthlyPrice: 59,
    yearlyPrice: 49,
    icon: Sparkles,
    cta: 'Start Free Trial',
    ctaVariant: 'default' as const,
    popular: true,
    features: [
      { text: 'Unlimited quotes', included: true },
      { text: 'All trade templates', included: true },
      { text: 'AI quote generation', included: true },
      { text: 'Email & SMS delivery', included: true },
      { text: 'Mobile-friendly', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Photo attachments', included: true },
      { text: 'Win rate analytics', included: true },
      { text: 'Automatic follow-ups', included: true },
      { text: '1 team member', included: true },
      { text: 'QuickBooks integration', included: false },
      { text: 'Priority support', included: true },
    ],
  },
  {
    name: 'Business',
    description: 'For multi-person trade companies',
    monthlyPrice: 99,
    yearlyPrice: 79,
    icon: Building2,
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      { text: 'Unlimited quotes', included: true },
      { text: 'All trade templates', included: true },
      { text: 'AI quote generation', included: true },
      { text: 'Email & SMS delivery', included: true },
      { text: 'Mobile-friendly', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Photo attachments', included: true },
      { text: 'Win rate analytics', included: true },
      { text: 'Automatic follow-ups', included: true },
      { text: '5 team members', included: true },
      { text: 'QuickBooks integration', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

const faqs = [
  {
    question: 'Can I really start for free?',
    answer: 'Absolutely. The Free plan gives you 5 quotes per month with full access to AI generation and basic templates. No credit card required, no time limit. Upgrade only when you need more.',
  },
  {
    question: 'What happens when I hit my free quote limit?',
    answer: 'You will see a friendly prompt to upgrade. Your existing quotes remain accessible. We never delete your data.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel from your account settings with one click. No phone calls, no retention specialists. You keep access until the end of your billing period.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer: 'Yes. Annual plans save you approximately 20% compared to monthly billing. Shown on the yearly tab above.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee on all paid plans. If QuoteCraft does not help you win more jobs, we will refund you no questions asked.',
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
            Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Simple Pricing, Powerful Results
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Every plan pays for itself with just one extra job won per month. Start free, upgrade when you are ready.
          </p>

          <div className="mt-8 flex justify-center">
            <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100 text-xs">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const PlanIcon = plan.icon
              return (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular
                      ? 'border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]'
                      : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white hover:bg-blue-600 font-semibold px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <PlanIcon className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-900">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-sm text-slate-500">/mo</span>
                      {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                        <p className="text-xs text-slate-400 mt-1">
                          Billed annually (${plan.yearlyPrice * 12}/year)
                        </p>
                      )}
                    </div>
                    <Button
                      className={`w-full mb-6 ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : plan.ctaVariant === 'outline'
                          ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                      variant={plan.ctaVariant}
                      onClick={() => navigate('/signup')}
                    >
                      {plan.cta}
                    </Button>
                    <Separator className="mb-4" />
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-2 text-sm">
                          {feature.included ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-green-600 border-green-200 bg-green-50">
              ROI Calculator
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              See How Fast QuoteCraft Pays for Itself
            </h2>
          </div>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Average Job Value</p>
                  <p className="text-3xl font-bold text-slate-900">$3,500</p>
                  <p className="text-xs text-slate-400 mt-1">US average for trade work</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Extra Jobs Won / Month</p>
                  <p className="text-3xl font-bold text-blue-600">2.3x</p>
                  <p className="text-xs text-slate-400 mt-1">Average win rate increase</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Monthly ROI</p>
                  <p className="text-3xl font-bold text-green-600">${(3500 * 2.3 - 59).toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-1">On Pro plan ($59/mo)</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg text-slate-700">
                  Even <span className="font-bold text-blue-600">one extra job</span> per month pays for QuoteCraft{' '}
                  <span className="font-bold text-green-600">59x over</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Pricing Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Win More Jobs?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Start free today. No credit card required.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-white text-slate-900 hover:bg-slate-100 px-8"
            onClick={() => navigate('/signup')}
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
