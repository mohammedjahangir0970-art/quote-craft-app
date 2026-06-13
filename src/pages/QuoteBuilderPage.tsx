import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Plus,
  Trash2,
  ArrowLeft,
  Sparkles,
  Send,
  Eye,
  CheckCircle2,
  FileText,
  Loader2,
} from 'lucide-react'

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

const tradeTemplates: Record<string, { items: Omit<LineItem, 'id'>[]; notes: string }> = {
  electrical: {
    items: [
      { description: 'Service call / diagnostic', quantity: 1, unitPrice: 125 },
      { description: 'Labor - Licensed electrician (per hour)', quantity: 2, unitPrice: 95 },
      { description: 'Electrical panel inspection', quantity: 1, unitPrice: 75 },
    ],
    notes: 'All work performed by licensed electrician. Permit included if required. Work complies with NEC 2023 standards.',
  },
  plumbing: {
    items: [
      { description: 'Service call / diagnostic', quantity: 1, unitPrice: 95 },
      { description: 'Labor - Licensed plumber (per hour)', quantity: 2, unitPrice: 85 },
      { description: 'Pipe material & fittings', quantity: 1, unitPrice: 120 },
    ],
    notes: 'All work performed by licensed plumber. Warranty: 1 year on labor, manufacturer warranty on parts. Code compliant installation.',
  },
  hvac: {
    items: [
      { description: 'System diagnostic & inspection', quantity: 1, unitPrice: 150 },
      { description: 'Labor - HVAC technician (per hour)', quantity: 3, unitPrice: 110 },
      { description: 'Refrigerant / materials', quantity: 1, unitPrice: 200 },
    ],
    notes: 'EPA certified technicians. All refrigerant handling compliant with Section 608. System testing and calibration included.',
  },
  roofing: {
    items: [
      { description: 'Roof inspection & measurement', quantity: 1, unitPrice: 0 },
      { description: 'Labor - Roofing crew (per sq)', quantity: 25, unitPrice: 65 },
      { description: 'Underlayment & flashing', quantity: 1, unitPrice: 850 },
    ],
    notes: 'GAF or Owens Corning materials. 10-year workmanship warranty. HOA color approval documentation included.',
  },
  general: {
    items: [
      { description: 'Project consultation & design', quantity: 1, unitPrice: 250 },
      { description: 'Labor - General carpentry (per hour)', quantity: 8, unitPrice: 75 },
      { description: 'Materials & supplies', quantity: 1, unitPrice: 500 },
    ],
    notes: 'Licensed and insured. All subcontractors vetted and licensed. Work schedule provided upon approval.',
  },
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export default function QuoteBuilderPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'build' | 'preview'>('build')
  const [isAiGenerating, setIsAiGenerating] = useState(false)
  const [showAiDialog, setShowAiDialog] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [trade, setTrade] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [notes, setNotes] = useState('')
  const [taxRate, setTaxRate] = useState(8.25)
  const [includeTax, setIncludeTax] = useState(true)

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const tax = includeTax ? subtotal * (taxRate / 100) : 0
  const total = subtotal + tax

  const addLineItem = () => {
    setLineItems([...lineItems, { id: generateId(), description: '', quantity: 1, unitPrice: 0 }])
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id))
  }

  const loadTradeTemplate = (selectedTrade: string) => {
    setTrade(selectedTrade)
    const template = tradeTemplates[selectedTrade]
    if (template) {
      setLineItems(template.items.map(item => ({ ...item, id: generateId() })))
      setNotes(template.notes)
    }
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return
    setIsAiGenerating(true)
    setShowAiDialog(false)

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate contextual quote based on prompt
    const prompt = aiPrompt.toLowerCase()
    let template = tradeTemplates.general

    if (prompt.includes('electric') || prompt.includes('panel') || prompt.includes('outlet') || prompt.includes('wire')) {
      template = tradeTemplates.electrical
    } else if (prompt.includes('plumb') || prompt.includes('water heater') || prompt.includes('leak') || prompt.includes('pipe')) {
      template = tradeTemplates.plumbing
    } else if (prompt.includes('ac') || prompt.includes('air') || prompt.includes('heat') || prompt.includes('hvac') || prompt.includes('furnace')) {
      template = tradeTemplates.hvac
    } else if (prompt.includes('roof')) {
      template = tradeTemplates.roofing
    }

    // Customize based on prompt keywords
    const items = [...template.items]
    if (prompt.includes('emergency') || prompt.includes('urgent')) {
      items.unshift({ description: 'Emergency / after-hours service premium', quantity: 1, unitPrice: 195 })
    }
    if (prompt.includes('inspection')) {
      items.push({ description: 'Post-work inspection & documentation', quantity: 1, unitPrice: 85 })
    }

    setLineItems(items.map(item => ({ ...item, id: generateId() })))
    setNotes(`AI-generated quote based on: "${aiPrompt}"\n\n${template.notes}`)
    setJobDescription(aiPrompt)
    setIsAiGenerating(false)
    setAiPrompt('')
  }

  const handleSend = () => {
    setShowSuccessDialog(true)
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setStep('build')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send Quote
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-lg print:shadow-none">
            <CardContent className="p-8 lg:p-12">
              {/* HEADER */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">Quote<span className="text-blue-600">Craft</span></span>
                  </div>
                  <p className="text-sm text-slate-500">Professional Quoting</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-slate-900">QUOTE</h2>
                  <p className="text-sm text-slate-500">#{`QC-${Date.now().toString(36).toUpperCase().slice(0, 6)}`}</p>
                  <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* FROM / TO */}
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From</p>
                  <p className="font-semibold text-slate-900">Your Company Name</p>
                  <p className="text-sm text-slate-600">your@email.com</p>
                  <p className="text-sm text-slate-600">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">To</p>
                  <p className="font-semibold text-slate-900">{customerName || 'Customer Name'}</p>
                  {customerEmail && <p className="text-sm text-slate-600">{customerEmail}</p>}
                  {customerPhone && <p className="text-sm text-slate-600">{customerPhone}</p>}
                  {customerAddress && <p className="text-sm text-slate-600">{customerAddress}</p>}
                </div>
              </div>

              {/* JOB DESCRIPTION */}
              {jobDescription && (
                <div className="mb-8">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Job Description</p>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{jobDescription}</p>
                </div>
              )}

              {/* LINE ITEMS */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quote Details</p>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left text-sm font-semibold text-slate-700 pb-2">Description</th>
                      <th className="text-right text-sm font-semibold text-slate-700 pb-2">Qty</th>
                      <th className="text-right text-sm font-semibold text-slate-700 pb-2">Unit Price</th>
                      <th className="text-right text-sm font-semibold text-slate-700 pb-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-3 text-sm text-slate-700">{item.description || '-'}</td>
                        <td className="py-3 text-sm text-slate-700 text-right">{item.quantity}</td>
                        <td className="py-3 text-sm text-slate-700 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 text-sm text-slate-900 font-medium text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTALS */}
              <div className="flex justify-end mb-8">
                <div className="w-full sm:w-64">
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {includeTax && (
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-slate-600">Tax ({taxRate}%)</span>
                      <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between py-3">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* NOTES */}
              {notes && (
                <div className="mb-8">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes & Terms</p>
                  <p className="text-sm text-slate-600 whitespace-pre-line">{notes}</p>
                </div>
              )}

              {/* ACCEPTANCE */}
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <p className="text-sm font-semibold text-slate-900 mb-2">Ready to approve this quote?</p>
                <p className="text-sm text-slate-600 mb-4">Click the button below to accept this quote and get started.</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Quote Sent Successfully!
              </DialogTitle>
            </DialogHeader>
            <p className="text-slate-600">
              Your quote has been sent to {customerName || 'the customer'}. You will be notified when they view and approve it.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => { setShowSuccessDialog(false); setStep('build') }}>
                Create Another
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Create New Quote</h1>
              <p className="text-sm text-slate-500">Build a professional quote for your customer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep('preview')}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Quote
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - CUSTOMER INFO */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Job Address</Label>
                  <Textarea
                    id="address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="123 Main St, City, State"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quote Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="trade">Trade Type</Label>
                  <Select value={trade} onValueChange={loadTradeTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your trade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="general">General Contracting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tax" className="cursor-pointer">Include Tax</Label>
                  <Switch id="tax" checked={includeTax} onCheckedChange={setIncludeTax} />
                </div>
                {includeTax && (
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      step="0.25"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI ASSIST */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  AI Quote Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-3">
                  Describe the job and let AI generate the quote for you.
                </p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowAiDialog(true)}
                  disabled={isAiGenerating}
                >
                  {isAiGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - LINE ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the job in detail..."
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Line Items</CardTitle>
                <Button variant="outline" size="sm" onClick={addLineItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                {lineItems.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg">
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">No line items yet</p>
                    <p className="text-xs text-slate-400">Add items manually or use AI generation</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lineItems.map((item, index) => (
                      <div key={item.id} className="flex gap-3 items-start bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-400 font-medium mt-2.5 w-5">{index + 1}</span>
                        <div className="flex-1 grid sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <Input
                              value={item.description}
                              onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                              placeholder="Item description"
                              className="bg-white"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                              placeholder="Qty"
                              className="bg-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              placeholder="Unit $"
                              className="bg-white"
                            />
                          </div>
                          <div className="sm:col-span-1 flex items-center">
                            <p className="text-sm font-medium text-slate-900 text-right w-full">
                              ${(item.quantity * item.unitPrice).toFixed(0)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 shrink-0"
                          onClick={() => removeLineItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Payment terms, warranty info, special notes..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* TOTAL SUMMARY */}
            <Card className="bg-slate-900 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {includeTax && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Tax ({taxRate}%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-3 bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-blue-400">${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI DIALOG */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI Quote Generation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Describe the job in plain English. Our AI will generate a complete quote with line items, materials, and pricing.
            </p>
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: Replace a 50-gallon water heater in the basement with a tankless unit. Include removal of old unit, new gas line, and permit."
              rows={5}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAiGenerate} disabled={!aiPrompt.trim()}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Quote
              </Button>
              <Button variant="outline" onClick={() => setShowAiDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SUCCESS DIALOG */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Quote Saved!
            </DialogTitle>
          </DialogHeader>
          <p className="text-slate-600">
            Your quote has been saved. You can send it to the customer when ready.
          </p>
          <div className="flex gap-3 mt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setStep('preview')}>
              Preview Quote
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
