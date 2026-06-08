import { supabase } from '../lib/supabase.js'

export async function uploadFile(payload: Record<string, unknown>) {
  const rawFile = Array.isArray(payload.file) ? payload.file[0] : payload.file
  const type = payload.type === 'video' ? 'video' : 'image'

  if (
    !rawFile ||
    typeof rawFile !== 'object' ||
    typeof (rawFile as any).arrayBuffer !== 'function'
  ) {
    throw new Error('File is required')
  }

  const file = rawFile as {
    name: string
    type: string
    size: number
    arrayBuffer: () => Promise<ArrayBuffer>
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : ''
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')

  const fileName = `${Date.now()}-${cleanName}.${ext || (type === 'image' ? 'jpg' : 'mp4')}`
  const filePath =
    type === 'image'
      ? `projects/images/${fileName}`
      : `projects/videos/${fileName}`

  const arrayBuffer = await file.arrayBuffer()

  const { error } = await supabase.storage
    .from('media')
    .upload(filePath, arrayBuffer, {
      contentType: file.type || undefined,
      upsert: false,
    })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from('media').getPublicUrl(filePath)

  return {
    url: data.publicUrl,
    file_name: fileName,
    file_path: filePath,
    type,
  }
}