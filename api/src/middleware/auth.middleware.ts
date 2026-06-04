import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.replace('Bearer ', '').trim()
  const secret = process.env.SUPABASE_JWT_SECRET

  if (!secret) {
    return c.json({ error: 'SUPABASE_JWT_SECRET is missing' }, 500)
  }

  try {
    const payload = await verify(token, secret, 'HS256')
    c.set('userId', payload.sub as string)
    await next()
  } catch (error) {
    return c.json(
      {
        error: 'Unauthorized',
        message: error instanceof Error ? error.message : 'Invalid token',
      },
      401
    )
  }
})