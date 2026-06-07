import { supabase } from '../lib/supabase.js'

export async function uploadFile(payload: Record<string, unknown>) {
  const file = payload.file
  const type = payload.type

  if (!(file instanceof File)) {
    throw new Error('File is required')
  }

  const uploadType = type === 'video' ? 'video' : 'image'

  if (uploadType === 'image' && !file.type.startsWith('image/')) {
    throw new Error('Uploaded file must be an image')
  }

  if (uploadType === 'video' && !file.type.startsWith('video/')) {
    throw new Error('Uploaded file must be a video')
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : ''
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${cleanName}.${ext || (uploadType === 'image' ? 'jpg' : 'mp4')}`

  const filePath =
    uploadType === 'image'
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
    type: uploadType,
    file_name: fileName,
    file_path: filePath,
    url: data.publicUrl,
  }
}