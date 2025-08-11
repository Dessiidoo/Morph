# FaceSwap Studio - AI Photo Editor

## Overview

FaceSwap Studio is a modern web application that provides AI-powered photo editing capabilities with a focus on face enhancement and modification. The application offers various filters including beautification effects (skin smoothing, eye enhancement, teeth whitening, face slimming) and animal morphing filters (bunny ears, cat features, dog nose, bear face). It features a React-based frontend with a clean, intuitive interface and an Express.js backend for image processing and storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Image Processing**: Canvas API with OpenCV.js integration for face detection and filter application

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with multipart form data support for image uploads
- **File Handling**: Multer middleware for processing image uploads with 10MB size limits
- **Image Storage**: Base64 encoding for processed images stored in memory
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **Primary Storage**: In-memory storage using Map data structure for development
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions ready for production
- **Image Format**: Base64 encoded image data for easy transport and storage
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used)

### Face Detection and Processing
- **Computer Vision**: OpenCV.js for client-side face detection and landmark identification
- **Filter Processing**: Custom filter algorithms for beautification and animal morphing effects
- **Canvas Manipulation**: Direct pixel manipulation and overlay rendering for real-time effects
- **Intensity Controls**: Adjustable filter strength with slider controls (0-100% intensity)

### Development and Build System
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Hot module replacement with proxy setup for API requests
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Code Organization**: Monorepo structure with clear separation of client, server, and shared code

## External Dependencies

### Core Technologies
- **React Ecosystem**: React 18+ with TypeScript, React Query for data fetching
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling approach

### Image Processing
- **OpenCV.js**: Computer vision library for face detection and image manipulation
- **Canvas API**: Native browser API for pixel-level image processing
- **Multer**: Node.js middleware for handling multipart/form-data file uploads

### Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Database Migrations**: Automated schema management with Drizzle Kit

### Development Tools
- **Vite**: Fast build tool with HMR support and plugin ecosystem
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins for seamless coding experience

### Form and Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation