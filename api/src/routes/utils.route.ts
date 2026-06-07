import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadFile } from '../controllers/utils.controller.js'

export const utilsRoute = new Hono()

utilsRoute.post('/upload', authMiddleware, uploadFile)