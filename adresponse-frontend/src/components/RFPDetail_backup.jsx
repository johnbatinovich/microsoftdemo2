import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Search,
  BarChart3,
  FileCheck,
  Bot,
  Edit,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const RFPDetail = () => {
  const { id } = useParams()
  const [rfp, setRfp] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRFPDetails()
  }, [id])

  const fetchRFPDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/rfps/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setRfp(data.rfp)
      }
    } catch (error) {
      console.error('Error fetching RFP details:', error)
      // Set mock data
      setRfp({
        id: parseInt(id),
        name: 'Q3 Digital Media Campaign',
        agency_name: 'MediaBuyers Agency',
        advertiser_client_name: 'TechGadgets Inc.',
        campaign_type: 'Digital Media',
        budget_range: '$500K - $750K',
        due_date: '2025-04-15',
        status: 'In Progress',
        completion_percentage: 72,
        content: 'Comprehensive digital media campaign targeting tech-savvy consumers...',
        team_members: [
          { name: 'John Doe', role: 'Media Director' },
          { name: 'Amanda Smith', role: 'Digital Strategist' },
          { name: 'Robert Johnson', role: 'Ad Operations' },
          { name: 'Maria Lopez', role: 'Sales Manager' }
        ],
        attachments: [
          { filename: 'TechGadgets_Q3_Digital_RFP.pdf', type: 'Primary RFP' },
          { filename: 'TechGadgets_Media_Requirements.xlsx', type: 'Supporting' }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeRFP = async () => {
    try {
      const response = await fetch(`/api/rfps/${id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      
      if (data.success) {
        setAnalysisResult(data.analysis)
        setActiveTab('analysis')
      }
    } catch (error) {
      console.error('Error analyzing RFP:', error)
      // Set mock analysis
      setAnalysisResult({
        status: 'completed',
        insights: [
          'High-value digital media opportunity with strong ROI potential',
          'Recommended focus on programmatic and social channels',
          'Timeline is aggressive but achievable with proper resource allocation'
        ],
        recommendations: [
          'Prioritize mobile-first creative development',
          'Allocate 60% budget to digital channels',
          'Implement real-time optimization strategy'
        ],
        confidence_score: 0.87
      })
      setActiveTab('analysis')
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

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  if (!rfp) {
    return <div className="text-center text-gray-500">RFP not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/active-rfps">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RFPs
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{rfp.name}</h1>
            <p className="text-gray-600">{rfp.agency_name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(rfp.status)}>
            {rfp.status} ({rfp.completion_percentage}%)
          </Badge>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit RFP
          </Button>
        </div>
      </div>

      {/* RFP Details Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* RFP Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>RFP Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Agency Name</label>
                      <p className="text-sm text-gray-900">{rfp.agency_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Advertiser/Client</label>
                      <p className="text-sm text-gray-900">{rfp.advertiser_client_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Campaign Type</label>
                      <p className="text-sm text-gray-900">{rfp.campaign_type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget Range</label>
                      <p className="text-sm text-gray-900">{rfp.budget_range}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Due Date</label>
                      <p className="text-sm text-gray-900">{new Date(rfp.due_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <Badge className={getStatusColor(rfp.status)}>
                        {rfp.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Progress</label>
                    <div className="mt-2">
                      <Progress value={rfp.completion_percentage} className="w-full" />
                      <p className="text-sm text-gray-600 mt-1">{rfp.completion_percentage}% completed</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-sm text-gray-900 mt-1">{rfp.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions & Attachments */}
            <div className="space-y-6">
              {/* AI Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span>AI Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleAnalyzeRFP}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Analyze RFP
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Extract Placements
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Proposal
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Quality Check
                  </Button>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {rfp.attachments?.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{attachment.filename}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {analysisResult ? (
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <ul className="space-y-1">
                    {analysisResult.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-gray-700">• {insight}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700">• {rec}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Confidence Score</h4>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysisResult.confidence_score * 100} className="flex-1" />
                    <span className="text-sm font-medium">{Math.round(analysisResult.confidence_score * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Available</h3>
                <p className="text-gray-600 mb-4">Click "Analyze RFP" to generate AI-powered insights</p>
                <Button onClick={handleAnalyzeRFP}>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze RFP
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="proposal" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Proposal Generated</h3>
              <p className="text-gray-600 mb-4">Generate a proposal using AI assistance</p>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Generate Proposal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rfp.team_members?.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default RFPDetail
