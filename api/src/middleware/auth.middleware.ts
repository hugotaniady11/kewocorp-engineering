import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')

  if (!token || token !== 'mock-admin-token') {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('userId', 'mock-admin-user')
  await next()
})