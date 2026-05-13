import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware'
import { login, logout, me } from '../controllers/auth.controller'

export const authRoute = new Hono()
authRoute.post('/login', login)
authRoute.post('/logout', authMiddleware, logout)
authRoute.get('/me', authMiddleware, me)