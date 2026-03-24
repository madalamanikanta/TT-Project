# Frontend API Setup - Quick Start

## Installation & Configuration

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Local Development Setup (Already Configured)

The `.env.local` file is pre-configured for local development:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=30000
```

**Requirements:**
- Backend must be running on `http://localhost:8080`
- Ensure both backend and frontend are using the same CORS configuration

### 3. Running Locally

```bash
# Terminal 1: Start Backend (from backend directory)
cd backend
./mvnw spring-boot:run

# Terminal 2: Start Frontend (from Frontend directory)
npm run dev
```

**Frontend will be available at:** `http://localhost:5173`

### 4. Production Deployment (Render)

The `.env` file is configured for Render deployment:
```env
VITE_API_BASE_URL=https://smart-internship-skill-matching-portal-2.onrender.com
VITE_API_TIMEOUT=30000
```

**Build for production:**
```bash
npm run build
```

## Environment Variables Reference

| Variable | Description | Local Example | Production Example |
|----------|----------|-------|---------|
| `VITE_API_BASE_URL` | Backend domain (WITHOUT /api) | `http://localhost:8080` | `https://smart-internship-skill-matching-portal-2.onrender.com` |
| `VITE_API_TIMEOUT` | Request timeout in ms | `30000` | `30000` |

## API Base URLs

The application automatically configures the base URL based on environment:

- **Local**: `http://localhost:8080/api` (from `http://localhost:8080`)
- **Production**: `https://smart-internship-skill-matching-portal-2.onrender.com/api` (from domain)

## All API Routes (Relative paths)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/auth/profile/{id}` | GET | Get user profile |
| `/internships` | GET | List all internships |
| `/internships/{id}` | GET | Get single internship |
| `/saved-internships` | GET | Get user's saved internships |
| `/saved-internships/{id}` | POST/DELETE | Save/unsave internship |
| `/dashboard` | GET | Get user dashboard data |
| `/admin/dashboard` | GET | Admin dashboard stats |
| `/admin/users` | GET | List all users |
| `/admin/internships` | GET/POST | List/create internships |

## Troubleshooting

### Issue: "Cannot connect to server"
**Solution:** 
- Backend must be running on `http://localhost:8080`
- Check `VITE_API_BASE_URL` in `.env.local`
- Restart both backend and frontend

### Issue: "Unauthorized" errors on protected routes
**Solution:**
- Clear browser localStorage and re-login
- Check if JWT token is being stored (check DevTools → Application → Local Storage)
- Verify backend token expiration (default: 24 hours)

### Issue: CORS errors in browser console
**Solution:**
- Verify backend CORS is configured correctly
- Backend should allow origins: `http://localhost:5173`, `http://localhost:5174`, `http://localhost:3000`

## Development Notes

- **API Config**: `src/config/apiConfig.ts` - Centralized configuration
- **API Client**: `src/services/api.ts` - Axios instance with interceptors
- **Auto Token**: JWT token from localStorage is automatically added to all requests
- **Auto Redirect**: Expired tokens (401) automatically redirect to login
- **withCredentials**: Enabled for cookie-based authentication fallback

## Next Steps

1. Start both backend and frontend
2. Navigate to `http://localhost:5173`
3. Register a new account or login
4. Test protected routes (student/admin dashboards)
