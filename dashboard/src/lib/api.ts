import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000/api';

interface ApiFetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

  const token = localStorage.getItem('token')

  console.log('token:', token)
  console.log('url:', `${API_BASE_URL}${path}`)

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  console.log('status:', response.status)
  console.log('response:', data)

  if (!response.ok) {
    throw new Error(
      typeof data === 'string'
        ? data
        : data?.message || data?.error || `Request failed: ${response.status}`
    )
  }

  return data
}