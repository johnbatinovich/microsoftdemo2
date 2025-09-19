from flask import Blueprint, request, jsonify
from src.models.rfp import db, RFP, RFPTeamMember, RFPAttachment, EmailRFP, DashboardStats
from datetime import datetime, date
import json

rfp_bp = Blueprint('rfp', __name__)

@rfp_bp.route('/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics as shown in mockup"""
    try:
        stats = DashboardStats.get_stats()
        
        # Get recent RFPs for dashboard
        recent_rfps = RFP.query.order_by(RFP.updated_at.desc()).limit(4).all()
        
        return jsonify({
            'success': True,
            'stats': stats,
            'recent_rfps': [rfp.to_dict() for rfp in recent_rfps]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps', methods=['GET'])
def get_rfps():
    """Get all RFPs with filtering and pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        status_filter = request.args.get('status', '')
        
        query = RFP.query
        
        # Apply search filter
        if search:
            query = query.filter(
                db.or_(
                    RFP.name.contains(search),
                    RFP.agency_name.contains(search),
                    RFP.advertiser_client_name.contains(search)
                )
            )
        
        # Apply status filter
        if status_filter and status_filter != 'All Status':
            query = query.filter(RFP.status == status_filter)
        
        # Get paginated results
        rfps = query.order_by(RFP.updated_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'success': True,
            'rfps': [rfp.to_dict() for rfp in rfps.items],
            'total': rfps.total,
            'pages': rfps.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>', methods=['GET'])
def get_rfp(rfp_id):
    """Get specific RFP details"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        return jsonify({
            'success': True,
            'rfp': rfp.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps', methods=['POST'])
def create_rfp():
    """Create new RFP"""
    try:
        data = request.get_json()
        
        # Create RFP
        rfp = RFP(
            name=data.get('name'),
            agency_name=data.get('agency_name'),
            advertiser_client_name=data.get('advertiser_client_name'),
            campaign_type=data.get('campaign_type'),
            budget_range=data.get('budget_range'),
            due_date=datetime.strptime(data.get('due_date'), '%Y-%m-%d').date(),
            status=data.get('status', 'New'),
            content=data.get('content', ''),
            ai_processing_enabled=data.get('ai_processing_enabled', True)
        )
        
        db.session.add(rfp)
        db.session.flush()  # Get the ID
        
        # Add team members
        if 'team_members' in data:
            for member_data in data['team_members']:
                member = RFPTeamMember(
                    rfp_id=rfp.id,
                    name=member_data.get('name'),
                    role=member_data.get('role'),
                    email=member_data.get('email')
                )
                db.session.add(member)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'rfp': rfp.to_dict(),
            'message': 'RFP created successfully'
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>', methods=['PUT'])
def update_rfp(rfp_id):
    """Update existing RFP"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        data = request.get_json()
        
        # Update RFP fields
        if 'name' in data:
            rfp.name = data['name']
        if 'agency_name' in data:
            rfp.agency_name = data['agency_name']
        if 'advertiser_client_name' in data:
            rfp.advertiser_client_name = data['advertiser_client_name']
        if 'campaign_type' in data:
            rfp.campaign_type = data['campaign_type']
        if 'budget_range' in data:
            rfp.budget_range = data['budget_range']
        if 'due_date' in data:
            rfp.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
        if 'status' in data:
            rfp.status = data['status']
        if 'completion_percentage' in data:
            rfp.completion_percentage = data['completion_percentage']
        if 'content' in data:
            rfp.content = data['content']
        
        rfp.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'rfp': rfp.to_dict(),
            'message': 'RFP updated successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>', methods=['DELETE'])
def delete_rfp(rfp_id):
    """Delete RFP"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        db.session.delete(rfp)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'RFP deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/emails/rfps', methods=['GET'])
def get_email_rfps():
    """Get available email RFPs for import"""
    try:
        # Mock email data as shown in mockup
        emails = [
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
            },
            {
                'id': 3,
                'subject': 'DigitalFirst Agency - Holiday Campaign Planning RFP (3 attachments)',
                'sender': 'DigitalFirst Agency',
                'attachments': [
                    {'filename': 'Holiday_Campaign_RFP.pdf', 'type': 'Primary RFP'},
                    {'filename': 'Media_Requirements.xlsx', 'type': 'Supporting'},
                    {'filename': 'Brand_Guidelines.pdf', 'type': 'Supporting'}
                ]
            },
            {
                'id': 4,
                'subject': 'AdVantage Media - B2B Tech Solutions Campaign RFP (1 attachment)',
                'sender': 'AdVantage Media',
                'attachments': [
                    {'filename': 'B2B_Tech_RFP.pdf', 'type': 'Primary RFP'}
                ]
            }
        ]
        
        return jsonify({
            'success': True,
            'emails': emails
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/import', methods=['POST'])
def import_rfp():
    """Import RFP from email or upload"""
    try:
        data = request.get_json()
        import_method = data.get('import_method', 'email')
        
        if import_method == 'email':
            email_id = data.get('email_id')
            # Mock processing of email attachment
            
            # Create RFP with extracted data
            rfp_data = {
                'name': data.get('rfp_name', 'Q3 Digital Media Campaign'),
                'agency_name': data.get('agency_name', 'MediaBuyers Agency'),
                'advertiser_client_name': data.get('advertiser_client_name', 'TechGadgets Inc.'),
                'campaign_type': data.get('campaign_type', 'Digital Media'),
                'budget_range': data.get('budget_range', '$500K - $750K'),
                'due_date': data.get('due_date', '2025-04-15'),
                'status': 'New',
                'ai_processing_enabled': data.get('ai_processing_enabled', True),
                'team_members': data.get('team_members', [])
            }
            
            # Create the RFP
            rfp = RFP(
                name=rfp_data['name'],
                agency_name=rfp_data['agency_name'],
                advertiser_client_name=rfp_data['advertiser_client_name'],
                campaign_type=rfp_data['campaign_type'],
                budget_range=rfp_data['budget_range'],
                due_date=datetime.strptime(rfp_data['due_date'], '%Y-%m-%d').date(),
                status=rfp_data['status'],
                ai_processing_enabled=rfp_data['ai_processing_enabled']
            )
            
            db.session.add(rfp)
            db.session.flush()
            
            # Add team members
            for member_data in rfp_data['team_members']:
                member = RFPTeamMember(
                    rfp_id=rfp.id,
                    name=member_data.get('name'),
                    role=member_data.get('role'),
                    email=member_data.get('email')
                )
                db.session.add(member)
            
            db.session.commit()
            
            return jsonify({
                'success': True,
                'rfp': rfp.to_dict(),
                'message': 'RFP imported successfully from email'
            }), 201
            
        else:
            return jsonify({'success': False, 'error': 'Import method not supported'}), 400
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/sample-data', methods=['POST'])
def create_sample_data():
    """Create sample RFP data matching the mockup"""
    try:
        # Clear existing data
        RFPTeamMember.query.delete()
        RFPAttachment.query.delete()
        RFP.query.delete()
        
        # Sample RFPs from mockup
        sample_rfps = [
            {
                'name': 'Q3 Digital Media Campaign',
                'agency_name': 'MediaBuyers Agency',
                'advertiser_client_name': 'TechGadgets Inc.',
                'campaign_type': 'Digital Media',
                'budget_range': '$500K - $750K',
                'due_date': '2025-04-15',
                'status': 'In Progress',
                'completion_percentage': 72,
                'team_members': [
                    {'name': 'John Doe', 'role': 'Media Director'},
                    {'name': 'Amanda Smith', 'role': 'Digital Strategist'},
                    {'name': 'Robert Johnson', 'role': 'Ad Operations'},
                    {'name': 'Maria Lopez', 'role': 'Sales Manager'}
                ]
            },
            {
                'name': 'Summer Retail Promotion',
                'agency_name': 'BrandMax Advertising',
                'advertiser_client_name': 'FashionRetail Co.',
                'campaign_type': 'Multi-platform',
                'budget_range': '$300K - $450K',
                'due_date': '2025-04-10',
                'status': 'In Progress',
                'completion_percentage': 45,
                'team_members': [
                    {'name': 'Amanda Smith', 'role': 'Digital Strategist'},
                    {'name': 'Robert Johnson', 'role': 'Ad Operations'},
                    {'name': 'Maria Lopez', 'role': 'Sales Manager'}
                ]
            },
            {
                'name': 'Fall TV Sponsorship Package',
                'agency_name': 'GlobalMedia Partners',
                'advertiser_client_name': 'LuxuryCars Inc.',
                'campaign_type': 'Broadcast & Digital',
                'budget_range': '$1M - $1.5M',
                'due_date': '2025-04-22',
                'status': 'Completed',
                'completion_percentage': 100,
                'team_members': [
                    {'name': 'John Doe', 'role': 'Media Director'},
                    {'name': 'Maria Lopez', 'role': 'Sales Manager'}
                ]
            },
            {
                'name': 'Holiday Campaign Planning',
                'agency_name': 'DigitalFirst Agency',
                'advertiser_client_name': 'HomeGoods Plus',
                'campaign_type': 'Digital & Social',
                'budget_range': '$250K - $400K',
                'due_date': '2025-04-12',
                'status': 'Urgent',
                'completion_percentage': 30,
                'team_members': [
                    {'name': 'Amanda Smith', 'role': 'Digital Strategist'},
                    {'name': 'Robert Johnson', 'role': 'Ad Operations'}
                ]
            },
            {
                'name': 'B2B Tech Solutions Campaign',
                'agency_name': 'AdVantage Media',
                'advertiser_client_name': 'EnterpriseCloud Solutions',
                'campaign_type': 'B2B Digital',
                'budget_range': '$150K - $200K',
                'due_date': '2025-04-28',
                'status': 'New',
                'completion_percentage': 5,
                'team_members': [
                    {'name': 'John Doe', 'role': 'Media Director'},
                    {'name': 'Robert Johnson', 'role': 'Ad Operations'}
                ]
            },
            {
                'name': 'Financial Services Awareness',
                'agency_name': 'MediaPlan Group',
                'advertiser_client_name': 'TrustBank Financial',
                'campaign_type': 'Multi-channel',
                'budget_range': '$400K - $600K',
                'due_date': '2025-04-18',
                'status': 'In Progress',
                'completion_percentage': 60,
                'team_members': [
                    {'name': 'Amanda Smith', 'role': 'Digital Strategist'},
                    {'name': 'Maria Lopez', 'role': 'Sales Manager'}
                ]
            },
            {
                'name': 'Mobile App Launch Campaign',
                'agency_name': 'CreativeEdge Partners',
                'advertiser_client_name': 'FitLife App',
                'campaign_type': 'Mobile & Social',
                'budget_range': '$200K - $350K',
                'due_date': '2025-05-05',
                'status': 'Not Started',
                'completion_percentage': 0,
                'team_members': [
                    {'name': 'Robert Johnson', 'role': 'Ad Operations'}
                ]
            },
            {
                'name': 'CPG Brand Relaunch',
                'agency_name': 'StrategyPlus Media',
                'advertiser_client_name': 'EcoClean Products',
                'campaign_type': 'Integrated Media',
                'budget_range': '$350K - $500K',
                'due_date': '2025-04-25',
                'status': 'In Progress',
                'completion_percentage': 25,
                'team_members': [
                    {'name': 'John Doe', 'role': 'Media Director'},
                    {'name': 'Amanda Smith', 'role': 'Digital Strategist'}
                ]
            }
        ]
        
        for rfp_data in sample_rfps:
            # Create RFP
            rfp = RFP(
                name=rfp_data['name'],
                agency_name=rfp_data['agency_name'],
                advertiser_client_name=rfp_data['advertiser_client_name'],
                campaign_type=rfp_data['campaign_type'],
                budget_range=rfp_data['budget_range'],
                due_date=datetime.strptime(rfp_data['due_date'], '%Y-%m-%d').date(),
                status=rfp_data['status'],
                completion_percentage=rfp_data['completion_percentage'],
                content=f"RFP for {rfp_data['name']} campaign targeting {rfp_data['campaign_type']} channels with budget range {rfp_data['budget_range']}."
            )
            
            db.session.add(rfp)
            db.session.flush()
            
            # Add team members
            for member_data in rfp_data['team_members']:
                member = RFPTeamMember(
                    rfp_id=rfp.id,
                    name=member_data['name'],
                    role=member_data['role']
                )
                db.session.add(member)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Created {len(sample_rfps)} sample RFPs successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# AI Agent Actions
@rfp_bp.route('/rfps/<int:rfp_id>/analyze', methods=['POST'])
def analyze_rfp(rfp_id):
    """AI analysis of RFP"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        
        # Mock AI analysis
        analysis_result = {
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
        
        return jsonify({
            'success': True,
            'analysis': analysis_result,
            'message': 'RFP analysis completed successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>/extract-placements', methods=['POST'])
def extract_placements(rfp_id):
    """Extract media placements from RFP"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        
        # Mock placement extraction
        placements = [
            {'channel': 'Digital Display', 'budget': '$200K', 'duration': '8 weeks'},
            {'channel': 'Social Media', 'budget': '$150K', 'duration': '12 weeks'},
            {'channel': 'Search Marketing', 'budget': '$100K', 'duration': '10 weeks'}
        ]
        
        return jsonify({
            'success': True,
            'placements': placements,
            'message': 'Media placements extracted successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>/generate-proposal', methods=['POST'])
def generate_proposal(rfp_id):
    """Generate proposal for RFP"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        
        # Mock proposal generation
        proposal = {
            'title': f'Media Proposal for {rfp.name}',
            'executive_summary': 'Comprehensive media strategy designed to maximize reach and engagement...',
            'strategy': 'Multi-channel approach focusing on digital-first execution...',
            'budget_breakdown': {
                'Digital': '60%',
                'Traditional': '25%',
                'Social': '15%'
            },
            'timeline': '12-week campaign execution',
            'kpis': ['Reach: 5M+', 'CTR: 2.5%+', 'ROAS: 4:1+']
        }
        
        return jsonify({
            'success': True,
            'proposal': proposal,
            'message': 'Proposal generated successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@rfp_bp.route('/rfps/<int:rfp_id>/quality-check', methods=['POST'])
def quality_check(rfp_id):
    """Quality check for RFP proposal"""
    try:
        rfp = RFP.query.get_or_404(rfp_id)
        
        # Mock quality check
        quality_result = {
            'overall_score': 8.7,
            'completeness': 9.2,
            'accuracy': 8.5,
            'compliance': 8.9,
            'recommendations': [
                'Add more detailed budget breakdown',
                'Include competitive analysis section',
                'Enhance measurement methodology'
            ]
        }
        
        return jsonify({
            'success': True,
            'quality_check': quality_result,
            'message': 'Quality check completed successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
