import { supabase } from '../lib/supabase'

type Project = {
  id: number
  title: string
  client: string | null
  slug: string
  description: string | null
  image_url: string | null
  video_url: string | null
  category: string | null
  tags: string[] | null
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export async function getProjects(filters: {
  featured?: boolean
  category?: string
  limit?: number
} = {}) {
  let query = supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (filters.featured != null) {
    query = query.eq('featured', filters.featured)
  }

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.limit != null) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return (data ?? []) as Project[]
}

export async function getProjectById(id: number) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return (data as Project | null) ?? null
}

export async function createProject(payload: Record<string, unknown>) {
  const insertPayload = {
    title: String(payload.title ?? ''),
    client: payload.client ? String(payload.client) : null,
    slug: String(payload.slug ?? ''),
    description: payload.description ? String(payload.description) : null,
    image_url: payload.image_url ? String(payload.image_url) : null,
    video_url: payload.video_url ? String(payload.video_url) : null,
    category: payload.category ? String(payload.category) : null,
    tags: Array.isArray(payload.tags) ? payload.tags.map(String) : [],
    featured: Boolean(payload.featured ?? false),
    order_index: Number(payload.order_index ?? 0),
  }

  const { data, error } = await supabase
    .from('projects')
    .insert(insertPayload)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Project
}

export async function updateProject(id: number, payload: Record<string, unknown>) {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (payload.title !== undefined) updatePayload.title = String(payload.title)
  if (payload.client !== undefined) updatePayload.client = payload.client ? String(payload.client) : null
  if (payload.slug !== undefined) updatePayload.slug = String(payload.slug)
  if (payload.description !== undefined) updatePayload.description = payload.description ? String(payload.description) : null
  if (payload.image_url !== undefined) updatePayload.image_url = payload.image_url ? String(payload.image_url) : null
  if (payload.video_url !== undefined) updatePayload.video_url = payload.video_url ? String(payload.video_url) : null
  if (payload.category !== undefined) updatePayload.category = payload.category ? String(payload.category) : null
  if (payload.tags !== undefined) updatePayload.tags = Array.isArray(payload.tags) ? payload.tags.map(String) : []
  if (payload.featured !== undefined) updatePayload.featured = Boolean(payload.featured)
  if (payload.order_index !== undefined) updatePayload.order_index = Number(payload.order_index)

  const { data, error } = await supabase
    .from('projects')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) {
    throw error
  }

  return (data as Project | null) ?? null
}

export async function deleteProject(id: number) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }

  return true
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ?? null
}