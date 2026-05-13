import { apiFetch } from '@/lib/api'

export async function getProjects(params?: {
  featured?: boolean
  category?: string
  limit?: number
}) {
  return apiFetch('/projects', {
    method: 'GET',
    params,
  })
}

export async function getProjectById(id: number) {
  return apiFetch(`/projects/${id}`, {
    method: 'GET',
  })
}

export async function getProjectBySlug(slug: string) {
  return apiFetch(`/projects/slug/${slug}`, {
    method: 'GET',
  })
}