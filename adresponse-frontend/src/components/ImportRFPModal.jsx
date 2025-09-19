import { useState, useEffect } from 'react'
import { 
  X, 
  Upload, 
  Mail, 
  Link as LinkIcon, 
  FileText, 
  Calendar,
  DollarSign,
  Users,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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

const ImportRFPModal = ({ isOpen, onClose, onImportSuccess }) => {
  const [importMethod, setImportMethod] = useState('email')
  const [selectedEmail, setSelectedEmail] = useState('')
  const [emailRFPs, setEmailRFPs] = useState([])
  const [rfpData, setRfpData] = useState({
    rfp_name: '',
    agency_name: '',
    advertiser_client_name: '',
    campaign_type: '',
    due_date: '',
    budget_range: '',
    team_members: [],
    ai_processing_enabled: true
  })
  const [selectedAttachments, setSelectedAttachments] = useState([])
  const [teamMembers, setTeamMembers] = useState([
    { name: 'John Doe', role: 'Media Director', selected: false },
    { name: 'Amanda Smith', role: 'Digital Strategist', selected: false },
    { name: 'Robert Johnson', role: 'Ad Operations', selected: false },
    { name: 'Maria Lopez', role: 'Sales Manager', selected: false }
  ])

  useEffect(() => {
    if (isOpen) {
      fetchEmailRFPs()
    }
  }, [isOpen])

  const fetchEmailRFPs = async () => {
    try {
      const response = await fetch('/api/emails/rfps')
      const data = await response.json()
      if (data.success) {
        setEmailRFPs(data.emails)
      }
    } catch (error) {
      console.error('Error fetching email RFPs:', error)
      // Set mock data
      setEmailRFPs([
        {
          id: 1,
          subject: 'MediaBuyers Agency - Q3 Digital Campaign RFP (2 attachments)',
          sender: 'MediaBuyers Agency',
          attachments: [
            { filename: 'TechGadgets_Q3_Digital_RFP.pdf', type: 'Primary RFP' },
            { filename: 'TechGadgets_Media_Requirements.xlsx', type: 'Supporting' }
          ]
        },
        {
          id: 2,
          subject: 'BrandMax Advertising - Summer Retail Promotion RFP (1 attachment)',
          sender: 'BrandMax Advertising',
          attachments: [
            { filename: 'Summer_Retail_RFP.pdf', type: 'Primary RFP' }
          ]
        },
        {
          id: 3,
          subject: 'DigitalFirst Agency - Holiday Campaign Planning RFP (3 attachments)',
          sender: 'DigitalFirst Agency',
          attachments: [
            { filename: 'Holiday_Campaign_RFP.pdf', type: 'Primary RFP' },
            { filename: 'Media_Requirements.xlsx', type: 'Supporting' },
            { filename: 'Brand_Guidelines.pdf', type: 'Supporting' }
          ]
        },
        {
          id: 4,
          subject: 'AdVantage Media - B2B Tech Solutions Campaign RFP (1 attachment)',
          sender: 'AdVantage Media',
          attachments: [
            { filename: 'B2B_Tech_RFP.pdf', type: 'Primary RFP' }
          ]
        }
      ])
    }
  }

  const handleEmailSelection = (emailId) => {
    setSelectedEmail(emailId)
    const email = emailRFPs.find(e => e.id === parseInt(emailId))
    if (email) {
      // Auto-populate form based on email selection
      if (email.sender === 'MediaBuyers Agency') {
        setRfpData({
          rfp_name: 'Q3 Digital Media Campaign',
          agency_name: 'MediaBuyers Agency',
          advertiser_client_name: 'TechGadgets Inc.',
          campaign_type: 'Digital Media',
          due_date: '2025-04-15',
          budget_range: '$500K - $750K',
          team_members: [],
          ai_processing_enabled: true
        })
      } else if (email.sender === 'BrandMax Advertising') {
        setRfpData({
          rfp_name: 'Summer Retail Promotion',
          agency_name: 'BrandMax Advertising',
          advertiser_client_name: 'FashionRetail Co.',
          campaign_type: 'Multi-platform',
          due_date: '2025-04-10',
          budget_range: '$300K - $450K',
          team_members: [],
          ai_processing_enabled: true
        })
      }
      setSelectedAttachments(email.attachments)
    }
  }

  const handleTeamMemberToggle = (index) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index].selected = !updatedMembers[index].selected
    setTeamMembers(updatedMembers)
    
    const selectedMembers = updatedMembers
      .filter(member => member.selected)
      .map(member => ({ name: member.name, role: member.role }))
    
    setRfpData({ ...rfpData, team_members: selectedMembers })
  }

  const handleImport = async () => {
    try {
      const response = await fetch('/api/rfps/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          import_method: importMethod,
          email_id: selectedEmail,
          ...rfpData
        })
      })
      
      const data = await response.json()
      if (data.success) {
        alert('RFP imported successfully!')
        onImportSuccess(data.rfp)
        onClose()
        // Reset form
        setRfpData({
          rfp_name: '',
          agency_name: '',
          advertiser_client_name: '',
          campaign_type: '',
          due_date: '',
          budget_range: '',
          team_members: [],
          ai_processing_enabled: true
        })
        setSelectedEmail('')
        setSelectedAttachments([])
      } else {
        alert('Error importing RFP: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error importing RFP:', error)
      alert('Error importing RFP. Please try again.')
    }
  }

  const selectedEmailData = emailRFPs.find(e => e.id === parseInt(selectedEmail))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Import Media RFP</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Import Method Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Import Method</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="email"
                  name="import_method"
                  value="email"
                  checked={importMethod === 'email'}
                  onChange={(e) => setImportMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="email" className="text-sm text-gray-700">From Email Attachment</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="upload"
                  name="import_method"
                  value="upload"
                  checked={importMethod === 'upload'}
                  onChange={(e) => setImportMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="upload" className="text-sm text-gray-700">Upload RFP Document</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="url"
                  name="import_method"
                  value="url"
                  checked={importMethod === 'url'}
                  onChange={(e) => setImportMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="url" className="text-sm text-gray-700">From URL/Portal Link</label>
              </div>
            </div>
          </div>

          {/* Email Selection */}
          {importMethod === 'email' && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Email with RFP Attachment
              </Label>
              <Select value={selectedEmail} onValueChange={handleEmailSelection}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an email..." />
                </SelectTrigger>
                <SelectContent>
                  {emailRFPs.map((email) => (
                    <SelectItem key={email.id} value={email.id.toString()}>
                      {email.subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Attachments Display */}
          {selectedEmailData && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Attachments</Label>
              <div className="space-y-2">
                {selectedEmailData.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{attachment.filename}</span>
                    </div>
                    <Badge className={attachment.type === 'Primary RFP' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                      {attachment.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RFP Form */}
          {selectedEmail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">RFP Name</Label>
                  <Input
                    value={rfpData.rfp_name}
                    onChange={(e) => setRfpData({ ...rfpData, rfp_name: e.target.value })}
                    placeholder="Enter RFP name"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Agency Name</Label>
                  <Input
                    value={rfpData.agency_name}
                    onChange={(e) => setRfpData({ ...rfpData, agency_name: e.target.value })}
                    placeholder="Enter agency name"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Campaign Type</Label>
                  <Select 
                    value={rfpData.campaign_type} 
                    onValueChange={(value) => setRfpData({ ...rfpData, campaign_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Digital Media">Digital Media</SelectItem>
                      <SelectItem value="Multi-platform">Multi-platform</SelectItem>
                      <SelectItem value="Broadcast & Digital">Broadcast & Digital</SelectItem>
                      <SelectItem value="Digital & Social">Digital & Social</SelectItem>
                      <SelectItem value="B2B Digital">B2B Digital</SelectItem>
                      <SelectItem value="Multi-channel">Multi-channel</SelectItem>
                      <SelectItem value="Mobile & Social">Mobile & Social</SelectItem>
                      <SelectItem value="Integrated Media">Integrated Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Budget Range</Label>
                  <Select 
                    value={rfpData.budget_range} 
                    onValueChange={(value) => setRfpData({ ...rfpData, budget_range: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500K - $750K">$500K - $750K</SelectItem>
                      <SelectItem value="$300K - $450K">$300K - $450K</SelectItem>
                      <SelectItem value="$1M - $1.5M">$1M - $1.5M</SelectItem>
                      <SelectItem value="$250K - $400K">$250K - $400K</SelectItem>
                      <SelectItem value="$150K - $200K">$150K - $200K</SelectItem>
                      <SelectItem value="$400K - $600K">$400K - $600K</SelectItem>
                      <SelectItem value="$200K - $350K">$200K - $350K</SelectItem>
                      <SelectItem value="$350K - $500K">$350K - $500K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Advertiser/Client Name</Label>
                  <Input
                    value={rfpData.advertiser_client_name}
                    onChange={(e) => setRfpData({ ...rfpData, advertiser_client_name: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                  <Input
                    type="date"
                    value={rfpData.due_date}
                    onChange={(e) => setRfpData({ ...rfpData, due_date: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Assign Team Members</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          checked={member.selected}
                          onCheckedChange={() => handleTeamMemberToggle(index)}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-gray-500">({member.role})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple team members</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={rfpData.ai_processing_enabled}
                    onCheckedChange={(checked) => setRfpData({ ...rfpData, ai_processing_enabled: checked })}
                  />
                  <Label className="text-sm text-gray-700">
                    Enable AI processing for automatic question extraction and response generation
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!selectedEmail}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Import RFP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportRFPModal
