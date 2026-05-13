import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller'

export const projectsRoute = new Hono()
projectsRoute.get('/', getProjects)
projectsRoute.get('/:id', authMiddleware, getProjectById)
projectsRoute.post('/', authMiddleware, createProject)
projectsRoute.patch('/:id', authMiddleware, updateProject)
projectsRoute.delete('/:id', authMiddleware, deleteProject)