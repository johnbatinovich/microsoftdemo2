from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class RFP(db.Model):
    __tablename__ = 'rfps'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    agency_name = db.Column(db.String(200), nullable=False)
    advertiser_client_name = db.Column(db.String(200), nullable=True)
    campaign_type = db.Column(db.String(100), nullable=False)
    budget_range = db.Column(db.String(50), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='New')
    completion_percentage = db.Column(db.Integer, default=0)
    
    # Content and processing
    content = db.Column(db.Text, nullable=True)
    ai_processing_enabled = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    submitted_date = db.Column(db.Date, nullable=True)
    
    # Relationships
    team_members = db.relationship('RFPTeamMember', backref='rfp', lazy=True, cascade='all, delete-orphan')
    attachments = db.relationship('RFPAttachment', backref='rfp', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'agency_name': self.agency_name,
            'advertiser_client_name': self.advertiser_client_name,
            'campaign_type': self.campaign_type,
            'budget_range': self.budget_range,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'status': self.status,
            'completion_percentage': self.completion_percentage,
            'content': self.content,
            'ai_processing_enabled': self.ai_processing_enabled,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'submitted_date': self.submitted_date.isoformat() if self.submitted_date else None,
            'team_members': [tm.to_dict() for tm in self.team_members],
            'attachments': [att.to_dict() for att in self.attachments]
        }

class RFPTeamMember(db.Model):
    __tablename__ = 'rfp_team_members'
    
    id = db.Column(db.Integer, primary_key=True)
    rfp_id = db.Column(db.Integer, db.ForeignKey('rfps.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'email': self.email
        }

class RFPAttachment(db.Model):
    __tablename__ = 'rfp_attachments'
    
    id = db.Column(db.Integer, primary_key=True)
    rfp_id = db.Column(db.Integer, db.ForeignKey('rfps.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    file_type = db.Column(db.String(50), nullable=False)
    file_path = db.Column(db.String(500), nullable=True)
    is_primary = db.Column(db.Boolean, default=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'file_type': self.file_type,
            'is_primary': self.is_primary,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }

class EmailRFP(db.Model):
    __tablename__ = 'email_rfps'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(300), nullable=False)
    sender = db.Column(db.String(200), nullable=False)
    received_date = db.Column(db.DateTime, nullable=False)
    attachment_count = db.Column(db.Integer, default=0)
    processed = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'sender': self.sender,
            'received_date': self.received_date.isoformat() if self.received_date else None,
            'attachment_count': self.attachment_count,
            'processed': self.processed
        }

# Dashboard statistics helper
class DashboardStats:
    @staticmethod
    def get_stats():
        from datetime import datetime, timedelta
        
        # Get current counts
        total_rfps = RFP.query.count()
        active_rfps = RFP.query.filter(RFP.status.in_(['New', 'In Progress', 'Under Review'])).count()
        
        # Calculate pending placements (mock calculation)
        pending_placements = sum([
            int(rfp.budget_range.split(' - ')[0].replace('$', '').replace('K', '000').replace('M', '000000')) // 10000
            for rfp in RFP.query.all() 
            if rfp.budget_range and ' - ' in rfp.budget_range
        ])
        
        # Calculate completion rate
        completed_rfps = RFP.query.filter_by(status='Completed').count()
        completion_rate = int((completed_rfps / total_rfps * 100)) if total_rfps > 0 else 0
        
        # Calculate potential revenue
        potential_revenue = sum([
            int(rfp.budget_range.split(' - ')[1].replace('$', '').replace('K', '000').replace('M', '000000'))
            for rfp in RFP.query.all() 
            if rfp.budget_range and ' - ' in rfp.budget_range
        ])
        
        # Get due this week
        week_start = datetime.now().date()
        week_end = week_start + timedelta(days=7)
        due_this_week = RFP.query.filter(
            RFP.due_date >= week_start,
            RFP.due_date <= week_end
        ).count()
        
        return {
            'active_rfps': active_rfps,
            'pending_placements': pending_placements,
            'ai_response_rate': 78,  # Mock value as shown in mockup
            'win_rate': 32,  # Mock value as shown in mockup
            'due_this_week': due_this_week,
            'completion_rate': completion_rate,
            'potential_revenue': potential_revenue / 1000000  # Convert to millions
        }
