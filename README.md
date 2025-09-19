# AdResponse - AI-Powered RFP Management System

A comprehensive Dynamics 365-style application for managing media RFPs with advanced AI integration for analysis, proposal generation, and quality assessment.

## 🚀 Live Demo

**Production Application**: https://lnh8imcwp0dm.manus.space

## ✨ Features

### 🎯 Core Functionality
- **RFP Import & Management**: Complete workflow for importing RFPs from emails with auto-population
- **AI-Powered Analysis**: Multi-AI integration (GPT-4, Gemini, Anthropic, Grok) for comprehensive RFP analysis
- **Proposal Generation**: Automated proposal creation with AI-powered content generation
- **Quality Assessment**: Multi-criteria quality checking with detailed scoring
- **Knowledge Base**: Full CRUD operations for articles, guides, and resources
- **Team Collaboration**: Assignment and collaboration workflows

### 🤖 AI Integration
- **Multi-Model Orchestration**: Leverages multiple AI models for optimal results
- **Confidence Scoring**: Real-time confidence assessment for AI-generated content
- **Risk Analysis**: Automated risk factor identification and mitigation strategies
- **Success Metrics**: AI-powered success prediction and optimization recommendations

### 💼 Enterprise Features
- **Dynamics 365 UI**: Authentic Microsoft Dynamics 365 design and branding
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Statistics**: Live dashboard metrics and performance tracking
- **Advanced Search**: Comprehensive filtering and search capabilities
- **Export Functionality**: PDF generation and document export

## 🛠 Technology Stack

### Frontend
- **React 18**: Modern component-based architecture
- **Tailwind CSS**: Professional enterprise styling
- **shadcn/ui**: Consistent design system components
- **React Router**: Single-page application navigation
- **Lucide Icons**: Professional icon library

### Backend
- **Flask**: Python web framework
- **SQLAlchemy**: Object-relational mapping
- **Flask-CORS**: Cross-origin resource sharing
- **RESTful API**: Clean API architecture

### AI Integration
- **OpenAI GPT-4**: Advanced language processing
- **Google Gemini**: Multimodal AI capabilities
- **Anthropic Claude**: Document analysis and reasoning
- **xAI Grok**: Market insights and creative innovation

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johnbatinovich/microsoftdemo2.git
   cd microsoftdemo2
   ```

2. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run the Flask application
   python src/main.py
   ```

3. **Frontend Setup**
   ```bash
   cd adresponse-frontend
   
   # Install dependencies
   npm install
   
   # Build for production
   npm run build
   
   # Copy build to Flask static directory
   cp -r dist/* ../src/static/
   ```

4. **Access the Application**
   - Open your browser to `http://localhost:5000`
   - The application will be running with full functionality

## 📁 Project Structure

```
microsoftdemo2/
├── src/                          # Flask backend
│   ├── main.py                   # Main application entry point
│   ├── static/                   # Built frontend files
│   └── templates/                # Flask templates
├── adresponse-frontend/          # React frontend source
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── public/                   # Public assets
│   └── package.json             # Frontend dependencies
├── requirements.txt              # Python dependencies
└── README.md                    # This file
```

## 🎯 Key Components

### Dashboard
- Real-time statistics and metrics
- Recent RFPs overview
- AI assistant interface
- Quick action buttons

### RFP Management
- Import from email attachments
- Form auto-population
- Team member assignment
- Status tracking and progress monitoring

### AI Analysis
- Multi-model analysis integration
- Confidence scoring
- Key insights and recommendations
- Risk factor assessment

### Proposal Generation
- AI-powered content creation
- Comprehensive proposal sections
- Quality assessment scoring
- PDF export functionality

### Knowledge Base
- Article creation and management
- Search and filtering
- Category organization
- View statistics and ratings

## 🔧 Configuration

### Environment Variables
The application uses environment variables for AI service integration:
- `OPENAI_API_KEY`: OpenAI API access
- `GEMINI_API_KEY`: Google Gemini API access
- `ANTHROPIC_API_KEY`: Anthropic Claude API access
- `XAI_API_KEY`: xAI Grok API access

### Development Mode
For development, the application includes mock AI responses to demonstrate functionality without requiring API keys.

## 🚀 Deployment

### Production Deployment
The application is deployed and running at: https://lnh8imcwp0dm.manus.space

### GitHub Pages (Frontend Only)
To deploy the frontend to GitHub Pages:

1. Build the React application
2. Configure GitHub Pages in repository settings
3. Deploy the `dist` folder contents

## 📊 Features Demonstrated

### ✅ Complete RFP Workflow
1. **Import**: Email-based RFP import with auto-population
2. **Analyze**: AI-powered analysis with confidence scoring
3. **Generate**: Automated proposal creation
4. **Quality Check**: Multi-criteria assessment
5. **Export**: PDF generation and sharing

### ✅ Knowledge Management
1. **Create**: Add new articles and resources
2. **Organize**: Category and tag-based organization
3. **Search**: Advanced filtering and search
4. **Track**: View statistics and engagement metrics

### ✅ Team Collaboration
1. **Assign**: Team member assignment to RFPs
2. **Track**: Progress monitoring and status updates
3. **Collaborate**: Shared workspace and communication

## 🎨 Design System

The application follows Microsoft Dynamics 365 design principles:
- **Professional Color Palette**: Blue primary with supporting colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing and layout patterns
- **Components**: Reusable UI components with proper states
- **Responsive**: Mobile-first responsive design

## 🔒 Security

- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Robust error management
- **CORS Configuration**: Proper cross-origin resource sharing
- **Data Protection**: Secure data handling practices

## 📈 Performance

- **Optimized Build**: Production-ready build optimization
- **Lazy Loading**: Component-based code splitting
- **Caching**: Efficient caching strategies
- **Responsive Images**: Optimized image loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Microsoft Dynamics 365 for design inspiration
- OpenAI, Google, Anthropic, and xAI for AI capabilities
- React and Flask communities for excellent frameworks
- Tailwind CSS and shadcn/ui for design systems

## 📞 Support

For questions or support, please open an issue in this repository or contact the development team.

---

**Built with ❤️ using React, Flask, and AI**
