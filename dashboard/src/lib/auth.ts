export function setAuthToken(_token: string) {
  localStorage.setItem('access_token', _token)
  localStorage.setItem('token', _token)
}

export function getAuthToken(): null {
  // HttpOnly cookies cannot be read from JavaScript
  return null
}

export function removeAuthToken() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('token')
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000/api'

    const token = localStorage.getItem('access_token')

    if (!token) return false

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.ok
  } catch {
    return false
  }
}