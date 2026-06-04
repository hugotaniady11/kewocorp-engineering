import { apiFetch } from '@/lib/api';

export async function getProjects(params?: {
  featured?: boolean
  category?: string
  limit?: number
}) {
  const searchParams = new URLSearchParams()

  if (params?.featured !== undefined) {
    searchParams.set('featured', String(params.featured))
  }

  if (params?.category) {
    searchParams.set('category', params.category)
  }

  if (params?.limit !== undefined) {
    searchParams.set('limit', String(params.limit))
  }

  const query = searchParams.toString()
  const url = query ? `/projects?${query}` : '/projects'

  return apiFetch(url, {
    method: 'GET',
  })
}

export async function getProjectById(id: number) {
  return apiFetch(`/projects/${id}`, {
    method: 'GET',
  });
}

export async function getProjectBySlug(slug: string) {
  return apiFetch(`/projects/slug/${slug}`, {
    method: 'GET',
  });
}

export async function createProject(data: any) {
  return apiFetch('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProject(id: number, data: any) {
  return apiFetch(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id: number) {
  return apiFetch(`/projects/${id}`, {
    method: 'DELETE',
  });
}