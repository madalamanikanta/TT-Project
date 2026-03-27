# API Configuration Summary

## What Changed

- Centralized API configuration in `src/services/api.ts`
- Removed the hardcoded backend fallback from frontend runtime code
- Kept `src/config/apiConfig.ts` as a compatibility re-export
- Standardized admin API calls through shared service helpers
- Disabled `withCredentials` to avoid unnecessary credentialed cross-origin requests
- Added browser debug logging for base URL, requests, and API errors
- Updated backend CORS annotations to allow Vercel origins

## Current Request Flow

```text
VITE_API_BASE_URL
  -> src/services/api.ts
  -> normalized to https://<backend-origin>/api
  -> shared axios instance
  -> app requests like /auth/login and /admin/dashboard
```

## Important Rules

- Use `VITE_API_BASE_URL` exactly
- Use the shared `api` instance everywhere
- Use relative endpoint paths only
- Keep the backend origin on HTTPS for deployed environments

## Verification Checklist

- No hardcoded local backend URL remains in the frontend codebase
- No direct `axios.get()` or `axios.post()` calls remain outside the shared client
- API paths still match backend routes with the `/api` prefix applied centrally
- Production requests can target Render instead of the Vercel origin
