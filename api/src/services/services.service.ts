import { supabase } from '../lib/supabase'

type ServiceItem = {
  id: number
  title: string
  slug: string
  description: string | null
  icon: string | null
  published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export async function getServices(publishedOnly = true) {
  let query = supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  if (publishedOnly) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return (data ?? []) as ServiceItem[]
}

export async function getServiceById(id: number) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return (data as ServiceItem | null) ?? null
}

export async function createService(payload: Record<string, unknown>) {
  const insertPayload = {
    title: String(payload.title ?? ''),
    slug: String(payload.slug ?? ''),
    description: payload.description ? String(payload.description) : null,
    icon: payload.icon ? String(payload.icon) : null,
    published: Boolean(payload.published ?? true),
    order_index: Number(payload.order_index ?? 0),
  }

  const { data, error } = await supabase
    .from('services')
    .insert(insertPayload)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as ServiceItem
}

export async function updateService(id: number, payload: Record<string, unknown>) {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (payload.title !== undefined) updatePayload.title = String(payload.title)
  if (payload.slug !== undefined) updatePayload.slug = String(payload.slug)
  if (payload.description !== undefined) {
    updatePayload.description = payload.description ? String(payload.description) : null
  }
  if (payload.icon !== undefined) {
    updatePayload.icon = payload.icon ? String(payload.icon) : null
  }
  if (payload.published !== undefined) {
    updatePayload.published = Boolean(payload.published)
  }
  if (payload.order_index !== undefined) {
    updatePayload.order_index = Number(payload.order_index)
  }

  const { data, error } = await supabase
    .from('services')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) {
    throw error
  }

  return (data as ServiceItem | null) ?? null
}

export async function deleteService(id: number) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }

  return true
}