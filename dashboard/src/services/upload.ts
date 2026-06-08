import { supabase } from '@/lib/db'

export async function uploadProjectAsset(file: File, type: 'image' | 'video') {
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

  const { error } = await supabase.storage
    .from('media')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    throw new Error(error.message || 'Failed to upload file')
  }

  const { data } = supabase.storage.from('media').getPublicUrl(filePath)

  return {
    url: data.publicUrl,
    file_name: fileName,
    file_path: filePath,
    type,
  }
}