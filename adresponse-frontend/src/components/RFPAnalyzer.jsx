import { Search, Bot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const RFPAnalyzer = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Search className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-900">RFP Analyzer</h1>
      </div>
      
      <Card>
        <CardContent className="text-center py-12">
          <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered RFP Analysis</h3>
          <p className="text-gray-600 mb-4">Upload or select an RFP to get intelligent insights and recommendations.</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Start Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default RFPAnalyzer
