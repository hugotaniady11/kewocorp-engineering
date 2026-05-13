import type { Context } from 'hono'
import { ok, err } from '../lib/response.js'
import * as ServiceService from '../services/services.service.js'

export async function getServices(c: Context) {
  try {
    const data = await ServiceService.getServices(true)
    return ok(c, data)
  } catch {
    return err(c, 'Failed to fetch services.', 500)
  }
}

export async function getServiceById(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Service id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Service id must be a number.', 400)

    const data = await ServiceService.getServiceById(id)
    if (!data) return err(c, 'Service not found.', 404)

    return ok(c, data)
  } catch {
    return err(c, 'Failed to fetch service.', 500)
  }
}

export async function createService(c: Context) {
  try {
    const body = await c.req.json()
    const data = await ServiceService.createService(body)
    return ok(c, data, 201)
  } catch {
    return err(c, 'Failed to create service.', 500)
  }
}

export async function updateService(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Service id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Service id must be a number.', 400)

    const body = await c.req.json()
    const data = await ServiceService.updateService(id, body)
    if (!data) return err(c, 'Service not found.', 404)

    return ok(c, data)
  } catch {
    return err(c, 'Failed to update service.', 500)
  }
}

export async function deleteService(c: Context) {
  try {
    const idParam = c.req.param('id')
    if (!idParam) return err(c, 'Service id is required.', 400)

    const id = Number(idParam)
    if (Number.isNaN(id)) return err(c, 'Service id must be a number.', 400)

    const deleted = await ServiceService.deleteService(id)
    if (!deleted) return err(c, 'Service not found.', 404)

    return ok(c, { success: true })
  } catch {
    return err(c, 'Failed to delete service.', 500)
  }
}