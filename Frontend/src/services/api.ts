import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const API_TIMEOUT = 30000;

function normalizeApiBaseUrl(rawBaseUrl?: string): string {
  const trimmedBaseUrl = rawBaseUrl?.trim();

  if (!trimmedBaseUrl) {
    console.error('Missing VITE_API_BASE_URL. Set it in your Vercel and local frontend environment.');
    return '/api';
  }

  const withoutTrailingSlash = trimmedBaseUrl.replace(/\/+$/, '');
  const withoutApiSuffix = withoutTrailingSlash.endsWith('/api')
    ? withoutTrailingSlash.slice(0, -4)
    : withoutTrailingSlash;
  const parsedUrl = new URL(withoutApiSuffix);
  const isLocalhost = parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1';

  if (!isLocalhost && parsedUrl.protocol === 'http:') {
    parsedUrl.protocol = 'https:';
  }

  return `${parsedUrl.toString().replace(/\/+$/, '')}/api`;
}

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

console.log('API BASE URL:', import.meta.env.VITE_API_BASE_URL);

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

if (!import.meta.env.PROD) {
  console.debug('[API Config]', {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: false,
  });
}

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const requestUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
    console.debug('[API Request]', {
      method: config.method,
      url: requestUrl,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ error?: string }>) => {
    console.error('[API Error]', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      backendMessage: error.response?.data?.error,
    });

    if (error.response?.status === 401) {
      // Token expired or invalid, clear localStorage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
