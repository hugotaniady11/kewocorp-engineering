import { apiFetch } from '@/lib/api'

export async function getServices() {
  return apiFetch('/services', { method: 'GET' })
}

export async function getServiceById(id: number) {
  return apiFetch(`/services/${id}`, { method: 'GET' })
}

export async function createService(data: Record<string, any>) {
  return apiFetch('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateService(id: number, data: Record<string, any>) {
  return apiFetch(`/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteService(id: number) {
  return apiFetch(`/services/${id}`, { method: 'DELETE' })
}