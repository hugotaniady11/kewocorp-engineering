import type { Context } from 'hono'
import { ok, err } from '../lib/response.js'
import * as ProjectService from '../services/projects.service.js'
import { getProjectBySlug } from '../services/projects.service.js'

export async function getProjects(c: Context) {
  const featured = c.req.query('featured') === 'true' ? true : undefined
  const category = c.req.query('category') ?? undefined
  const limitParam = c.req.query('limit')
  const limit = limitParam ? Number.parseInt(limitParam, 10) : 100

  if (Number.isNaN(limit)) {
    return err(c, 'Invalid limit value.', 400)
  }

  try {
    const data = await ProjectService.getProjects({
      featured,
      category,
      limit,
    })
    return ok(c, data)
  } catch {
    return err(c, 'Failed to fetch projects.', 500)
  }
}

export async function getProjectById(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Project id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Invalid project id.', 400)

    const data = await ProjectService.getProjectById(id)
    if (!data) return err(c, 'Project not found.', 404)

    return ok(c, data)
  } catch {
    return err(c, 'Failed to fetch project.', 500)
  }
}

export async function createProject(c: Context) {
  try {
    const body = await c.req.json()
    const data = await ProjectService.createProject(body)
    return ok(c, data, 201)
  } catch {
    return err(c, 'Failed to create project.', 500)
  }
}

export async function updateProject(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Project id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Invalid project id.', 400)

    const body = await c.req.json()
    const data = await ProjectService.updateProject(id, body)
    if (!data) return err(c, 'Project not found.', 404)

    return ok(c, data)
  } catch {
    return err(c, 'Failed to update project.', 500)
  }
}

export async function deleteProject(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Project id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Invalid project id.', 400)

    const deleted = await ProjectService.deleteProject(id)
    if (!deleted) return err(c, 'Project not found.', 404)

    return ok(c, { success: true })
  } catch {
    return err(c, 'Failed to delete project.', 500)
  }
}

export async function getProjectBySlugHandler(c: Context) {
  try {
    const slug = c.req.param('slug')

    if (!slug) {
      return err(c, 'Project slug is required.', 400)
    }

    const project = await getProjectBySlug(slug)

    if (!project) {
      return err(c, 'Project not found.', 404)
    }

    return ok(c, project)
  } catch (e: unknown) {
    return err(c, e instanceof Error ? e.message : 'Failed to fetch project.', 500)
  }
}