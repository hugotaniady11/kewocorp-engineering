import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000/api';

interface ApiFetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function apiFetch(
  endpoint: string,
  options?: ApiFetchOptions
) {
  const token = getAuthToken();
  
  // Build URL with query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (options?.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}