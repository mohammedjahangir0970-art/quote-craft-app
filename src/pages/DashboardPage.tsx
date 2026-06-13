import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Plus,
  TrendingUp,
  DollarSign,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Copy,
  MoreHorizontal,
  ArrowUpRight,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

interface Quote {
  id: string
  customer: string
  trade: string
  amount: number
  status: 'draft' | 'sent' | 'approved' | 'declined'
  date: string
  description: string
}

const mockQuotes: Quote[] = [
  { id: 'QC-2025-001', customer: 'Sarah Johnson', trade: 'Electrical', amount: 4250, status: 'approved', date: '2025-06-08', description: 'Panel upgrade + 3 new circuits' },
  { id: 'QC-2025-002', customer: 'Mike Chen', trade: 'Plumbing', amount: 1850, status: 'sent', date: '2025-06-07', description: 'Water heater replacement' },
  { id: 'QC-2025-003', customer: 'Amanda Foster', trade: 'Electrical', amount: 3200, status: 'draft', date: '2025-06-06', description: 'Whole home rewiring estimate' },
  { id: 'QC-2025-004', customer: 'David Okafor', trade: 'HVAC', amount: 6750, status: 'approved', date: '2025-06-05', description: 'New AC unit + ductwork' },
  { id: 'QC-2025-005', customer: 'Lisa Park', trade: 'Roofing', amount: 12800, status: 'sent', date: '2025-06-04', description: 'Full roof replacement' },
  { id: 'QC-2025-006', customer: 'James Wilson', trade: 'Plumbing', amount: 950, status: 'declined', date: '2025-06-03', description: 'Leak repair + inspection' },
  { id: 'QC-2025-007', customer: 'Rachel Torres', trade: 'Electrical', amount: 5600, status: 'sent', date: '2025-06-02', description: 'EV charger + service upgrade' },
  { id: 'QC-2025-008', customer: 'Tom Bradley', trade: 'General', amount: 22400, status: 'draft', date: '2025-06-01', description: 'Kitchen renovation' },
]

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock },
  sent: { label: 'Sent', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Send },
  approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 },
  declined: { label: 'Declined', color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes)
  const [activeTab, setActiveTab] = useState('all')

  const filteredQuotes = activeTab === 'all' ? quotes : quotes.filter(q => q.status === activeTab)

  const stats = {
    totalQuotes: quotes.length,
    totalSent: quotes.filter(q => q.status === 'sent').length,
    totalApproved: quotes.filter(q => q.status === 'approved').length,
    revenue: quotes.filter(q => q.status === 'approved').reduce((sum, q) => sum + q.amount, 0),
    winRate: Math.round((quotes.filter(q => q.status === 'approved').length / quotes.filter(q => q.status !== 'draft').length) * 100),
  }

  const duplicateQuote = (quote: Quote) => {
    const newQuote: Quote = {
      ...quote,
      id: `QC-2025-${String(quotes.length + 1).padStart(3, '0')}`,
      status: 'draft',
      date: new Date().toISOString().split('T')[0],
    }
    setQuotes([newQuote, ...quotes])
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your quotes and track performance</p>
          </div>
          <Button
            onClick={() => navigate('/quote/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Quotes</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalQuotes}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pending</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalSent}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Win Rate</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.winRate}%</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +12% this month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Revenue Won</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                +$8,200 this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QUOTES LIST */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Your Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({quotes.length})</TabsTrigger>
                <TabsTrigger value="draft">Drafts ({quotes.filter(q => q.status === 'draft').length})</TabsTrigger>
                <TabsTrigger value="sent">Sent ({quotes.filter(q => q.status === 'sent').length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({quotes.filter(q => q.status === 'approved').length})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="divide-y divide-slate-100">
                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No quotes found</p>
                      <p className="text-sm text-slate-400">Create your first quote to get started</p>
                    </div>
                  ) : (
                    filteredQuotes.map((quote) => {
                      const status = statusConfig[quote.status]
                      const StatusIcon = status.icon
                      return (
                        <div
                          key={quote.id}
                          className="flex items-center justify-between py-4 hover:bg-slate-50 px-2 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm">
                              {quote.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-slate-900 truncate">{quote.customer}</p>
                                <Badge variant="outline" className={`text-xs ${status.color}`}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {status.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 truncate">{quote.id} - {quote.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-4 shrink-0">
                            <div className="text-right hidden sm:block">
                              <p className="text-sm font-semibold text-slate-900">${quote.amount.toLocaleString()}</p>
                              <p className="text-xs text-slate-400">{quote.date}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Quote
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => duplicateQuote(quote)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
