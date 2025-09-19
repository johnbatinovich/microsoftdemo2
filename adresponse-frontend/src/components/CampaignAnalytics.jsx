import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CampaignAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Campaign Analytics</h1>
      </div>
      
      <Card>
        <CardContent className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600">Campaign performance metrics and insights will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignAnalytics
