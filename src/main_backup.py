import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# Serve React app
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_assets(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# API Routes with mock data
@app.route('/api/dashboard/stats')
def get_dashboard_stats():
    return jsonify({
        'success': True,
        'stats': {
            'active_rfps': 12,
            'pending_placements': 87,
            'ai_response_rate': 78,
            'win_rate': 32,
            'due_this_week': 4,
            'completion_rate': 68,
            'potential_revenue': 4.2
        },
        'recent_rfps': [
            {
                'id': 1,
                'name': 'Q3 Digital Media Campaign RFP',
                'agency_name': 'MediaBuyers Agency',
                'status': 'In Progress',
                'completion_percentage': 72,
                'due_date': '2025-04-15',
                'updated_at': '2025-04-15T14:15:00'
            },
            {
                'id': 2,
                'name': 'Summer Multichannel Campaign RFP',
                'agency_name': 'BrandMax Advertising',
                'status': 'Under Review',
                'completion_percentage': 95,
                'due_date': '2025-04-22',
                'updated_at': '2025-04-22T16:30:00'
            },
            {
                'id': 3,
                'name': 'Product Launch Campaign RFP',
                'agency_name': 'GlobalBrands Inc.',
                'status': 'New',
                'completion_percentage': 12,
                'due_date': '2025-05-05',
                'updated_at': '2025-05-05T10:00:00'
            }
        ]
    })

@app.route('/api/rfps')
def get_rfps():
    return jsonify({
        'success': True,
        'rfps': [
            {
                'id': 1,
                'name': 'Q3 Digital Media Campaign',
                'agency_name': 'MediaBuyers Agency',
                'advertiser_client_name': 'TechGadgets Inc.',
                'campaign_type': 'Digital Media',
                'budget_range': '$500K - $750K',
                'due_date': '2025-04-15',
                'status': 'In Progress',
                'completion_percentage': 72
            },
            {
                'id': 2,
                'name': 'Summer Retail Promotion',
                'agency_name': 'BrandMax Advertising',
                'advertiser_client_name': 'FashionRetail Co.',
                'campaign_type': 'Multi-platform',
                'budget_range': '$300K - $450K',
                'due_date': '2025-04-10',
                'status': 'In Progress',
                'completion_percentage': 45
            },
            {
                'id': 3,
                'name': 'Fall TV Sponsorship Package',
                'agency_name': 'GlobalMedia Partners',
                'advertiser_client_name': 'LuxuryCars Inc.',
                'campaign_type': 'Broadcast & Digital',
                'budget_range': '$1M - $1.5M',
                'due_date': '2025-04-22',
                'status': 'Completed',
                'completion_percentage': 100
            },
            {
                'id': 4,
                'name': 'Holiday Campaign Planning',
                'agency_name': 'DigitalFirst Agency',
                'advertiser_client_name': 'HomeGoods Plus',
                'campaign_type': 'Digital & Social',
                'budget_range': '$250K - $400K',
                'due_date': '2025-04-12',
                'status': 'Urgent',
                'completion_percentage': 30
            }
        ],
        'pages': 1
    })

@app.route('/api/rfps/<int:rfp_id>')
def get_rfp_detail(rfp_id):
    return jsonify({
        'success': True,
        'rfp': {
            'id': rfp_id,
            'name': 'Q3 Digital Media Campaign',
            'agency_name': 'MediaBuyers Agency',
            'advertiser_client_name': 'TechGadgets Inc.',
            'campaign_type': 'Digital Media',
            'budget_range': '$500K - $750K',
            'due_date': '2025-04-15',
            'status': 'In Progress',
            'completion_percentage': 72,
            'content': 'Comprehensive digital media campaign targeting tech-savvy consumers...',
            'team_members': [
                {'name': 'John Doe', 'role': 'Media Director'},
                {'name': 'Amanda Smith', 'role': 'Digital Strategist'},
                {'name': 'Robert Johnson', 'role': 'Ad Operations'},
                {'name': 'Maria Lopez', 'role': 'Sales Manager'}
            ],
            'attachments': [
                {'filename': 'TechGadgets_Q3_Digital_RFP.pdf', 'type': 'Primary RFP'},
                {'filename': 'TechGadgets_Media_Requirements.xlsx', 'type': 'Supporting'}
            ]
        }
    })

@app.route('/api/rfps/<int:rfp_id>/analyze', methods=['POST'])
def analyze_rfp(rfp_id):
    return jsonify({
        'success': True,
        'analysis': {
            'status': 'completed',
            'insights': [
                'High-value digital media opportunity with strong ROI potential',
                'Recommended focus on programmatic and social channels',
                'Timeline is aggressive but achievable with proper resource allocation'
            ],
            'recommendations': [
                'Prioritize mobile-first creative development',
                'Allocate 60% budget to digital channels',
                'Implement real-time optimization strategy'
            ],
            'confidence_score': 0.87
        }
    })

@app.route('/api/emails/rfps')
def get_email_rfps():
    return jsonify({
        'success': True,
        'emails': [
            {
                'id': 1,
                'subject': 'MediaBuyers Agency - Q3 Digital Campaign RFP (2 attachments)',
                'sender': 'MediaBuyers Agency',
                'attachments': [
                    {'filename': 'TechGadgets_Q3_Digital_RFP.pdf', 'type': 'Primary RFP'},
                    {'filename': 'TechGadgets_Media_Requirements.xlsx', 'type': 'Supporting'}
                ]
            },
            {
                'id': 2,
                'subject': 'BrandMax Advertising - Summer Retail Promotion RFP (1 attachment)',
                'sender': 'BrandMax Advertising',
                'attachments': [
                    {'filename': 'Summer_Retail_RFP.pdf', 'type': 'Primary RFP'}
                ]
            }
        ]
    })

@app.route('/api/rfps/import', methods=['POST'])
def import_rfp():
    return jsonify({'success': True, 'message': 'RFP imported successfully'})

@app.route('/api/rfps/sample-data', methods=['POST'])
def create_sample_data():
    return jsonify({'success': True, 'message': 'Sample data created'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
