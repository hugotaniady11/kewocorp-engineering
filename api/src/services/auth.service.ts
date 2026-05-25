import { supabase } from "../lib/supabase.js"

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message || 'Invalid credentials')
  }

  return {
    user: data.user,
    session: data.session,
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
    expires_at: data.session?.expires_at,
  }
}

export async function signOut(token: string) {
  const { error } = await supabase.auth.admin.signOut(token, 'local')
  if (error) {
    throw new Error(error.message || 'Sign out failed')
  }

  return { success: true }
}

export async function getUserFromToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    throw new Error(error?.message || 'Invalid token')
  }

  return data.user
}