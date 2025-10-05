# StayHub Agent Documentation

This document describes the various AI agents and automation systems integrated into the StayHub hotel booking platform.

## Project Overview
**Hotel Booking Platform** - A modern Next.js application for hotel reservations and property management.

## Development Guidelines

> [!IMPORTANT]
> 1. **Use pnpm instead of npm** - Always use pnpm for package management
> 2. **Update AGENTS.md** - Document all changes in this file
> 3. **No mock data** - Never use mock data, always use real data from MongoDB/ImageKit
> 4. **Latest pnpm** - Use the latest version of pnpm
> 5. **Hero section images** - Use hardcoded images for hero section
> 6. **Professional theme** - Maintain a clean, professional web theme
> 7. **Read documentation** - Always read .md files in root directory before making changes

## Architecture Overview

### Core Technology Stack
- **Framework**: Next.js 14.2.16 with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: ImageKit.io for optimized image handling
- **Authentication**: Firebase Auth with role-based permissions
- **UI Library**: Radix UI components with Tailwind CSS
- **State Management**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS v4.1.9 with custom animations
- **Charts**: Recharts for analytics dashboards

### User Roles & Features
1. **Guests**: Hotel search, booking, profile management
2. **Partners**: Property management, booking oversight
3. **Admins**: User management, system administration

## AI Agent Architecture

### 1. Hotel Recommendation Agent
**Purpose**: Intelligent hotel suggestions based on user preferences
**Capabilities**:
- Analyze user search patterns and booking history
- Recommend hotels based on location, price, amenities
- Personalized suggestions using ML algorithms
- Integration with hotel search and featured hotels components

### 2. Dynamic Pricing Agent
**Purpose**: Optimize hotel pricing based on demand and market conditions
**Capabilities**:
- Real-time price adjustments based on occupancy
- Competitor price analysis
- Seasonal demand forecasting
- Integration with property management system

### 3. Customer Support Agent
**Purpose**: 24/7 automated customer assistance
**Capabilities**:
- Handle booking inquiries and modifications
- Provide hotel information and amenities
- Troubleshoot common issues
- Escalate complex queries to human agents
- Integration with SupportTicket model and `/api/support` endpoints

### 4. Revenue Management Agent
**Purpose**: Optimizes pricing and revenue for partner properties
**Capabilities**:
- Dynamic pricing recommendations
- Competitor price monitoring
- Demand forecasting
- Seasonal pricing adjustments
- Occupancy rate optimization
- Integration with `Hotel` and `Booking` models

### 5. Guest Experience Agent
**Purpose**: Enhances guest satisfaction and personalization
**Capabilities**:
- Personalized hotel recommendations
- Pre-arrival guest communication
- Post-stay feedback collection
- Loyalty program management
- Special occasion recognition
- Integration with User preferences and Booking history

### 6. Operations Management Agent
**Purpose**: Streamlines platform operations and maintenance
**Capabilities**:
- Property approval workflow automation
- Quality assurance checks
- Performance monitoring
- Alert management
- System health checks
- Integration with SystemAlert model and `/api/alerts` endpoints

### 7. Security & Compliance Agent
**Purpose**: Monitors platform security and regulatory compliance
**Capabilities**:
- Fraud detection and prevention
- Suspicious activity monitoring
- Compliance audit assistance
- Data privacy enforcement
- Security incident response
- Integration with SecurityEvent model and `/api/security` endpoints

### 8. Analytics Agent
**Purpose**: Provides business intelligence and insights
**Capabilities**:
- Booking trend analysis
- Market performance metrics
- Customer behavior insights
- Revenue forecasting
- Custom report generation
- Analyzes data across all models for admin dashboard

### 9. Content Generation Agent
**Purpose**: Automated content creation for hotel listings
**Capabilities**:
- Generate compelling hotel descriptions
- Create SEO-optimized content
- Translate content for multiple languages
- Update property information automatically

### 10. Review Sentiment Agent
**Purpose**: Analyze and manage customer reviews
**Capabilities**:
- Sentiment analysis of guest reviews
- Automated response suggestions
- Quality score calculations
- Trend identification in feedback

## Implementation Architecture

### Communication Patterns
- **Event-Driven Architecture**: Agents communicate through standardized events
- **Real-time Updates**: WebSocket connections for live data
- **Queue-based Processing**: For heavy operations
- **RESTful APIs**: For agent requests with Firebase token authentication

### Data Flow
1. **Input Collection**: Agents collect data from various sources
2. **Processing**: Analyze and process using AI/ML models
3. **Decision Making**: Apply business rules and logic
4. **Action Execution**: Perform automated tasks or recommendations
5. **Feedback Loop**: Learn from outcomes and improve

### Core Components

**Agent Manager** (`/lib/agent-manager.ts`):
- Coordinates all agent activities
- Manages agent lifecycle
- Handles inter-agent communication

**Message Queue** (`/lib/message-queue.ts`):
- Processes asynchronous agent tasks
- Handles prioritization
- Ensures reliable delivery

**Decision Engine** (`/lib/decision-engine.ts`):
- Core AI/ML decision making
- Business rule evaluation
- Context-aware responses

## API Endpoints

### Agent Management
- `POST /api/agents/trigger` - Manually trigger an agent
- `GET /api/agents/status` - Check agent status and health
- `POST /api/agents/config` - Update agent configuration
- `GET /api/agents/logs` - View agent activity logs

### Agent-Specific Endpoints
- `/api/agents/recommendation` - Hotel recommendations
- `/api/agents/pricing` - Dynamic pricing
- `/api/agents/support` - Customer service
- `/api/agents/analytics` - Analytics and reporting
- `/api/agents/security` - Security monitoring
- `/api/agents/operations` - Operations automation

## Security & Monitoring

### Data Privacy
- GDPR compliance for EU users
- Data encryption in transit and at rest
- User consent management
- Data retention policies

### Performance Metrics
- Response time tracking
- Task completion rates
- Error rate monitoring
- User satisfaction scores
- Cost per interaction

## File Structure for AI Integration
```
/agents/
  ├── recommendation/
  ├── pricing/
  ├── support/
  ├── content/
  ├── analytics/
  ├── fraud-detection/
  └── review-sentiment/

/lib/
  ├── agent-manager.ts
  ├── message-queue.ts
  └── decision-engine.ts

/api/agents/
  ├── recommend.ts
  ├── pricing.ts
  ├── support.ts
  ├── analytics.ts
  └── security.ts

config/
  ├── agents.json
  ├── workflows.json
  └── rules.json
```

## Development Phases
1. **Phase 1**: Hotel Recommendation Agent (Core feature)
2. **Phase 2**: Customer Support Agent (User experience)
3. **Phase 3**: Analytics and Pricing Agents (Business intelligence)
4. **Phase 4**: Advanced security and content agents

---

## Recent Updates

*Last Updated: 2025-10-04 - Created comprehensive AGENTS.md documentation with detailed AI agent architecture, implementation guidelines, and development phases for the StayHub hotel booking platform.*
*Last Updated: 2025-10-04 - Integrated fraud alert popup system with booking functionality across all hotel components: 1) Created comprehensive FraudAlertPopup component with security warnings and safety tips; 2) Updated featured-hotels.tsx to show fraud alert before booking with proper state management; 3) Modified hotel-list.tsx to include fraud alert for all booking actions; 4) Enhanced hotel details page booking flow with fraud alert integration; 5) Replaced all basic alert() calls with toast notifications; 6) Added proper booking confirmation flow with user authentication checks; 7) Implemented consistent booking date logic across all components using tomorrow/day-after dates; 8) Enhanced security messaging with clear warnings about fraudulent activities, advance payments, and property verification requirements.*
*Last Updated: 2025-10-04 - Transformed booking system to enquiry-based workflow with owner contact details: 1) Replaced all "Book Now" buttons with "Enquiry" buttons across all hotel components; 2) Created OwnerDetailsPopup component displaying comprehensive owner information including contact details, business address, verification status, and property statistics; 3) Updated FraudAlertPopup to support both booking and enquiry flows with contextual messaging; 4) Modified featured-hotels.tsx, hotel-list.tsx, and hotel details page to fetch and display owner details after fraud alert confirmation; 5) Implemented secure owner data fetching via /api/users endpoint with proper error handling; 6) Added direct contact functionality with email and phone number integration; 7) Enhanced user experience with verification badges, safety reminders, and professional owner presentation; 8) Updated button text and descriptions to reflect enquiry-based approach instead of instant booking.*