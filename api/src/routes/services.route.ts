import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/services.controller.js'

export const servicesRoute = new Hono()
servicesRoute.get('/', getServices)
servicesRoute.get('/:id', authMiddleware, getServiceById)
servicesRoute.post('/', authMiddleware, createService)
servicesRoute.patch('/:id', authMiddleware, updateService)
servicesRoute.delete('/:id', authMiddleware, deleteService)