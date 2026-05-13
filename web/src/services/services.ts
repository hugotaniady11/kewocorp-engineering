import { apiFetch } from '@/lib/api'

export async function getServices() {
  return apiFetch('/services', {
    method: 'GET',
  })
}

export async function getServiceById(id: number) {
  return apiFetch(`/services/${id}`, {
    method: 'GET',
  })
}