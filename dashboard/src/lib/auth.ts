export function setAuthToken(token: string) {
  document.cookie = `auth_token=${token}; path=/; max-age=86400` // 24 hours
  localStorage.setItem('auth_token', token)
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null // SSR guard
  return localStorage.getItem('auth_token')
}

export function removeAuthToken() {
  document.cookie = 'auth_token=; path=/; max-age=0' // clear cookie
  localStorage.removeItem('auth_token')
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}