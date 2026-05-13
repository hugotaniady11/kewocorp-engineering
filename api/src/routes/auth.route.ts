import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { login, logout, me } from '../controllers/auth.controller.js'

export const authRoute = new Hono()
authRoute.post('/login', login)
authRoute.post('/logout', authMiddleware, logout)
authRoute.get('/me', authMiddleware, me)