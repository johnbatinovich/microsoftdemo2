import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ActiveRFPs from './components/ActiveRFPs'
import RFPDetail from './components/RFPDetail'
import MediaKnowledgeBase from './components/MediaKnowledgeBase'
import CampaignAnalytics from './components/CampaignAnalytics'
import RFPAnalyzer from './components/RFPAnalyzer'
import ProposalGenerator from './components/ProposalGenerator'
import QualityChecker from './components/QualityChecker'
import TeamCollaboration from './components/TeamCollaboration'
import Settings from './components/Settings'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Dynamics 365 Header */}
        <Header />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          
          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/active-rfps" element={<ActiveRFPs />} />
                <Route path="/rfp/:id" element={<RFPDetail />} />
                <Route path="/knowledge-base" element={<MediaKnowledgeBase />} />
                <Route path="/analytics" element={<CampaignAnalytics />} />
                <Route path="/rfp-analyzer" element={<RFPAnalyzer />} />
                <Route path="/proposal-generator" element={<ProposalGenerator />} />
                <Route path="/quality-checker" element={<QualityChecker />} />
                <Route path="/collaboration" element={<TeamCollaboration />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
