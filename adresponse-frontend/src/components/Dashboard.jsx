import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Upload,
  Plus,
  Eye,
  Edit,
  Search,
  BarChart3,
  FileCheck,
  Bot,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentRFPs, setRecentRFPs] = useState([])
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      message: "Hello John! I'm your AI Media RFP Assistant. Here's what's happening today:",
      time: '9:05 AM'
    },
    {
      type: 'assistant',
      message: "• MediaBuyers Agency RFP is due in 8 days (72% complete)\n• BrandMax Advertising RFP needs final review\n• GlobalBrands Inc. RFP was just assigned to your team",
      time: '9:05 AM'
    },
    {
      type: 'assistant',
      message: "Would you like me to help with any of these media RFPs?",
      time: '9:05 AM'
    }
  ])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
        setRecentRFPs(data.recent_rfps)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Set mock data if API fails
      setStats({
        active_rfps: 12,
        pending_placements: 87,
        ai_response_rate: 78,
        win_rate: 32,
        due_this_week: 4,
        completion_rate: 68,
        potential_revenue: 4.2
      })
      setRecentRFPs([
        {
          id: 1,
          name: 'Q3 Digital Media Campaign RFP',
          agency_name: 'MediaBuyers Agency',
          status: 'In Progress',
          completion_percentage: 72,
          due_date: '2025-04-15',
          updated_at: '2025-04-15T14:15:00'
        },
        {
          id: 2,
          name: 'Summer Multichannel Campaign RFP',
          agency_name: 'BrandMax Advertising',
          status: 'Under Review',
          completion_percentage: 95,
          due_date: '2025-04-22',
          updated_at: '2025-04-22T16:30:00'
        },
        {
          id: 3,
          name: 'Product Launch Campaign RFP',
          agency_name: 'GlobalBrands Inc.',
          status: 'New',
          completion_percentage: 12,
          due_date: '2025-05-05',
          updated_at: '2025-05-05T10:00:00'
        }
      ])
    }
  }

  const createSampleData = async () => {
    try {
      const response = await fetch('/api/rfps/sample-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (data.success) {
        fetchDashboardData()
      }
    } catch (error) {
      console.error('Error creating sample data:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'New': return 'bg-blue-100 text-blue-800'
      case 'Urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const sendMessage = () => {
    if (!chatMessage.trim()) return
    
    const newMessage = {
      type: 'user',
      message: chatMessage,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    }
    
    setChatMessages([...chatMessages, newMessage])
    setChatMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Let's focus on the MediaBuyers Agency RFP. What sections still need work?",
        "I can help analyze the requirements and generate proposal content. Which RFP would you like to work on?",
        "I've reviewed the latest submissions. The BrandMax RFP looks ready for final review."
      ]
      
      const aiResponse = {
        type: 'assistant',
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })
      }
      
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Media RFP Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Button onClick={createSampleData} variant="outline" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Media RFP</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Media RFP</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Media RFPs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active_rfps}</p>
                <p className="text-xs text-green-600">+3 from last month</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Ad Placements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending_placements}</p>
                <p className="text-xs text-green-600">+12 from last week</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ai_response_rate}%</p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Media Proposal Win Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.win_rate}%</p>
                <p className="text-xs text-green-600">+7% from last quarter</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Media RFPs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Media RFPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRFPs.map((rfp) => (
                  <div key={rfp.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{rfp.name}</h3>
                        <Badge className={getStatusColor(rfp.status)}>
                          {rfp.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rfp.agency_name}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Placements:</span>
                          <span className="text-xs font-medium">{rfp.completion_percentage}% completed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Team Members:</span>
                          <span className="text-xs font-medium">4 collaborators</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Last Updated:</span>
                          <span className="text-xs font-medium">Today at 2:15 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit Proposal
                      </Button>
                      <Link to={`/rfp/${rfp.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View RFP
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Link to="/active-rfps">
                    <Button variant="outline" className="w-full">
                      View All Media RFPs
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Media Assistant */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span>AI Media Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[400px]">
              {/* Chat Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent Actions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Agent Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                    <Search className="w-4 h-4 mb-1" />
                    <span className="text-xs">Analyze Media RFP</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                    <BarChart3 className="w-4 h-4 mb-1" />
                    <span className="text-xs">Extract Placements</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                    <FileText className="w-4 h-4 mb-1" />
                    <span className="text-xs">Generate Proposals</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                    <FileCheck className="w-4 h-4 mb-1" />
                    <span className="text-xs">Quality Check</span>
                  </Button>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Deadlines</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">MediaBuyers Agency</span>
                    <Badge variant="destructive" className="text-xs">Apr 15</Badge>
                  </div>
                  <div className="text-xs text-gray-600">Q3 Digital Media Campaign RFP</div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">BrandMax Advertising</span>
                    <Badge variant="outline" className="text-xs">Apr 22</Badge>
                  </div>
                  <div className="text-xs text-gray-600">Summer Multichannel Campaign RFP</div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">GlobalBrands Inc.</span>
                    <Badge className="bg-cyan-100 text-cyan-800 text-xs">May 5</Badge>
                  </div>
                  <div className="text-xs text-gray-600">Product Launch Campaign RFP</div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask the AI media assistant..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
