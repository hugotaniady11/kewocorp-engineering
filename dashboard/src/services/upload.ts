import { apiFetch } from "@/lib/api";

export async function uploadProjectAsset(file: File, type: 'image' | 'video') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)

  return apiFetch('/utils/upload', {
    method: 'POST',
    body: formData,
  });
}