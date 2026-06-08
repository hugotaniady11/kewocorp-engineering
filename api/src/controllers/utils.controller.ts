import type { Context } from 'hono'
import * as UtilsService from '../services/utils.service.js'
import { ok, err } from '../lib/response.js'

export async function uploadFile(c: Context) {
  try {
    const body = await c.req.parseBody()
    const data = await UtilsService.uploadFile(body as Record<string, unknown>)
    return ok(c, data, 201)
  } catch (error) {
    console.error('uploadFile error:', error)
    return err(c, 'Failed to upload file.', 500)
  }
}