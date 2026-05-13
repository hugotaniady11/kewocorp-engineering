export async function signIn(email: string, password: string) {
  if (email !== 'admin@kewocorp.com' || password !== 'admin123') {
    throw new Error('Invalid credentials')
  }

  return {
    user: {
      id: 'mock-admin-user',
      email: 'admin@kewocorp.com',
      role: 'admin',
    },
    access_token: 'mock-admin-token',
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  }
}

export async function signOut() {
  return { success: true }
}

export async function getUserFromToken(token: string) {
  if (token !== 'mock-admin-token') {
    throw new Error('Invalid token')
  }

  return {
    id: 'mock-admin-user',
    email: 'admin@kewocorp.com',
    role: 'admin',
  }
}