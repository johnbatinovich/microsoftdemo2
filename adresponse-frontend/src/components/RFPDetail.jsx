import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  FileText, 
  Users, 
  Calendar, 
  DollarSign, 
  Building, 
  Target,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Download,
  Share,
  BarChart3,
  Lightbulb,
  Shield,
  Award
} from 'lucide-react';

const RFPDetailEnhanced = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rfp, setRfp] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [qualityChecking, setQualityChecking] = useState(false);

  useEffect(() => {
    fetchRFPDetail();
  }, [id]);

  const fetchRFPDetail = async () => {
    try {
      const response = await fetch(`/api/rfps/${id}`);
      const data = await response.json();
      if (data.success) {
        setRfp(data.rfp);
      }
    } catch (error) {
      console.error('Error fetching RFP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeRFP = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch(`/api/rfps/${id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setRfp(prev => ({ ...prev, analysis: data.analysis }));
        setActiveTab('analysis');
      } else {
        alert('Error analyzing RFP: ' + data.error);
      }
    } catch (error) {
      console.error('Error analyzing RFP:', error);
      alert('Error analyzing RFP. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerateProposal = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`/api/rfps/${id}/generate-proposal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setRfp(prev => ({ ...prev, proposal: data.proposal }));
        setActiveTab('proposal');
      } else {
        alert('Error generating proposal: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Error generating proposal. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleQualityCheck = async () => {
    if (!rfp.proposal) {
      alert('Please generate a proposal first before running quality check.');
      return;
    }

    setQualityChecking(true);
    try {
      const response = await fetch(`/api/rfps/${id}/quality-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setRfp(prev => ({ ...prev, quality_check: data.quality_check }));
        alert(`Quality Check Complete! Overall Score: ${data.quality_check.overall_score}/100`);
      } else {
        alert('Error running quality check: ' + data.error);
      }
    } catch (error) {
      console.error('Error running quality check:', error);
      alert('Error running quality check. Please try again.');
    } finally {
      setQualityChecking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!rfp) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">RFP not found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/active-rfps')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to RFPs</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rfp.status)}`}>
            {rfp.status} ({rfp.completion_percentage}%)
          </span>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit RFP</span>
          </button>
        </div>
      </div>

      {/* RFP Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{rfp.name}</h1>
        <p className="text-lg text-gray-600">{rfp.agency_name}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'analysis', label: 'Analysis', icon: Brain },
            { id: 'proposal', label: 'Proposal', icon: Target },
            { id: 'team', label: 'Team', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* RFP Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">RFP Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                    <p className="text-gray-900">{rfp.agency_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advertiser/Client</label>
                    <p className="text-gray-900">{rfp.advertiser_client_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                    <p className="text-gray-900">{rfp.campaign_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                    <p className="text-gray-900">{rfp.budget_range}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <p className="text-gray-900">{new Date(rfp.due_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <p className="text-gray-900">{rfp.status}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rfp.completion_percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{rfp.completion_percentage}% completed</p>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-700 leading-relaxed">{rfp.content}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {!rfp.analysis ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis Not Started</h3>
                  <p className="text-gray-600 mb-6">
                    Run AI analysis to get insights, recommendations, and strategic guidance for this RFP.
                  </p>
                  <button
                    onClick={handleAnalyzeRFP}
                    disabled={analyzing}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        <span>Analyze RFP</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Analysis Results */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">AI Analysis Results</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Confidence Score:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${rfp.analysis.confidence_score * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {Math.round(rfp.analysis.confidence_score * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                        Key Insights
                      </h4>
                      <ul className="space-y-2">
                        {rfp.analysis.key_insights.map((insight, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {rfp.analysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ArrowLeft className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0 rotate-180" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Risk Factors */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                        Risk Factors
                      </h4>
                      <ul className="space-y-2">
                        {rfp.analysis.risk_factors.map((risk, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Success Metrics */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-green-500" />
                        Success Metrics
                      </h4>
                      <ul className="space-y-2">
                        {rfp.analysis.success_metrics.map((metric, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Award className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'proposal' && (
            <div className="space-y-6">
              {!rfp.proposal ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Proposal Not Generated</h3>
                  <p className="text-gray-600 mb-6">
                    Generate an AI-powered proposal based on the RFP requirements and analysis.
                  </p>
                  <button
                    onClick={handleGenerateProposal}
                    disabled={generating}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
                  >
                    {generating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Generate Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Proposal Header */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Media Proposal</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleQualityCheck}
                          disabled={qualityChecking}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {qualityChecking ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Checking...</span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" />
                              <span>Quality Check</span>
                            </>
                          )}
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Export PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Quality Check Results */}
                    {rfp.quality_check && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Quality Assessment</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">{rfp.quality_check.overall_score}</span>
                            <span className="text-gray-500">/100</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {rfp.quality_check.checks_performed.map((check, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{check.category}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{check.score}</span>
                                <div className={`w-2 h-2 rounded-full ${
                                  check.status === 'excellent' ? 'bg-green-500' : 
                                  check.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Proposal Sections */}
                    <div className="space-y-6">
                      {Object.entries(rfp.proposal.sections).map(([sectionKey, sectionContent]) => (
                        <div key={sectionKey} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                            {sectionKey.replace('_', ' ')}
                          </h4>
                          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {sectionContent}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Next Steps */}
                    {rfp.proposal.next_steps && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
                        <ul className="space-y-1">
                          {rfp.proposal.next_steps.map((step, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-4">
                {rfp.team_members && rfp.team_members.length > 0 ? (
                  rfp.team_members.map((memberId, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Team Member {memberId}</p>
                        <p className="text-sm text-gray-500">Role: Assigned</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No team members assigned yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              AI Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleAnalyzeRFP}
                disabled={analyzing}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Brain className="w-4 h-4" />
                <span>{analyzing ? 'Analyzing...' : 'Analyze RFP'}</span>
              </button>
              
              <button
                onClick={handleGenerateProposal}
                disabled={generating}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>{generating ? 'Generating...' : 'Generate Proposal'}</span>
              </button>
              
              <button
                onClick={handleQualityCheck}
                disabled={qualityChecking || !rfp.proposal}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>{qualityChecking ? 'Checking...' : 'Quality Check'}</span>
              </button>
            </div>
          </div>

          {/* Attachments */}
          {rfp.attachments && rfp.attachments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
              <div className="space-y-3">
                {rfp.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.filename}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">RFP Created</p>
                  <p className="text-xs text-gray-500">{new Date(rfp.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              {rfp.analysis && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">AI Analysis Completed</p>
                    <p className="text-xs text-gray-500">Confidence: {Math.round(rfp.analysis.confidence_score * 100)}%</p>
                  </div>
                </div>
              )}
              {rfp.proposal && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Proposal Generated</p>
                    <p className="text-xs text-gray-500">{new Date(rfp.proposal.generated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Due Date</p>
                  <p className="text-xs text-gray-500">{new Date(rfp.due_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFPDetailEnhanced;
