# AGENTS.md

## Project Overview
**Hotel Booking Platform** - A modern Next.js application for hotel reservations and property management.

###### Important > [!NOTE] 
1. Dont use npm use pnpm insted of using npm 
2. what every you do in this project always update AGENTS.md File
3. always make sure this project doesnt not contain any type of mock data and dont use any type of mock data in this
4. use latest version of pnpm
5. Use hardcoded image for hero section and 
6. keep this web theme profisonal and clean
7. always read .md files in root directory

## Project Structure Analysis

### Core Technology Stack
- **Framework**: Next.js 14.2.16 with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: ImageKit.io for optimized image handling
- **Authentication**: Firebase Auth with role-based permissions
- **UI Library**: Radix UI components with Tailwind CSS
- **State Management**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS v4.1.9 with custom animations
- **Charts**: Recharts for analytics dashboards

### Application Architecture

#### User Roles & Features
1. **Guests**: Hotel search, booking, profile management
2. **Partners**: Property management, booking oversight
3. **Admins**: User management, system administration

#### Key Components
- **Hotel Search & Booking**: Search functionality, filters, hotel listings
- **Authentication**: Login/register forms with validation
- **Property Management**: Listing forms, benefits showcase
- **Admin Dashboard**: User management, property oversight
- **Partner Portal**: Property and booking management

## Potential AI Agents

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

### 3. Customer Support Chatbot
**Purpose**: 24/7 automated customer assistance
**Capabilities**:
- Handle booking inquiries and modifications
- Provide hotel information and amenities
- Troubleshoot common issues
- Escalate complex queries to human agents

### 4. Content Generation Agent
**Purpose**: Automated content creation for hotel listings
**Capabilities**:
- Generate compelling hotel descriptions
- Create SEO-optimized content
- Translate content for multiple languages
- Update property information automatically

### 5. Booking Analytics Agent
**Purpose**: Advanced analytics and insights for business intelligence
**Capabilities**:
- Analyze booking patterns and trends
- Generate performance reports for partners
- Predict demand fluctuations
- Optimize inventory management

### 6. Fraud Detection Agent
**Purpose**: Identify and prevent fraudulent bookings
**Capabilities**:
- Monitor suspicious booking patterns
- Validate payment information
- Flag high-risk transactions
- Protect against fake reviews

### 7. Review Sentiment Agent
**Purpose**: Analyze and manage customer reviews
**Capabilities**:
- Sentiment analysis of guest reviews
- Automated response suggestions
- Quality score calculations
- Trend identification in feedback

## Implementation Considerations

### Integration Points
- **API Routes**: `/api/` directory for agent endpoints
- **Database**: Integration with booking and user data
- **Real-time Updates**: WebSocket connections for live data
- **Authentication**: Firebase Auth with role-based permissions
- **User Management**: Secure agent access based on user roles

### Authentication System
- **Firebase Auth**: Email/password and Google OAuth integration
- **User Context**: React context for global auth state management
- **Protected Routes**: Role-based access control for admin/partner features
- **Session Management**: Automatic token refresh and persistence

### Technical Requirements
- **Performance**: Optimize for fast response times
- **Scalability**: Handle high concurrent user loads
- **Security**: Protect sensitive booking and payment data with Firebase Auth
- **Monitoring**: Track agent performance and accuracy

### Development Phases
1. **Phase 1**: Hotel Recommendation Agent (Core feature)
2. **Phase 2**: Customer Support Chatbot (User experience)
3. **Phase 3**: Analytics and Pricing Agents (Business intelligence)
4. **Phase 4**: Advanced security and content agents

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

/api/agents/
  ├── recommend.ts
  ├── pricing.ts
  ├── support.ts
  └── analytics.ts
```

---
*Last Updated: 2025-09-28 - Complete removal of all mock data and full real data integration: 1) Created PartnerSettings and Message models with comprehensive APIs for real data storage; 2) Replaced all mock data in partner settings with MongoDB-backed persistent storage; 3) Implemented real messaging system for partner inbox with database storage; 4) Updated guest ratings calculation to use actual review data from database; 5) Replaced mock analytics in admin reports with real data calculations based on user locations and system activity; 6) Fixed TypeScript errors in database connection handling; 7) All components now use real data from MongoDB and ImageKit.io instead of hardcoded or mock values; 8) Maintained existing partner panel MongoDB/ImageKit integration while eliminating all remaining mock data sources; 9) Added background image to hero section for enhanced visual appeal with proper overlay for text readability; 10) Fixed property listing form validation and added proper room configuration inputs with default valid values; 11) Updated featured hotels section to display 4 hotels in a single row on large screens for better visual layout; 12) Increased hotel card image height from 160px to 208px for better visual display and reduced card content padding; 13) Fixed UI issues in partner panel by removing duplicate navbar and sidebar components; 14) Removed spacing between icons and text throughout the application for a cleaner look; 15) Optimized hotel description display by limiting to single line to improve overall card layout; 16) Applied product card styling to hotel cards with 4:3 aspect ratio, proper borders, enhanced padding, star ratings display, and interactive elements.*
*Last Updated: 2025-09-28 - Removed the map pin button from featured hotel cards in components/featured-hotels.tsx to clean up the UI.*
*Last Updated: 2025-09-28 - Removed the star button from featured hotel cards in components/featured-hotels.tsx for a cleaner UI.*
*Last Updated: 2025-09-28 - Added py-4 padding to CardContent in components/featured-hotels.tsx to prevent the Book Now button from touching the card boundary.*
*Last Updated: 2025-09-28 - Removed default py-6 padding from Card in components/hotel-list.tsx by adding py-0 to eliminate white padding in hotel cards.*
*Last Updated: 2025-09-28 - Created TWEAKS1.md with comprehensive performance optimization suggestions (60+ tweaks) for the hotel booking platform.*
*Last Updated: 2025-09-28 - Decreased product card height by changing aspect ratio from 4/3 to 3/2 in featured hotels and reducing image height from 256px to 192px in hotel list for a more compact layout.*
*Last Updated: 2025-09-28 - Implemented critical security fixes from ISSUE.md: added server-side Firebase token verification to API routes, secured settings endpoint with admin access and redaction, protected upload endpoint, added Zod validation to prevent mass-assignment, and restricted test-db to admins.*
*Last Updated: 2025-09-28 - Extended security fixes: added authentication and validation to /api/users, /api/bookings, /api/reviews; improved settings redaction to handle nested schema fields; updated ISSUE.md with current fix status.*
*Last Updated: 2025-09-28 - Made Book Now buttons functional: added onClick handlers to create bookings via API with default dates for logged-in users in both featured hotels and hotel list components.*
*Last Updated: 2025-09-28 - Implemented hotel details page: created dynamic route app/hotels/[id]/page.tsx with comprehensive hotel information display including image gallery, amenities, room details, ratings, and booking functionality; updated View Details button in hotel-list.tsx to link to the new details page; removed all hardcoded mock data and replaced with dynamic real data (dates now use tomorrow/day after tomorrow instead of hardcoded 2025 dates).*
*Last Updated: 2025-09-28 - Made search forms smaller on mobile devices: reduced input heights from h-12 to h-10 on mobile (md:h-12), decreased CardContent padding from p-6 to p-4 on mobile (md:p-6), reduced grid gaps from gap-4 to gap-2 on mobile (md:gap-4), and adjusted button sizes from h-12 px-8 to h-10 px-6 on mobile (md:h-12 md:px-8) in both hotel-search.tsx and hero-section.tsx components for better mobile usability.*"
*Project: Hotel Booking Platform*
