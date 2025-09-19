from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime, timedelta
import random

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Sample data
sample_rfps = [
    {
        'id': 1,
        'name': 'Q3 Digital Media Campaign',
        'agency': 'MediaBuyers Agency',
        'advertiser': 'TechGadgets Inc.',
        'campaign_type': 'Digital Media',
        'budget_range': '$500K - $750K',
        'due_date': '2025-04-15',
        'status': 'In Progress',
        'progress': 72,
        'description': 'Comprehensive digital media campaign targeting tech-savvy consumers aged 25-45. Focus on mobile-first approach with emphasis on programmatic buying and social media integration.',
        'team_members': ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez'],
        'attachments': [
            {'name': 'TechGadgets_Q3_Digital_RFP.pdf', 'size': '2.3 MB'},
            {'name': 'TechGadgets_Media_Requirements.xlsx', 'size': '1.1 MB'}
        ]
    },
    {
        'id': 2,
        'name': 'Summer Retail Promotion',
        'agency': 'BrandMax Advertising',
        'advertiser': 'FashionRetail Co.',
        'campaign_type': 'Multi-platform',
        'budget_range': '$300K - $450K',
        'due_date': '2025-04-10',
        'status': 'In Progress',
        'progress': 45,
        'description': 'Summer retail promotion campaign focusing on fashion and lifestyle products. Multi-channel approach including digital, print, and outdoor advertising.',
        'team_members': ['Emma Wilson', 'David Park', 'Rachel Green', 'Tom Anderson'],
        'attachments': [
            {'name': 'FashionRetail_Summer_Campaign.pdf', 'size': '1.8 MB'}
        ]
    }
]

sample_knowledge_articles = [
    {
        'id': 1,
        'title': 'Digital Media Planning Best Practices',
        'category': 'Strategy',
        'type': 'Article',
        'content': 'Digital media planning is the strategic process of identifying and selecting optimal digital channels...',
        'tags': ['Digital', 'Planning', 'Strategy'],
        'views': 245,
        'rating': 4.8,
        'created_date': '2025-03-01',
        'author': 'Media Strategy Team'
    },
    {
        'id': 2,
        'title': 'Programmatic Advertising Fundamentals',
        'category': 'Technology',
        'type': 'Guide',
        'content': 'Programmatic advertising represents the automated buying and selling of digital advertising space...',
        'tags': ['Programmatic', 'RTB', 'Technology'],
        'views': 189,
        'rating': 4.6,
        'created_date': '2025-02-15',
        'author': 'Tech Innovation Team'
    },
    {
        'id': 3,
        'title': 'Advanced Media Buying Strategies for 2025',
        'category': 'Strategy',
        'type': 'Article',
        'content': 'This comprehensive guide covers the latest media buying strategies for 2025, including programmatic advertising trends, AI-powered optimization techniques, and cross-platform campaign management.',
        'tags': ['strategy', 'digital media', 'best practices'],
        'views': 0,
        'rating': 3.1,
        'created_date': '2025-09-19',
        'author': 'AI Assistant'
    }
]

# Routes
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/rfps', methods=['GET'])
def get_rfps():
    return jsonify(sample_rfps)

@app.route('/api/rfps/<int:rfp_id>', methods=['GET'])
def get_rfp(rfp_id):
    rfp = next((r for r in sample_rfps if r['id'] == rfp_id), None)
    if rfp:
        return jsonify(rfp)
    return jsonify({'error': 'RFP not found'}), 404

@app.route('/api/rfps/<int:rfp_id>/analyze', methods=['POST'])
def analyze_rfp(rfp_id):
    rfp = next((r for r in sample_rfps if r['id'] == rfp_id), None)
    if not rfp:
        return jsonify({'error': 'RFP not found'}), 404
    
    # Mock AI analysis
    analysis = {
        'confidence_score': random.randint(80, 95),
        'key_insights': [
            'High-value Digital Media opportunity with strong ROI potential',
            'Recommended focus on programmatic and social channels based on target demographics',
            'Timeline is well-structured with proper resource allocation',
            'Budget range of $500K - $750K aligns with market standards for this campaign type'
        ],
        'recommendations': [
            'Prioritize mobile-first creative development for maximum reach',
            'Allocate 60% budget to digital channels, 40% to Digital Media media',
            'Implement real-time optimization strategy with A/B testing',
            'Focus on data-driven attribution modeling for performance measurement'
        ],
        'risk_factors': [
            'Tight timeline may require additional resources'
        ]
    }
    return jsonify(analysis)

@app.route('/api/rfps/<int:rfp_id>/generate-proposal', methods=['POST'])
def generate_proposal(rfp_id):
    rfp = next((r for r in sample_rfps if r['id'] == rfp_id), None)
    if not rfp:
        return jsonify({'error': 'RFP not found'}), 404
    
    # Mock proposal generation
    proposal = {
        'executive_summary': f"We are pleased to present our comprehensive media proposal for {rfp['advertiser']}'s {rfp['name']}. Our strategic approach leverages data-driven insights and innovative Digital Media solutions to maximize your investment and achieve measurable results.",
        'key_highlights': [
            'Integrated Digital Media strategy',
            'Advanced targeting and optimization capabilities',
            'Transparent reporting and performance tracking',
            'Dedicated account management and support'
        ],
        'investment': f"Total Investment: {rfp['budget_range']}",
        'timeline': '12-week campaign execution with 2-week setup period',
        'deliverables': [
            'Campaign strategy and media plan',
            'Creative asset development and optimization',
            'Real-time campaign monitoring and optimization',
            'Comprehensive performance reporting'
        ]
    }
    return jsonify(proposal)

@app.route('/api/rfps/<int:rfp_id>/quality-check', methods=['POST'])
def quality_check(rfp_id):
    # Mock quality assessment
    quality_scores = {
        'overall_score': random.randint(85, 95),
        'content_completeness': random.randint(90, 98),
        'strategic_alignment': random.randint(85, 95),
        'budget_accuracy': random.randint(80, 90),
        'timeline_feasibility': random.randint(90, 98),
        'compliance_legal': random.randint(95, 99)
    }
    return jsonify(quality_scores)

@app.route('/api/knowledge-base', methods=['GET'])
def get_knowledge_base():
    return jsonify(sample_knowledge_articles)

@app.route('/api/knowledge-base', methods=['POST'])
def create_article():
    data = request.get_json()
    
    new_article = {
        'id': len(sample_knowledge_articles) + 1,
        'title': data.get('title', ''),
        'category': data.get('category', 'Strategy'),
        'type': data.get('type', 'Article'),
        'content': data.get('content', ''),
        'tags': data.get('tags', '').split(', ') if data.get('tags') else [],
        'views': 0,
        'rating': 3.1,
        'created_date': datetime.now().strftime('%Y-%m-%d'),
        'author': 'AI Assistant'
    }
    
    sample_knowledge_articles.append(new_article)
    return jsonify(new_article), 201

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    stats = {
        'active_rfps': len([r for r in sample_rfps if r['status'] == 'In Progress']),
        'pending_placements': 87,
        'ai_response_rate': 78,
        'proposal_win_rate': 32,
        'total_articles': len(sample_knowledge_articles),
        'total_views': sum(article['views'] for article in sample_knowledge_articles),
        'avg_rating': round(sum(article['rating'] for article in sample_knowledge_articles) / len(sample_knowledge_articles), 1),
        'categories': 8
    }
    return jsonify(stats)

@app.route('/api/import-rfp', methods=['POST'])
def import_rfp():
    data = request.get_json()
    
    # Mock RFP import
    new_rfp = {
        'id': len(sample_rfps) + 1,
        'name': data.get('rfp_name', 'Imported RFP'),
        'agency': data.get('agency_name', 'Unknown Agency'),
        'advertiser': data.get('advertiser_client', 'Unknown Client'),
        'campaign_type': data.get('campaign_type', 'Digital Media'),
        'budget_range': data.get('budget_range', '$100K - $500K'),
        'due_date': data.get('due_date', '2025-05-01'),
        'status': 'New',
        'progress': 0,
        'description': data.get('description', 'Imported RFP - details to be updated'),
        'team_members': data.get('team_members', []),
        'attachments': []
    }
    
    sample_rfps.append(new_rfp)
    return jsonify(new_rfp), 201

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
