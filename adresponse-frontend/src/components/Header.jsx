import { Bell, Settings, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white h-12 flex items-center px-4 shadow-sm">
      <div className="flex items-center space-x-4 flex-1">
        {/* Dynamics 365 Logo and Branding */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          </div>
          <span className="text-sm font-medium">Dynamics 365 Sales</span>
          <span className="text-blue-200">|</span>
          <span className="text-sm font-semibold">AdResponse</span>
        </div>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center space-x-2">
        {/* Navigation Items */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 text-xs">
          Dashboard
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 text-xs">
          Media Opportunities
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 text-xs">
          AdResponse
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 text-xs">
          Settings
        </Button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-1 ml-4">
          <span className="text-xs">JD</span>
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-semibold">
            1
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
