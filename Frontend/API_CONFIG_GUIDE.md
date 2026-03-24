# API Configuration Guide

This document explains how to configure the API base URL for different environments.

## Environment Setup

### For Local Development

The `.env.local` file is automatically used for local development:

```env
# Local development (localhost:8080)
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=30000
```

**Note**: Make sure your backend is running on `http://localhost:8080` before starting the frontend.

### For Production Deployment

The `.env` file is used for production builds:

```env
# Production (Render deployment)
VITE_API_BASE_URL=https://smart-internship-skill-matching-portal-2.onrender.com
VITE_API_TIMEOUT=30000
```

## How It Works

1. **Base URL Configuration** (`src/config/apiConfig.ts`):
   - Reads `VITE_API_BASE_URL` environment variable
   - Automatically appends `/api` suffix to all requests
   - Falls back to `http://localhost:8080` if not set

2. **API Initialization** (`src/services/api.ts`):
   - Uses the `apiConfig` for axios base URL and timeout
   - Automatically adds JWT token from localStorage to all requests
   - Handles 401 (unauthorized) responses by redirecting to login

3. **Service Calls** (throughout the app):
   - All API endpoints use relative paths: `/auth/login`, `/internships`, etc.
   - The `/api` prefix is automatically added by the config

## Available API Routes

All routes are accessed with the `/api` prefix:

- **Authentication**: `/api/auth/login`, `/api/auth/register`, `/api/auth/profile/{id}`
- **Internships**: `/api/internships`, `/api/saved-internships`, `/api/internships/{id}`
- **Dashboard**: `/api/dashboard`
- **Admin**: `/api/admin/dashboard`, `/api/admin/users`, `/api/admin/internships`

## Adding a New Environment

To add a new deployment environment:

1. Create a `.env.{environment}` file (e.g., `.env.staging`)
2. Set `VITE_API_BASE_URL` to your backend URL
3. Update your build/deploy script to use that env file

Example for Staging:
```env
# Staging environment
VITE_API_BASE_URL=https://staging-internship-api.example.com
VITE_API_TIMEOUT=30000
```

## Troubleshooting

### "Network Error" or "Cannot connect to server"

1. Check if backend is running on the correct URL
2. Verify `VITE_API_BASE_URL` in `.env.local` matches your backend URL
3. Check browser console for CORS errors
4. Ensure backend has CORS headers properly configured

### API calls not authenticating

1. Verify JWT token is being saved in localStorage after login
2. Check that `Authorization: Bearer <token>` header is being sent
3. Verify token hasn't expired (24-hour expiration by default)
4. Check backend logs for authentication errors

### CORS Issues

Ensure the backend's CORS configuration includes your frontend origin:
```java
apiCors.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
));
```
