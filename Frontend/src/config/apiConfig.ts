/**
 * Centralized API configuration for both local and deployed environments.
 * 
 * Environment variables:
 * - VITE_API_BASE_URL: Full base URL including domain, WITHOUT /api suffix
 *   (e.g., http://localhost:8080 or https://api.example.com)
 * - VITE_API_TIMEOUT: Request timeout in milliseconds (default: 30000)
 * 
 * The /api suffix is automatically appended.
 */

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

function getApiConfig(): ApiConfig {
  // Get base URL from environment variable, or use localhost for development
  let apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'http://localhost:8080'); // Fallback to localhost

  // Ensure no trailing slash and add /api prefix
  apiBaseUrl = apiBaseUrl.replace(/\/$/, ''); // Remove trailing slash if present
  apiBaseUrl = `${apiBaseUrl}/api`;

  // Get timeout from environment or use default
  const timeout = import.meta.env.VITE_API_TIMEOUT 
    ? parseInt(import.meta.env.VITE_API_TIMEOUT as string, 10)
    : 30000;

  return {
    baseURL: apiBaseUrl,
    timeout,
  };
}

export const apiConfig = getApiConfig();

// Log configuration on non-production environments
if (!import.meta.env.PROD) {
  console.debug('[API Config]', {
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
  });
}

export default apiConfig;
