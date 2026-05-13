import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectBySlugHandler,
} from '../controllers/projects.controller'

export const projectsRoute = new Hono()
projectsRoute.get('/', getProjects)
projectsRoute.get('/slug/:slug', getProjectBySlugHandler)
projectsRoute.get('/:id', authMiddleware, getProjectById)
projectsRoute.post('/', authMiddleware, createProject)
projectsRoute.patch('/:id', authMiddleware, updateProject)
projectsRoute.delete('/:id', authMiddleware, deleteProject)