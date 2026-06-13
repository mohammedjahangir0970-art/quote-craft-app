import { Link } from 'react-router-dom'
import { FileText, Mail, MapPin, Phone, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">
                Quote<span className="text-blue-600">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              AI-powered quoting and proposal platform built specifically for skilled tradespeople.
              Create professional quotes in minutes, win more jobs.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link to="/quote/new" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Create Quote</Link></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Trades</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Electricians</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Plumbers</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">HVAC Technicians</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">General Contractors</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Roofers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="h-3.5 w-3.5" />
                hello@quotecraft.io
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="h-3.5 w-3.5" />
                (555) 123-QUOTE
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                Austin, TX
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            2025 QuoteCraft, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
