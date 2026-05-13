type ServiceItem = {
  id: number
  title: string
  slug: string
  description: string
  icon: string
  published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

let nextServiceId = 6

let services: ServiceItem[] = [
  {
    id: 1,
    title: 'Design & Engineering',
    slug: 'design-engineering',
    description:
      'Comprehensive electrical power system design including substations, transmission lines, distribution systems, and renewable energy facilities.',
    icon: 'zap',
    published: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Project & Construction Management',
    slug: 'project-construction-management',
    description:
      'End-to-end project management and construction oversight for electric power infrastructure, from planning through commissioning.',
    icon: 'hard-hat',
    published: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Specifications & Procurement',
    slug: 'specifications-procurement',
    description:
      'Technical specification development and procurement support for electrical equipment, materials, and systems.',
    icon: 'clipboard-list',
    published: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Training & Knowledge Transfer',
    slug: 'training-knowledge-transfer',
    description:
      'Professional training programs and knowledge transfer sessions tailored for utility engineers and operations staff.',
    icon: 'graduation-cap',
    published: true,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Quality Assurance & Control',
    slug: 'quality-assurance-control',
    description:
      'Rigorous QA/QC programs ensuring engineering deliverables and construction work meet the highest industry standards.',
    icon: 'shield-check',
    published: true,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function getServices(publishedOnly = true) {
  return publishedOnly ? services.filter((item) => item.published) : services
}

export async function getServiceById(id: number) {
  return services.find((item) => item.id === id) ?? null
}

export async function createService(payload: Record<string, unknown>) {
  const now = new Date().toISOString()

  const item: ServiceItem = {
    id: nextServiceId++,
    title: String(payload.title ?? ''),
    slug: String(payload.slug ?? ''),
    description: String(payload.description ?? ''),
    icon: String(payload.icon ?? ''),
    published: Boolean(payload.published ?? true),
    order_index: Number(payload.order_index ?? services.length + 1),
    created_at: now,
    updated_at: now,
  }

  services.unshift(item)
  return item
}

export async function updateService(id: number, payload: Record<string, unknown>) {
  const index = services.findIndex((item) => item.id === id)
  if (index === -1) return null

  const current = services[index]

  const updated: ServiceItem = {
    ...current,
    title: payload.title !== undefined ? String(payload.title) : current.title,
    slug: payload.slug !== undefined ? String(payload.slug) : current.slug,
    description: payload.description !== undefined ? String(payload.description) : current.description,
    icon: payload.icon !== undefined ? String(payload.icon) : current.icon,
    published: payload.published !== undefined ? Boolean(payload.published) : current.published,
    order_index: payload.order_index !== undefined ? Number(payload.order_index) : current.order_index,
    updated_at: new Date().toISOString(),
  }

  services[index] = updated
  return updated
}

export async function deleteService(id: number) {
  const index = services.findIndex((item) => item.id === id)
  if (index === -1) return false

  services.splice(index, 1)
  return true
}