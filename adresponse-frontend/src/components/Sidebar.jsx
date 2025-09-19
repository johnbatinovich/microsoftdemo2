import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  BarChart3, 
  Settings,
  Search,
  FileCheck,
  Users,
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation()

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', count: null },
    { icon: FileText, label: 'Active Media RFPs', path: '/active-rfps', count: 12 },
    { icon: BookOpen, label: 'Media Knowledge Base', path: '/knowledge-base', count: null },
    { icon: BarChart3, label: 'Campaign Analytics', path: '/analytics', count: null },
    { icon: Settings, label: 'Settings', path: '/settings', count: null }
  ]

  const aiAgentItems = [
    { icon: Search, label: 'RFP Analyzer', path: '/rfp-analyzer' },
    { icon: FileText, label: 'Media Proposal Generator', path: '/proposal-generator' },
    { icon: FileCheck, label: 'Proposal Quality Checker', path: '/quality-checker' },
    { icon: Users, label: 'Team Collaboration', path: '/collaboration' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className={`fixed left-0 top-12 h-[calc(100vh-3rem)] bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <div className="absolute -right-3 top-4 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="w-6 h-6 p-0 bg-white border-gray-300 rounded-full shadow-sm"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </div>

      <div className="p-4">
        {/* ADRESPONSE Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
            {!collapsed && <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">ADRESPONSE</span>}
          </div>
          
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.count && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* AI AGENTS Section */}
        {!collapsed && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Bot className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">AI AGENTS</span>
            </div>
            
            <nav className="space-y-1">
              {aiAgentItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
