import { useState } from 'react'
import { Search, BookOpen, FileText, Video, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const MediaKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const articles = [
    {
      id: 1,
      title: 'Digital Media Planning Best Practices',
      category: 'Strategy',
      type: 'Article',
      description: 'Comprehensive guide to effective digital media planning and optimization strategies.',
      tags: ['Digital', 'Planning', 'Strategy'],
      lastUpdated: '2025-04-10'
    },
    {
      id: 2,
      title: 'Programmatic Advertising Fundamentals',
      category: 'Technology',
      type: 'Video',
      description: 'Understanding the basics of programmatic advertising and real-time bidding.',
      tags: ['Programmatic', 'RTB', 'Technology'],
      lastUpdated: '2025-04-08'
    },
    {
      id: 3,
      title: 'Media Mix Modeling Guide',
      category: 'Analytics',
      type: 'Document',
      description: 'Statistical approach to measuring the impact of various media channels.',
      tags: ['Analytics', 'Modeling', 'ROI'],
      lastUpdated: '2025-04-05'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Media Knowledge Base</h1>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Add Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {articles.map((article) => (
              <div key={article.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <Badge variant="outline">{article.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Category: {article.category}</span>
                      <span>Updated: {article.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MediaKnowledgeBase
