# API Configuration Guide

This frontend now uses a single shared Axios client in `src/services/api.ts`.

## Required Environment Variable

```env
VITE_API_BASE_URL=https://your-backend-domain.example.com
VITE_API_TIMEOUT=30000
```

- `VITE_API_BASE_URL` must be the backend origin only.
- Do not include `/api`; the client appends it automatically.
- In production, use your Render backend HTTPS URL.

## How Requests Are Built

1. `src/services/api.ts` reads `import.meta.env.VITE_API_BASE_URL`
2. It normalizes the origin and appends `/api`
3. Every request goes through the shared Axios instance
4. Relative paths such as `/auth/login` become `https://your-backend-domain.example.com/api/auth/login`

## Debug Logging

The app logs:

```ts
console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL)
```

It also logs request and error details in the browser console to help diagnose deployment issues.

## CORS

If the frontend is hosted on Vercel, the backend must allow the Vercel origin. The backend in this workspace was updated to allow:

```java
@CrossOrigin(originPatterns = {"http://localhost:*", "https://*.vercel.app"}, allowCredentials = "true")
```

## Troubleshooting

- If requests hit the Vercel domain instead of Render, `VITE_API_BASE_URL` is missing or incorrect in Vercel.
- If requests fail before reaching the controller, check browser console CORS errors.
- If auth works in Postman but not in the browser, verify the frontend origin is allowed by backend CORS.
