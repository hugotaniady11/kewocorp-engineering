import type { Context } from 'hono'
import { ok, err } from '../lib/response.js'
import * as AuthService from '../services/auth.service.js'

export async function login(c: Context) {
  try {
    const { email, password } = await c.req.json()

    if (!email || !password) {
      return err(c, 'Email and password required.', 400)
    }

    const data = await AuthService.signIn(email, password)
    return ok(c, data)
  } catch (e: unknown) {
    return err(c, e instanceof Error ? e.message : 'Login failed.', 401)
  }
}

export async function logout(c: Context) {
  try {
    await AuthService.signOut()
    return ok(c, { success: true })
  } catch {
    return err(c, 'Logout failed.', 500)
  }
}

export async function me(c: Context) {
  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return err(c, 'Unauthorized', 401)

    const user = await AuthService.getUserFromToken(token)
    return ok(c, { user })
  } catch {
    return err(c, 'Unauthorized', 401)
  }
}