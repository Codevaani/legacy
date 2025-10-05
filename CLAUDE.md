# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StayHub is a premium hotel booking platform built with Next.js 14, TypeScript, and Tailwind CSS. The application serves multiple user roles:
- **Guests**: Browse and book hotels
- **Partners**: Manage properties and bookings
- **Admins**: Oversee platform operations

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Firebase Auth (client-side) + custom MongoDB user management
- **Database**: MongoDB with Mongoose ODM
- **Image Handling**: ImageKit integration
- **State Management**: React Context (AuthContext)
- **Forms**: React Hook Form with Zod validation

### Authentication System
The app uses a dual authentication approach:
1. **Firebase Auth**: Handles user authentication and token management
2. **MongoDB User Records**: Stores additional user data, roles, and business information

Key auth patterns:
- Firebase tokens are automatically attached to API calls via patched fetch
- User roles: `guest`, `partner`, `admin`
- Admin routes protected by middleware (`middleware.ts`)
- Auth context manages both Firebase user and MongoDB user data

### Database Models
Located in `models/` directory:
- **User**: Firebase-linked user profiles with role-based access
- **Hotel**: Property listings with rooms, amenities, and approval workflow
- **Booking**: Reservation management system
- **SupportTicket**: Customer support tracking
- **SecurityEvent**: Security monitoring and logging

### API Structure
RESTful APIs in `app/api/` following Next.js 14 App Router conventions:
- `/api/users` - User management and role assignments
- `/api/hotels` - Property CRUD operations
- `/api/bookings` - Reservation management
- `/api/auth/verify-admin` - Admin verification middleware
- All API routes require Firebase token authentication

### Component Organization
- `components/ui/` - shadcn/ui component library
- `components/auth/` - Authentication forms
- `components/admin/` - Admin dashboard components
- `components/partner/` - Partner management interface
- `components/profile/` - User profile management

### Key Features
- Multi-role dashboard system with dedicated layouts
- Property approval workflow for partners
- Real-time booking management
- Image upload with ImageKit integration
- Responsive design with mobile support
- Dark/light theme support

### Environment Variables Required
- `MONGODB_URI` - MongoDB connection string
- Firebase configuration variables
- ImageKit credentials

### Security Notes
- Admin routes protected by middleware verification
- Firebase tokens validated on API calls
- Role-based access control throughout application
- MongoDB indexes for performance and security

### Development Patterns
- Client components marked with `"use client"`
- Server components for data fetching
- TypeScript interfaces defined inline in components
- Consistent error handling with toast notifications
- Form validation using Zod schemas