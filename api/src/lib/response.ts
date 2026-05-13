import type { Context } from 'hono'

export const ok = (c: Context, data: unknown, status = 200) =>
  c.json({ data }, status as 200 | 201)

export const err = (c: Context, message: string, status = 400) =>
  c.json({ error: message }, status as 400 | 401 | 403 | 404 | 500)