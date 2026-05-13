import { apiFetch } from '@/lib/api'

export async function getProjects(params = {}) {
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