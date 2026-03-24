# API Base URL Configuration - Complete Setup Summary

## 🎯 Objectives Completed

✅ Created a central API config file (`src/config/apiConfig.ts`)  
✅ Configured environment variables for local and production  
✅ Removed hardcoded backend URLs from error messages  
✅ Ensured all API calls use the same centralized base URL  
✅ Fixed API base URL to correctly call `/api/*` endpoints  
✅ Made configuration work for both localhost and Render deployment  

---

## 📁 Files Created/Modified

### New Files Created
1. **`src/config/apiConfig.ts`** - Centralized API configuration
2. **`.env.local`** - Local development environment variables
3. **`API_CONFIG_GUIDE.md`** - Detailed configuration documentation
4. **`SETUP_GUIDE.md`** - Quick start guide

### Modified Files
1. **`src/services/api.ts`** - Uses centralized `apiConfig` instead of hardcoded URLs
2. **`.env`** - Updated with correct production URL
3. **`src/app/pages/LoginPage.tsx`** - Generic error messages
4. **`src/app/pages/student/Dashboard.tsx`** - Generic error messages
5. **`src/app/pages/student/MatchedInternships.tsx`** - Generic error messages
6. **`src/app/pages/student/SavedInternships.tsx`** - Generic error messages

---

## 🔧 How It Works

### Configuration Flow

```
Environment Variables (.env / .env.local)
        ↓
    apiConfig.ts (reads VITE_API_BASE_URL)
        ↓
    Appends "/api" suffix automatically
        ↓
    api.ts (creates Axios instance)
        ↓
    All service calls use relative paths (/auth/login, /internships, etc.)
        ↓
    Final URL: http://localhost:8080/api/auth/login
```

### Environment Configurations

#### Local Development (`.env.local`)
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=30000
```
**Resolves to:** `http://localhost:8080/api`

#### Production (`.env`)
```env
VITE_API_BASE_URL=https://smart-internship-skill-matching-portal-2.onrender.com
VITE_API_TIMEOUT=30000
```
**Resolves to:** `https://smart-internship-skill-matching-portal-2.onrender.com/api`

---

## 🚀 Using the Configuration

### Local Development

```bash
# Ensure backend is running on localhost:8080
cd backend
./mvnw spring-boot:run

# In another terminal, start frontend
cd Frontend
npm run dev
```

The `.env.local` file will automatically configure the API to use `http://localhost:8080/api`

### Production Build

```bash
cd Frontend
npm run build
```

The `.env` file will automatically configure the API to use Render's backend URL

---

## 📋 API Endpoints Reference

All endpoints are accessed with the `/api` prefix (automically added):

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/profile/{id}` - Get user profile

### Internships
- `GET /api/internships` - List all internships
- `GET /api/internships/{id}` - Get internship details
- `GET /api/internships/matches` - Get matched internships
- `POST/DELETE /api/saved-internships/{id}` - Save/unsave internship
- `GET /api/saved-internships` - Get user's saved internships

### Dashboard
- `GET /api/dashboard` - Student dashboard data

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - List all users
- `GET /api/admin/internships` - List internships
- `POST /api/admin/internships` - Create internship

---

## 🔐 Security Features

✅ JWT token automatically added to all requests  
✅ Cookies supported for cross-origin authentication  
✅ Automatic 401 redirect to login on token expiration  
✅ withCredentials enabled for secure cookie handling  

---

## ✨ Key Features

1. **Centralized Configuration** - Single source of truth for API URLs
2. **Environment-Aware** - Different configs for local, staging, and production
3. **Automatic `/api` Suffix** - No need to repeat `/api` in every service call
4. **Fallback Support** - Defaults to localhost if env variable not set
5. **Debug Logging** - Console logs API config in development
6. **Tab Isolation** - Each environment file only used in that context

---

## 🧪 Testing the Setup

1. **Check API Config is Loaded:**
   - Open browser DevTools Console
   - Look for `[API Config]` debug message
   - Should show correct baseURL

2. **Test API Calls:**
   - Navigate to login page
   - Open Network tab in DevTools
   - Attempt login
   - All requests should go to correct base URL

3. **Check Token Management:**
   - After successful login, check localStorage
   - Should have `token`, `user`, and `role` stored
   - All subsequent requests should include `Authorization: Bearer <token>`

---

## 🐛 Troubleshooting

### "Cannot connect to server" Error
- ✅ Backend must be running on `http://localhost:8080`
- ✅ Check `.env.local` is in the right directory
- ✅ Run `npm install` to ensure dependencies are loaded
- ✅ Clear browser cache if necessary

### API Returns 404
- ✅ Check that base URL is correct in console logs
- ✅ Verify all API routes include `/api` prefix in your code
- ✅ Make sure backend is running and has all routes configured

### CORS Errors
- ✅ Backend must have CORS configured for frontend origin
- ✅ Allowed origins should include `http://localhost:5173` for dev
- ✅ Check backend `SecurityConfig.java` CORS settings

### Token Not Persisting
- ✅ Check if cookies are enabled in browser
- ✅ Verify `withCredentials: true` in api.ts
- ✅ Backend must set `cookie.setSecure(false)` for http (localhost)

---

## 📊 File Structure

```
Frontend/
├── .env (Production config)
├── .env.local (Development config) 
├── src/
│   ├── config/
│   │   └── apiConfig.ts (NEW - Centralized config)
│   ├── services/
│   │   ├── api.ts (UPDATED - Uses apiConfig)
│   │   ├── internship.ts (Uses relative paths)
│   │   └── admin.ts (Uses relative paths)
│   └── app/
│       └── pages/
│           ├── LoginPage.tsx (UPDATED - Generic errors)
│           └── student/
│               ├── Dashboard.tsx (UPDATED - Generic errors)
│               ├── MatchedInternships.tsx (UPDATED - Generic errors)
│               └── SavedInternships.tsx (UPDATED - Generic errors)
├── SETUP_GUIDE.md (NEW - Quick start)
└── API_CONFIG_GUIDE.md (NEW - Detailed docs)
```

---

## ✅ Verification Checklist

- [x] `apiConfig.ts` created with proper environment variable handling
- [x] `.env.local` configured for local development
- [x] `.env` updated for production
- [x] `api.ts` updated to use centralized config
- [x] All error messages made generic (not hardcoded URLs)
- [x] `/api` suffix automatically appended
- [x] All API calls use relative paths
- [x] JWT token interceptor in place
- [x] 401 auto-redirect implemented
- [x] withCredentials enabled for cookies
- [x] Debug logging added for development
- [x] Documentation created

---

## 🎓 Next Steps

1. Start both backend and frontend
2. Test login flow
3. Verify API calls in DevTools Network tab
4. Check console for `[API Config]` debug message
5. Test protected routes
6. Deploy to Render using `.env` configuration

---

**All changes are backward compatible and require no modifications to existing service code!**
