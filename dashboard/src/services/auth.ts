const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000/api'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  data: any
  user?: {
    id: string | number
    email: string
    username?: string
  }
  access_token?: string
  message?: string
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }))
    throw new Error(error.message || 'Invalid credentials')
  }

  return response.json()
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }))
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}

export async function logout() {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }

  return response.json()
}

export async function getProfile() {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }

  return response.json()
}

export async function updateProfile(data: { username?: string; email?: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update profile')
  }

  return response.json()
}

export async function changePassword(data: { current_password: string; new_password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Password change failed' }))
    throw new Error(error.message || 'Failed to change password')
  }

  return response.json()
}