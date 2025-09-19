import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const TeamCollaboration = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Team Collaboration</h1>
      </div>
      
      <Card>
        <CardContent className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Team Workspace</h3>
          <p className="text-gray-600">Collaborate with team members on RFP projects.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamCollaboration
