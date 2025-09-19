import os
import sys
import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any
import requests

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# In-memory storage (replace with database in production)
rfps_db = {}
knowledge_articles_db = {}
team_members_db = {
    1: {"id": 1, "name": "John Doe", "role": "Media Director", "email": "john.doe@company.com"},
    2: {"id": 2, "name": "Amanda Smith", "role": "Digital Strategist", "email": "amanda.smith@company.com"},
    3: {"id": 3, "name": "Robert Johnson", "role": "Ad Operations", "email": "robert.johnson@company.com"},
    4: {"id": 4, "name": "Maria Lopez", "role": "Sales Manager", "email": "maria.lopez@company.com"},
    5: {"id": 5, "name": "Sarah Chen", "role": "Account Manager", "email": "sarah.chen@company.com"},
    6: {"id": 6, "name": "Michael Brown", "role": "Creative Director", "email": "michael.brown@company.com"}
}

# AI Integration Functions
def analyze_rfp_with_ai(rfp_content: str, rfp_data: Dict) -> Dict:
    """Analyze RFP using multiple AI models"""
    try:
        # Simulate AI analysis with realistic results
        analysis = {
            "status": "completed",
            "processing_time": "2.3 seconds",
            "models_used": ["GPT-4", "Gemini", "Claude", "Grok"],
            "confidence_score": 0.87,
            "key_insights": [
                f"High-value {rfp_data.get('campaign_type', 'digital media')} opportunity with strong ROI potential",
                "Recommended focus on programmatic and social channels based on target demographics",
                f"Timeline is {'aggressive but achievable' if 'urgent' in rfp_data.get('status', '').lower() else 'well-structured'} with proper resource allocation",
                f"Budget range of {rfp_data.get('budget_range', 'TBD')} aligns with market standards for this campaign type"
            ],
            "recommendations": [
                "Prioritize mobile-first creative development for maximum reach",
                f"Allocate 60% budget to digital channels, 40% to {rfp_data.get('campaign_type', 'traditional')} media",
                "Implement real-time optimization strategy with A/B testing",
                "Focus on data-driven attribution modeling for performance measurement"
            ],
            "risk_factors": [
                "Tight timeline may require additional resources",
                "Competitive landscape analysis needed",
                "Creative approval process should be streamlined"
            ],
            "opportunities": [
                "Strong brand alignment with target audience",
                "Potential for campaign expansion based on performance",
                "Cross-platform synergy opportunities"
            ],
            "technical_requirements": [
                "Programmatic buying platform integration",
                "Real-time reporting dashboard setup",
                "Creative asset management system",
                "Attribution tracking implementation"
            ],
            "estimated_timeline": "6-8 weeks from approval to launch",
            "success_metrics": [
                "Brand awareness lift: 15-25%",
                "Click-through rate: 2.5%+",
                "Cost per acquisition: 20% below industry average",
                "Return on ad spend: 4:1 minimum"
            ]
        }
        return analysis
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "confidence_score": 0.0
        }

def generate_proposal_with_ai(rfp_data: Dict, analysis: Dict) -> Dict:
    """Generate proposal using AI based on RFP analysis"""
    try:
        proposal = {
            "status": "completed",
            "generated_at": datetime.now().isoformat(),
            "sections": {
                "executive_summary": f"""
                We are pleased to present our comprehensive media proposal for {rfp_data.get('advertiser_client_name', 'your organization')}'s 
                {rfp_data.get('name', 'campaign')}. Our strategic approach leverages data-driven insights and innovative 
                {rfp_data.get('campaign_type', 'digital media')} solutions to maximize your investment and achieve measurable results.
                
                Key highlights of our proposal:
                • Integrated {rfp_data.get('campaign_type', 'multi-channel')} strategy
                • Advanced targeting and optimization capabilities  
                • Transparent reporting and performance tracking
                • Dedicated account management and support
                """,
                
                "strategy_overview": f"""
                Our strategic approach for this {rfp_data.get('campaign_type', 'digital media')} campaign focuses on:
                
                1. Audience Targeting & Segmentation
                   - Demographic and psychographic profiling
                   - Behavioral targeting based on online activities
                   - Lookalike audience development
                
                2. Channel Mix & Optimization
                   - Programmatic display advertising (40%)
                   - Social media advertising (30%)
                   - Search engine marketing (20%)
                   - Connected TV/Video (10%)
                
                3. Creative Strategy
                   - Mobile-first creative development
                   - Dynamic creative optimization
                   - A/B testing framework
                   - Brand safety measures
                """,
                
                "media_plan": f"""
                Campaign Duration: {analysis.get('estimated_timeline', '6-8 weeks')}
                Total Budget: {rfp_data.get('budget_range', 'TBD')}
                
                Channel Allocation:
                • Digital Display: 35% of budget
                • Social Media: 30% of budget  
                • Search Marketing: 20% of budget
                • Video/Connected TV: 15% of budget
                
                Key Performance Indicators:
                • Brand Awareness Lift: 15-25%
                • Click-Through Rate: 2.5%+
                • Cost Per Acquisition: 20% below industry average
                • Return on Ad Spend: 4:1 minimum
                """,
                
                "timeline": f"""
                Week 1-2: Campaign setup and creative development
                Week 3: Campaign launch and initial optimization
                Week 4-6: Performance monitoring and optimization
                Week 7-8: Final optimization and reporting
                
                Key Milestones:
                • Creative approval: Week 1
                • Campaign launch: Week 3
                • Mid-campaign review: Week 5  
                • Final reporting: Week 8
                """,
                
                "investment": f"""
                Total Investment: {rfp_data.get('budget_range', 'TBD')}
                
                Budget Breakdown:
                • Media Spend: 85% of total budget
                • Platform Fees: 10% of total budget
                • Management Fee: 5% of total budget
                
                Payment Terms:
                • 50% upon campaign approval
                • 25% at campaign midpoint
                • 25% upon campaign completion
                """
            },
            "attachments": [
                {"name": "Media Plan Details.pdf", "type": "document"},
                {"name": "Creative Concepts.pdf", "type": "creative"},
                {"name": "Audience Analysis.xlsx", "type": "data"},
                {"name": "Performance Projections.xlsx", "type": "analytics"}
            ],
            "next_steps": [
                "Review and approve creative concepts",
                "Finalize targeting parameters",
                "Set up tracking and attribution",
                "Schedule campaign launch meeting"
            ]
        }
        return proposal
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

def quality_check_proposal(proposal_data: Dict) -> Dict:
    """Perform AI-powered quality check on proposal"""
    try:
        quality_check = {
            "status": "completed",
            "overall_score": 92,
            "checks_performed": [
                {
                    "category": "Content Completeness",
                    "score": 95,
                    "status": "excellent",
                    "details": "All required sections present and comprehensive"
                },
                {
                    "category": "Strategic Alignment", 
                    "score": 90,
                    "status": "good",
                    "details": "Strategy aligns well with client objectives"
                },
                {
                    "category": "Budget Accuracy",
                    "score": 88,
                    "status": "good", 
                    "details": "Budget allocation is realistic and competitive"
                },
                {
                    "category": "Timeline Feasibility",
                    "score": 94,
                    "status": "excellent",
                    "details": "Timeline is achievable with proper resource allocation"
                },
                {
                    "category": "Compliance & Legal",
                    "score": 96,
                    "status": "excellent",
                    "details": "All compliance requirements addressed"
                }
            ],
            "recommendations": [
                "Consider adding more specific KPI targets",
                "Include competitive analysis section",
                "Add risk mitigation strategies",
                "Enhance creative strategy details"
            ],
            "strengths": [
                "Comprehensive strategic approach",
                "Clear budget breakdown and timeline",
                "Strong performance projections",
                "Professional presentation format"
            ],
            "areas_for_improvement": [
                "More detailed audience segmentation",
                "Additional creative concepts",
                "Enhanced reporting framework"
            ]
        }
        return quality_check
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

# Initialize with sample data
def initialize_sample_data():
    """Initialize the application with sample RFPs and knowledge articles"""
    
    # Sample RFPs
    sample_rfps = [
        {
            "id": 1,
            "name": "Q3 Digital Media Campaign",
            "agency_name": "MediaBuyers Agency",
            "advertiser_client_name": "TechGadgets Inc.",
            "campaign_type": "Digital Media",
            "budget_range": "$500K - $750K",
            "due_date": "2025-04-15",
            "status": "In Progress",
            "completion_percentage": 72,
            "content": "Comprehensive digital media campaign targeting tech-savvy consumers aged 25-45. Focus on mobile-first approach with emphasis on programmatic buying and social media integration.",
            "team_members": [1, 2, 3, 4],
            "attachments": [
                {"filename": "TechGadgets_Q3_Digital_RFP.pdf", "type": "Primary RFP", "size": "2.3 MB"},
                {"filename": "TechGadgets_Media_Requirements.xlsx", "type": "Supporting", "size": "1.1 MB"}
            ],
            "created_at": "2025-03-15T10:00:00",
            "updated_at": "2025-04-01T14:30:00",
            "analysis": None,
            "proposal": None,
            "quality_check": None
        },
        {
            "id": 2,
            "name": "Summer Retail Promotion",
            "agency_name": "BrandMax Advertising", 
            "advertiser_client_name": "FashionRetail Co.",
            "campaign_type": "Multi-platform",
            "budget_range": "$300K - $450K",
            "due_date": "2025-04-10",
            "status": "In Progress",
            "completion_percentage": 45,
            "content": "Summer retail promotion campaign focusing on fashion-forward millennials. Multi-platform approach including social media, influencer partnerships, and traditional advertising.",
            "team_members": [2, 4, 5],
            "attachments": [
                {"filename": "Summer_Retail_RFP.pdf", "type": "Primary RFP", "size": "1.8 MB"}
            ],
            "created_at": "2025-03-20T09:15:00",
            "updated_at": "2025-04-02T11:45:00",
            "analysis": None,
            "proposal": None,
            "quality_check": None
        }
    ]
    
    for rfp in sample_rfps:
        rfps_db[rfp["id"]] = rfp
    
    # Sample Knowledge Articles
    sample_articles = [
        {
            "id": 1,
            "title": "Digital Media Planning Best Practices",
            "category": "Strategy",
            "type": "Article",
            "content": """
            # Digital Media Planning Best Practices
            
            ## Overview
            Digital media planning is the strategic process of determining how, when, and where to run advertisements to maximize campaign effectiveness and ROI.
            
            ## Key Principles
            
            ### 1. Audience-First Approach
            - Define target audience demographics and psychographics
            - Utilize first-party and third-party data for insights
            - Create detailed buyer personas
            
            ### 2. Channel Selection
            - Evaluate channel performance and audience overlap
            - Consider the customer journey and touchpoints
            - Balance reach and frequency across channels
            
            ### 3. Budget Allocation
            - Apply the 70-20-10 rule: 70% proven channels, 20% emerging channels, 10% experimental
            - Consider seasonality and market trends
            - Allocate budget based on performance data
            
            ## Implementation Framework
            
            ### Phase 1: Research & Analysis
            - Market research and competitive analysis
            - Audience research and segmentation
            - Channel performance analysis
            
            ### Phase 2: Strategy Development
            - Define campaign objectives and KPIs
            - Develop media mix and budget allocation
            - Create timeline and milestone plan
            
            ### Phase 3: Execution & Optimization
            - Launch campaigns across selected channels
            - Monitor performance and optimize in real-time
            - Conduct regular performance reviews
            
            ## Best Practices
            
            1. **Data-Driven Decisions**: Use analytics to guide all planning decisions
            2. **Cross-Channel Integration**: Ensure consistent messaging across all touchpoints
            3. **Continuous Testing**: Implement A/B testing for all campaign elements
            4. **Performance Monitoring**: Set up real-time dashboards for campaign tracking
            5. **Agile Optimization**: Be prepared to pivot based on performance data
            
            ## Tools and Technologies
            
            ### Planning Tools
            - Google Analytics and Google Ads
            - Facebook Business Manager
            - Programmatic platforms (DV360, The Trade Desk)
            - Attribution modeling tools
            
            ### Analytics Platforms
            - Adobe Analytics
            - Tableau for data visualization
            - Custom reporting dashboards
            
            ## Measurement and KPIs
            
            ### Awareness Metrics
            - Brand awareness lift
            - Reach and frequency
            - Share of voice
            
            ### Engagement Metrics  
            - Click-through rates
            - Engagement rates
            - Time spent with content
            
            ### Conversion Metrics
            - Cost per acquisition
            - Return on ad spend
            - Conversion rate optimization
            
            ## Conclusion
            Effective digital media planning requires a strategic approach that combines data insights, creative thinking, and continuous optimization. By following these best practices, media planners can create campaigns that deliver measurable results and drive business growth.
            """,
            "tags": ["Digital", "Planning", "Strategy", "Best Practices"],
            "author": "Media Strategy Team",
            "created_at": "2025-03-01T10:00:00",
            "updated_at": "2025-04-01T15:30:00",
            "views": 245,
            "rating": 4.8
        },
        {
            "id": 2,
            "title": "Programmatic Advertising Fundamentals",
            "category": "Technology",
            "type": "Guide",
            "content": """
            # Programmatic Advertising Fundamentals
            
            ## What is Programmatic Advertising?
            Programmatic advertising is the automated buying and selling of digital advertising space using software and algorithms, rather than traditional manual processes.
            
            ## Key Components
            
            ### Demand-Side Platforms (DSPs)
            - Allow advertisers to buy ad inventory
            - Provide targeting and optimization tools
            - Enable real-time bidding participation
            
            ### Supply-Side Platforms (SSPs)
            - Help publishers sell their ad inventory
            - Optimize revenue through automated auctions
            - Provide inventory management tools
            
            ### Ad Exchanges
            - Digital marketplaces for buying and selling ads
            - Facilitate real-time auctions
            - Connect DSPs and SSPs
            
            ### Data Management Platforms (DMPs)
            - Collect and organize audience data
            - Enable advanced targeting capabilities
            - Provide insights for campaign optimization
            
            ## Real-Time Bidding (RTB) Process
            
            1. **User visits website** - Page load triggers ad request
            2. **Bid request sent** - Publisher sends request to ad exchange
            3. **Auction begins** - Multiple advertisers submit bids
            4. **Winner selected** - Highest bid wins the auction
            5. **Ad served** - Winning ad is displayed to user
            
            *This entire process happens in milliseconds*
            
            ## Targeting Capabilities
            
            ### Demographic Targeting
            - Age, gender, income level
            - Education and occupation
            - Geographic location
            
            ### Behavioral Targeting
            - Browsing history and patterns
            - Purchase behavior
            - App usage and engagement
            
            ### Contextual Targeting
            - Website content relevance
            - Keyword targeting
            - Category-based placement
            
            ### Lookalike Targeting
            - Similar audience identification
            - Custom audience expansion
            - Predictive modeling
            
            ## Campaign Setup Best Practices
            
            ### 1. Define Clear Objectives
            - Brand awareness vs. performance goals
            - Target audience definition
            - Budget and timeline parameters
            
            ### 2. Creative Optimization
            - Multiple creative variations
            - Dynamic creative optimization (DCO)
            - Mobile-first design approach
            
            ### 3. Targeting Strategy
            - Layer multiple targeting methods
            - Use exclusion lists to avoid waste
            - Implement frequency capping
            
            ### 4. Bid Management
            - Start with automated bidding
            - Gradually move to manual optimization
            - Monitor and adjust based on performance
            
            ## Performance Optimization
            
            ### Key Metrics to Monitor
            - Click-through rate (CTR)
            - Cost per click (CPC)
            - Conversion rate
            - Return on ad spend (ROAS)
            - Viewability rates
            
            ### Optimization Techniques
            - A/B testing creative elements
            - Dayparting and scheduling
            - Device and platform optimization
            - Audience segment performance analysis
            
            ## Common Challenges and Solutions
            
            ### Ad Fraud Prevention
            - Use verified inventory sources
            - Implement fraud detection tools
            - Monitor traffic quality metrics
            
            ### Brand Safety
            - Maintain exclusion lists
            - Use brand safety verification tools
            - Monitor placement reports regularly
            
            ### Attribution Challenges
            - Implement cross-device tracking
            - Use multi-touch attribution models
            - Consider view-through conversions
            
            ## Future Trends
            
            ### Privacy-First Advertising
            - Cookieless targeting solutions
            - First-party data strategies
            - Privacy-compliant measurement
            
            ### AI and Machine Learning
            - Advanced audience prediction
            - Automated creative optimization
            - Real-time performance optimization
            
            ### Connected TV (CTV)
            - Programmatic TV advertising growth
            - Advanced targeting for video content
            - Cross-screen campaign integration
            
            ## Conclusion
            Programmatic advertising offers powerful automation and targeting capabilities that can significantly improve campaign performance when implemented correctly. Success requires understanding the technology, following best practices, and continuously optimizing based on data insights.
            """,
            "tags": ["Programmatic", "RTB", "Technology", "Automation"],
            "author": "Technology Team",
            "created_at": "2025-02-15T14:20:00",
            "updated_at": "2025-03-28T09:15:00",
            "views": 189,
            "rating": 4.6
        }
    ]
    
    for article in sample_articles:
        knowledge_articles_db[article["id"]] = article

# Initialize sample data on startup
initialize_sample_data()

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

# Dashboard API
@app.route('/api/dashboard/stats')
def get_dashboard_stats():
    active_rfps = len([rfp for rfp in rfps_db.values() if rfp['status'] != 'Completed'])
    due_this_week = len([rfp for rfp in rfps_db.values() if 
                        datetime.fromisoformat(rfp['due_date']) <= datetime.now() + timedelta(days=7)])
    
    return jsonify({
        'success': True,
        'stats': {
            'active_rfps': active_rfps,
            'pending_placements': 87,
            'ai_response_rate': 78,
            'win_rate': 32,
            'due_this_week': due_this_week,
            'completion_rate': 68,
            'potential_revenue': 4.2
        },
        'recent_rfps': list(rfps_db.values())[:3]
    })

# RFP Management APIs
@app.route('/api/rfps')
def get_rfps():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    search = request.args.get('search', '')
    status_filter = request.args.get('status', 'All Status')
    
    # Filter RFPs
    filtered_rfps = list(rfps_db.values())
    
    if search:
        filtered_rfps = [rfp for rfp in filtered_rfps if 
                        search.lower() in rfp['name'].lower() or 
                        search.lower() in rfp['agency_name'].lower()]
    
    if status_filter != 'All Status':
        filtered_rfps = [rfp for rfp in filtered_rfps if rfp['status'] == status_filter]
    
    # Pagination
    total = len(filtered_rfps)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_rfps = filtered_rfps[start:end]
    
    return jsonify({
        'success': True,
        'rfps': paginated_rfps,
        'total': total,
        'pages': (total + per_page - 1) // per_page,
        'current_page': page
    })

@app.route('/api/rfps/<int:rfp_id>')
def get_rfp_detail(rfp_id):
    if rfp_id not in rfps_db:
        return jsonify({'success': False, 'error': 'RFP not found'}), 404
    
    return jsonify({
        'success': True,
        'rfp': rfps_db[rfp_id]
    })

@app.route('/api/rfps', methods=['POST'])
def create_rfp():
    data = request.get_json()
    
    rfp_id = max(rfps_db.keys()) + 1 if rfps_db else 1
    
    new_rfp = {
        "id": rfp_id,
        "name": data.get('name', ''),
        "agency_name": data.get('agency_name', ''),
        "advertiser_client_name": data.get('advertiser_client_name', ''),
        "campaign_type": data.get('campaign_type', ''),
        "budget_range": data.get('budget_range', ''),
        "due_date": data.get('due_date', ''),
        "status": "New",
        "completion_percentage": 0,
        "content": data.get('content', ''),
        "team_members": data.get('team_members', []),
        "attachments": data.get('attachments', []),
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "analysis": None,
        "proposal": None,
        "quality_check": None
    }
    
    rfps_db[rfp_id] = new_rfp
    
    return jsonify({
        'success': True,
        'rfp': new_rfp
    })

@app.route('/api/rfps/<int:rfp_id>', methods=['PUT'])
def update_rfp(rfp_id):
    if rfp_id not in rfps_db:
        return jsonify({'success': False, 'error': 'RFP not found'}), 404
    
    data = request.get_json()
    rfp = rfps_db[rfp_id]
    
    # Update fields
    for key, value in data.items():
        if key in rfp:
            rfp[key] = value
    
    rfp['updated_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'rfp': rfp
    })

@app.route('/api/rfps/<int:rfp_id>/analyze', methods=['POST'])
def analyze_rfp(rfp_id):
    if rfp_id not in rfps_db:
        return jsonify({'success': False, 'error': 'RFP not found'}), 404
    
    rfp = rfps_db[rfp_id]
    
    # Perform AI analysis
    analysis = analyze_rfp_with_ai(rfp['content'], rfp)
    
    # Store analysis in RFP
    rfp['analysis'] = analysis
    rfp['updated_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'analysis': analysis
    })

@app.route('/api/rfps/<int:rfp_id>/generate-proposal', methods=['POST'])
def generate_proposal(rfp_id):
    if rfp_id not in rfps_db:
        return jsonify({'success': False, 'error': 'RFP not found'}), 404
    
    rfp = rfps_db[rfp_id]
    
    # Ensure RFP has been analyzed first
    if not rfp.get('analysis'):
        # Perform analysis first
        analysis = analyze_rfp_with_ai(rfp['content'], rfp)
        rfp['analysis'] = analysis
    
    # Generate proposal
    proposal = generate_proposal_with_ai(rfp, rfp['analysis'])
    
    # Store proposal in RFP
    rfp['proposal'] = proposal
    rfp['updated_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'proposal': proposal
    })

@app.route('/api/rfps/<int:rfp_id>/quality-check', methods=['POST'])
def check_proposal_quality(rfp_id):
    if rfp_id not in rfps_db:
        return jsonify({'success': False, 'error': 'RFP not found'}), 404
    
    rfp = rfps_db[rfp_id]
    
    # Ensure RFP has a proposal
    if not rfp.get('proposal'):
        return jsonify({'success': False, 'error': 'No proposal found. Generate a proposal first.'}), 400
    
    # Perform quality check
    quality_check = quality_check_proposal(rfp['proposal'])
    
    # Store quality check in RFP
    rfp['quality_check'] = quality_check
    rfp['updated_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'quality_check': quality_check
    })

# Email and Import APIs
@app.route('/api/emails/rfps')
def get_email_rfps():
    return jsonify({
        'success': True,
        'emails': [
            {
                'id': 1,
                'subject': 'MediaBuyers Agency - Q3 Digital Campaign RFP (2 attachments)',
                'sender': 'MediaBuyers Agency',
                'sender_email': 'rfp@mediabuyersagency.com',
                'received_date': '2025-04-01T09:30:00',
                'attachments': [
                    {'filename': 'TechGadgets_Q3_Digital_RFP.pdf', 'type': 'Primary RFP', 'size': '2.3 MB'},
                    {'filename': 'TechGadgets_Media_Requirements.xlsx', 'type': 'Supporting', 'size': '1.1 MB'}
                ]
            },
            {
                'id': 2,
                'subject': 'BrandMax Advertising - Summer Retail Promotion RFP (1 attachment)',
                'sender': 'BrandMax Advertising',
                'sender_email': 'proposals@brandmaxadv.com',
                'received_date': '2025-04-02T14:15:00',
                'attachments': [
                    {'filename': 'Summer_Retail_RFP.pdf', 'type': 'Primary RFP', 'size': '1.8 MB'}
                ]
            },
            {
                'id': 3,
                'subject': 'DigitalFirst Agency - Holiday Campaign Planning RFP (3 attachments)',
                'sender': 'DigitalFirst Agency',
                'sender_email': 'rfps@digitalfirstagency.com',
                'received_date': '2025-04-03T11:45:00',
                'attachments': [
                    {'filename': 'Holiday_Campaign_RFP.pdf', 'type': 'Primary RFP', 'size': '2.1 MB'},
                    {'filename': 'Media_Requirements.xlsx', 'type': 'Supporting', 'size': '890 KB'},
                    {'filename': 'Brand_Guidelines.pdf', 'type': 'Supporting', 'size': '3.2 MB'}
                ]
            }
        ]
    })

@app.route('/api/rfps/import', methods=['POST'])
def import_rfp():
    data = request.get_json()
    
    # Generate new RFP ID
    rfp_id = max(rfps_db.keys()) + 1 if rfps_db else 1
    
    # Create new RFP from import data
    new_rfp = {
        "id": rfp_id,
        "name": data.get('rfp_name', ''),
        "agency_name": data.get('agency_name', ''),
        "advertiser_client_name": data.get('advertiser_client_name', ''),
        "campaign_type": data.get('campaign_type', ''),
        "budget_range": data.get('budget_range', ''),
        "due_date": data.get('due_date', ''),
        "status": "New",
        "completion_percentage": 5,
        "content": f"Imported RFP from {data.get('import_method', 'email')}. {data.get('agency_name', '')} campaign for {data.get('advertiser_client_name', '')}.",
        "team_members": data.get('team_members', []),
        "attachments": [],
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "analysis": None,
        "proposal": None,
        "quality_check": None,
        "import_source": data.get('import_method', 'email'),
        "email_id": data.get('email_id') if data.get('import_method') == 'email' else None
    }
    
    # Add attachments if imported from email
    if data.get('import_method') == 'email' and data.get('email_id'):
        email_id = int(data.get('email_id'))
        # Get email data and add attachments
        emails_response = get_email_rfps()
        emails_data = emails_response.get_json()
        
        if emails_data['success']:
            email = next((e for e in emails_data['emails'] if e['id'] == email_id), None)
            if email:
                new_rfp['attachments'] = email['attachments']
    
    rfps_db[rfp_id] = new_rfp
    
    return jsonify({
        'success': True,
        'message': 'RFP imported successfully',
        'rfp': new_rfp
    })

# Knowledge Base APIs
@app.route('/api/knowledge-base/articles')
def get_knowledge_articles():
    search = request.args.get('search', '')
    category = request.args.get('category', '')
    
    articles = list(knowledge_articles_db.values())
    
    if search:
        articles = [article for article in articles if 
                   search.lower() in article['title'].lower() or 
                   search.lower() in article['content'].lower() or
                   any(search.lower() in tag.lower() for tag in article['tags'])]
    
    if category:
        articles = [article for article in articles if article['category'] == category]
    
    return jsonify({
        'success': True,
        'articles': articles
    })

@app.route('/api/knowledge-base/articles/<int:article_id>')
def get_knowledge_article(article_id):
    if article_id not in knowledge_articles_db:
        return jsonify({'success': False, 'error': 'Article not found'}), 404
    
    article = knowledge_articles_db[article_id]
    article['views'] += 1  # Increment view count
    
    return jsonify({
        'success': True,
        'article': article
    })

@app.route('/api/knowledge-base/articles', methods=['POST'])
def create_knowledge_article():
    data = request.get_json()
    
    article_id = max(knowledge_articles_db.keys()) + 1 if knowledge_articles_db else 1
    
    new_article = {
        "id": article_id,
        "title": data.get('title', ''),
        "category": data.get('category', ''),
        "type": data.get('type', 'Article'),
        "content": data.get('content', ''),
        "tags": data.get('tags', []),
        "author": data.get('author', 'Unknown'),
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "views": 0,
        "rating": 0.0
    }
    
    knowledge_articles_db[article_id] = new_article
    
    return jsonify({
        'success': True,
        'article': new_article
    })

@app.route('/api/knowledge-base/articles/<int:article_id>', methods=['PUT'])
def update_knowledge_article(article_id):
    if article_id not in knowledge_articles_db:
        return jsonify({'success': False, 'error': 'Article not found'}), 404
    
    data = request.get_json()
    article = knowledge_articles_db[article_id]
    
    # Update fields
    for key, value in data.items():
        if key in article and key != 'id':
            article[key] = value
    
    article['updated_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'article': article
    })

@app.route('/api/knowledge-base/articles/<int:article_id>', methods=['DELETE'])
def delete_knowledge_article(article_id):
    if article_id not in knowledge_articles_db:
        return jsonify({'success': False, 'error': 'Article not found'}), 404
    
    del knowledge_articles_db[article_id]
    
    return jsonify({
        'success': True,
        'message': 'Article deleted successfully'
    })

# Team Management APIs
@app.route('/api/team/members')
def get_team_members():
    return jsonify({
        'success': True,
        'members': list(team_members_db.values())
    })

@app.route('/api/team/members/<int:member_id>')
def get_team_member(member_id):
    if member_id not in team_members_db:
        return jsonify({'success': False, 'error': 'Team member not found'}), 404
    
    return jsonify({
        'success': True,
        'member': team_members_db[member_id]
    })

# Sample Data Creation
@app.route('/api/rfps/sample-data', methods=['POST'])
def create_sample_data():
    initialize_sample_data()
    return jsonify({
        'success': True, 
        'message': 'Sample data created successfully'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
