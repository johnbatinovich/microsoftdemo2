import { Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      
      <Card>
        <CardContent className="text-center py-12">
          <SettingsIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Application Settings</h3>
          <p className="text-gray-600">Configure your AdResponse preferences and settings.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
