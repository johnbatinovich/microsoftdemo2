import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Upload,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ImportRFPModal from './ImportRFPModal'

const ActiveRFPs = () => {
  const [rfps, setRfps] = useState([])
  const [stats, setStats] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showImportModal, setShowImportModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRFPs()
    fetchStats()
  }, [currentPage, searchTerm, statusFilter])

  const fetchRFPs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage,
        per_page: 8,
        search: searchTerm,
        status: statusFilter
      })
      
      const response = await fetch(`/api/rfps?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setRfps(data.rfps)
        setTotalPages(data.pages)
      }
    } catch (error) {
      console.error('Error fetching RFPs:', error)
      // Set mock data if API fails
      setRfps([
        {
          id: 1,
          name: 'Q3 Digital Media Campaign',
          agency_name: 'MediaBuyers Agency',
          advertiser_client_name: 'TechGadgets Inc.',
          campaign_type: 'Digital Media',
          budget_range: '$500K - $750K',
          due_date: '2025-04-15',
          status: 'In Progress',
          completion_percentage: 72
        },
        {
          id: 2,
          name: 'Summer Retail Promotion',
          agency_name: 'BrandMax Advertising',
          advertiser_client_name: 'FashionRetail Co.',
          campaign_type: 'Multi-platform',
          budget_range: '$300K - $450K',
          due_date: '2025-04-10',
          status: 'In Progress',
          completion_percentage: 45
        },
        {
          id: 3,
          name: 'Fall TV Sponsorship Package',
          agency_name: 'GlobalMedia Partners',
          advertiser_client_name: 'LuxuryCars Inc.',
          campaign_type: 'Broadcast & Digital',
          budget_range: '$1M - $1.5M',
          due_date: '2025-04-22',
          status: 'Completed',
          completion_percentage: 100
        },
        {
          id: 4,
          name: 'Holiday Campaign Planning',
          agency_name: 'DigitalFirst Agency',
          advertiser_client_name: 'HomeGoods Plus',
          campaign_type: 'Digital & Social',
          budget_range: '$250K - $400K',
          due_date: '2025-04-12',
          status: 'Urgent',
          completion_percentage: 30
        },
        {
          id: 5,
          name: 'B2B Tech Solutions Campaign',
          agency_name: 'AdVantage Media',
          advertiser_client_name: 'EnterpriseCloud Solutions',
          campaign_type: 'B2B Digital',
          budget_range: '$150K - $200K',
          due_date: '2025-04-28',
          status: 'New',
          completion_percentage: 5
        },
        {
          id: 6,
          name: 'Financial Services Awareness',
          agency_name: 'MediaPlan Group',
          advertiser_client_name: 'TrustBank Financial',
          campaign_type: 'Multi-channel',
          budget_range: '$400K - $600K',
          due_date: '2025-04-18',
          status: 'In Progress',
          completion_percentage: 60
        },
        {
          id: 7,
          name: 'Mobile App Launch Campaign',
          agency_name: 'CreativeEdge Partners',
          advertiser_client_name: 'FitLife App',
          campaign_type: 'Mobile & Social',
          budget_range: '$200K - $350K',
          due_date: '2025-05-05',
          status: 'Not Started',
          completion_percentage: 0
        },
        {
          id: 8,
          name: 'CPG Brand Relaunch',
          agency_name: 'StrategyPlus Media',
          advertiser_client_name: 'EcoClean Products',
          campaign_type: 'Integrated Media',
          budget_range: '$350K - $500K',
          due_date: '2025-04-25',
          status: 'In Progress',
          completion_percentage: 25
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({
        active_rfps: 12,
        due_this_week: 4,
        completion_rate: 68,
        potential_revenue: 4.2
      })
    }
  }

  const getStatusColor = (status, percentage) => {
    switch (status) {
      case 'In Progress':
        return percentage > 50 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'New': return 'bg-blue-100 text-blue-800'
      case 'Urgent': return 'bg-red-100 text-red-800'
      case 'Not Started': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status, percentage) => {
    if (status === 'In Progress') {
      return `In Progress (${percentage}%)`
    }
    if (status === 'Completed') {
      return `Completed (${percentage}%)`
    }
    return status
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
          <h1 className="text-2xl font-semibold text-gray-900">Active Media RFPs</h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setShowImportModal(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </Button>
          <Button 
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowImportModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Import RFP</span>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Media RFP Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Active RFPs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active_rfps}</p>
              <p className="text-xs text-green-600">+3 this week</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Due This Week</p>
              <p className="text-2xl font-bold text-gray-900">{stats.due_this_week}</p>
              <p className="text-xs text-red-600">Urgent attention</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completion_rate}%</p>
              <p className="text-xs text-gray-600">Average across all RFPs</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.potential_revenue}M</p>
              <p className="text-xs text-gray-600">Estimated total value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RFP List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Media RFP List</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search RFPs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">Loading...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Name</TableHead>
                    <TableHead>Agency/Advertiser</TableHead>
                    <TableHead>Campaign Type</TableHead>
                    <TableHead>Budget Range</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rfps.map((rfp) => (
                    <TableRow key={rfp.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{rfp.name}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rfp.agency_name}</div>
                          {rfp.advertiser_client_name && (
                            <div className="text-sm text-gray-500">{rfp.advertiser_client_name}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{rfp.campaign_type}</TableCell>
                      <TableCell>{rfp.budget_range}</TableCell>
                      <TableCell>{formatDate(rfp.due_date)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(rfp.status, rfp.completion_percentage)}>
                          {getStatusText(rfp.status, rfp.completion_percentage)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link to={`/rfp/${rfp.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(8, rfps.length)} of {rfps.length} RFPs
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant={currentPage === 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </Button>
                    {totalPages > 1 && (
                      <Button
                        variant={currentPage === 2 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(2)}
                      >
                        2
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Import RFP Modal */}
      <ImportRFPModal 
        isOpen={showImportModal} 
        onClose={() => setShowImportModal(false)}
        onImportSuccess={() => {
          setShowImportModal(false)
          fetchRFPs()
        }}
      />
    </div>
  )
}

export default ActiveRFPs
