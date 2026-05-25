export function setAuthToken(_token: string) {
  // No-op: auth cookie should be set by the backend via Set-Cookie
}

export function getAuthToken(): null {
  // HttpOnly cookies cannot be read from JavaScript
  return null
}

export function removeAuthToken() {
  // No-op: auth cookie should be cleared by calling the logout API
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000/api'

    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    })

    return response.ok
  } catch {
    return false
  }
}