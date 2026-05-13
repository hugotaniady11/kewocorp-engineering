type Project = {
  id: number
  title: string
  client: string
  slug: string
  description: string
  image_url: string
  video_url: string
  category: string
  tags: string[]
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

let projects: Project[] = [
  {
    id: 1,
    title: 'Warehouse Expansion',
    client: 'PT Example Logistics',
    slug: 'warehouse-expansion',
    description: 'Industrial expansion project for logistics operations.',
    image_url: 'https://placehold.co/600x400?text=Project+1',
    video_url: '',
    category: 'industrial',
    tags: ['warehouse', 'logistics'],
    featured: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Corporate Office Build',
    client: 'PT Example Corporate',
    slug: 'corporate-office-build',
    description: 'Office and administration building project.',
    image_url: 'https://placehold.co/600x400?text=Project+2',
    video_url: '',
    category: 'commercial',
    tags: ['office', 'corporate'],
    featured: false,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let nextProjectId = projects.length + 1

export async function getProjects(filters: {
  featured?: boolean
  category?: string
  limit?: number
} = {}) {
  let data = [...projects]

  if (filters.featured != null) {
    data = data.filter((item) => item.featured === filters.featured)
  }

  if (filters.category) {
    data = data.filter((item) => item.category === filters.category)
  }

  data = data.sort((a, b) => a.order_index - b.order_index)

  if (filters.limit != null) {
    data = data.slice(0, filters.limit)
  }

  return data
}

export async function getProjectById(id: number) {
  return projects.find((item) => item.id === id) ?? null
}

export async function createProject(payload: Record<string, unknown>) {
  const now = new Date().toISOString()

  const item: Project = {
    id: nextProjectId++,
    title: String(payload.title ?? ''),
    client: String(payload.client ?? ''),
    slug: String(payload.slug ?? ''),
    description: String(payload.description ?? ''),
    image_url: String(payload.image_url ?? ''),
    video_url: String(payload.video_url ?? ''),
    category: String(payload.category ?? ''),
    tags: Array.isArray(payload.tags) ? payload.tags.map(String) : [],
    featured: Boolean(payload.featured ?? false),
    order_index: Number(payload.order_index ?? projects.length + 1),
    created_at: now,
    updated_at: now,
  }

  projects.unshift(item)
  return item
}

export async function updateProject(id: number, payload: Record<string, unknown>) {
  const index = projects.findIndex((item) => item.id === id)
  if (index === -1) return null

  const current = projects[index]

  const updated: Project = {
    ...current,
    title: payload.title !== undefined ? String(payload.title) : current.title,
    client: payload.client !== undefined ? String(payload.client) : current.client,
    slug: payload.slug !== undefined ? String(payload.slug) : current.slug,
    description: payload.description !== undefined ? String(payload.description) : current.description,
    image_url: payload.image_url !== undefined ? String(payload.image_url) : current.image_url,
    video_url: payload.video_url !== undefined ? String(payload.video_url) : current.video_url,
    category: payload.category !== undefined ? String(payload.category) : current.category,
    tags: Array.isArray(payload.tags) ? payload.tags.map(String) : current.tags,
    featured: payload.featured !== undefined ? Boolean(payload.featured) : current.featured,
    order_index: payload.order_index !== undefined ? Number(payload.order_index) : current.order_index,
    updated_at: new Date().toISOString(),
  }

  projects[index] = updated
  return updated
}

export async function deleteProject(id: number) {
  const index = projects.findIndex((item) => item.id === id)
  if (index === -1) return false

  projects.splice(index, 1)
  return true
}