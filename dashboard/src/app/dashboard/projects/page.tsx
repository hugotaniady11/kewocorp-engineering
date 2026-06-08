'use client'

import React, { useEffect, useState } from 'react'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '@/services/projects'
import { uploadProjectAsset } from '@/services/upload'

type Project = {
  id: number
  title?: string
  slug?: string
  client?: string | null
  description?: string | null
  image_url?: string | null
  video_url?: string | null
  category?: string | null
  tags?: string[] | null
  featured?: boolean
  order_index?: number
}

type ProjectFormData = {
  title: string
  slug: string
  client: string
  description: string
  image_url: string
  video_url: string
  category: string
  tags: string
  featured: boolean
  order_index: number
}

const initialFormData: ProjectFormData = {
  title: '',
  slug: '',
  client: '',
  description: '',
  image_url: '',
  video_url: '',
  category: '',
  tags: '',
  featured: false,
  order_index: 0,
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  async function loadProjects() {
    try {
      const data = await getProjects()
      setProjects(data.data || [])
    } catch (error) {
      console.error(error)
      alert('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingProject(null)
    setFormData(initialFormData)
    setImageFile(null)
    setVideoFile(null)
    setUploadingImage(false)
    setUploadingVideo(false)
    setIsOpen(true)
  }

  function closePanel() {
    setIsOpen(false)
    setEditingProject(null)
    setImageFile(null)
    setVideoFile(null)
    setUploadingImage(false)
    setUploadingVideo(false)
  }

  function openCreate() {
    resetForm()
  }

  function openEdit(project: Project) {
    setEditingProject(project)
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      client: project.client || '',
      description: project.description || '',
      image_url: project.image_url || '',
      video_url: project.video_url || '',
      category: project.category || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      featured: !!project.featured,
      order_index: project.order_index ?? 0,
    })
    setImageFile(null)
    setVideoFile(null)
    setUploadingImage(false)
    setUploadingVideo(false)
    setIsOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = formData.image_url
      let videoUrl = formData.video_url

      if (imageFile) {
        setUploadingImage(true)
        const uploadedImage = await uploadProjectAsset(imageFile, 'image')
        imageUrl = uploadedImage.url
      }

      if (videoFile) {
        setUploadingVideo(true)
        const uploadedVideo = await uploadProjectAsset(videoFile, 'video')
        videoUrl = uploadedVideo.url
      }

      const payload = {
        ...formData,
        image_url: imageUrl,
        video_url: videoUrl,
        order_index: Number(formData.order_index) || 0,
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      }

      if (editingProject) {
        await updateProject(editingProject.id, payload)
      } else {
        await createProject(payload)
      }

      await loadProjects()
      closePanel()
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Failed to save project')
    } finally {
      setUploadingImage(false)
      setUploadingVideo(false)
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this project?')) return

    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <button
            onClick={openCreate}
            className="rounded-lg bg-kewo-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kewo-navy-light"
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-lg border bg-white p-12 text-center">
            <p className="mb-4 text-gray-500">No projects yet</p>
            <button
              onClick={openCreate}
              className="rounded-lg bg-kewo-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kewo-navy-light"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border bg-white">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{project.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {project.client || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {project.category || '—'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {project.featured ? (
                        <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                          Featured
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="space-x-3 px-6 py-4 text-right">
                      <button
                        onClick={() => openEdit(project)}
                        className="text-sm font-medium text-kewo-navy hover:text-kewo-navy-light"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closePanel}
          />

          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h2>

                <button
                  onClick={closePanel}
                  className="text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                    {uploadingImage && (
                      <p className="mt-1 text-xs text-gray-500">Uploading image...</p>
                    )}
                    {formData.image_url && !imageFile && (
                      <a
                        href={formData.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all text-xs text-blue-600 hover:underline"
                      >
                        Current: {formData.image_url}
                      </a>
                    )}
                    {imageFile && (
                      <p className="mt-1 text-xs text-gray-500">
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Project Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                    {uploadingVideo && (
                      <p className="mt-1 text-xs text-gray-500">Uploading video...</p>
                    )}
                    {formData.video_url && !videoFile && (
                      <a
                        href={formData.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all text-xs text-blue-600 hover:underline"
                      >
                        Current: {formData.video_url}
                      </a>
                    )}
                    {videoFile && (
                      <p className="mt-1 text-xs text-gray-500">
                        Selected: {videoFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                      placeholder="web, mobile, design"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Order Index</label>
                    <input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order_index: Number(e.target.value),
                        })
                      }
                      className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featured: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded"
                      />
                      <span className="text-sm font-medium">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex shrink-0 gap-3 border-t bg-white px-6 py-4">
                  <button
                    type="submit"
                    disabled={saving || uploadingImage || uploadingVideo}
                    className="flex-1 rounded-lg bg-kewo-navy py-2 font-medium text-white hover:bg-kewo-navy-light disabled:opacity-50"
                  >
                    {saving || uploadingImage || uploadingVideo ? 'Saving...' : 'Save'}
                  </button>

                  <button
                    type="button"
                    onClick={closePanel}
                    className="rounded-lg border px-4 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}