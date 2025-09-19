import { FileCheck, Bot } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const QualityChecker = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FileCheck className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Proposal Quality Checker</h1>
      </div>
      
      <Card>
        <CardContent className="text-center py-12">
          <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI Quality Assessment</h3>
          <p className="text-gray-600 mb-4">Analyze proposal quality and get improvement recommendations.</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Check Quality
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default QualityChecker
