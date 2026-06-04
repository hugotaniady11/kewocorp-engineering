'use client'

import { useEffect, useState } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '@/services/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
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
  })

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
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
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
    })
  }

  function closePanel() {
    setIsOpen(false)
    setEditingProject(null)
  }

  function openCreate() {
    setEditingProject(null)
    resetForm()
    setIsOpen(true)
  }

  function openEdit(project: any) {
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
    setIsOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...formData,
      order_index: Number(formData.order_index) || 0,
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    }

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload)
      } else {
        await createProject(payload)
      }

      await loadProjects()
      closePanel()
    } catch (error) {
      console.error(error)
      alert('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this project?')) return

    try {
      await deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <button
            onClick={openCreate}
            className="bg-kewo-navy text-white px-4 py-2 rounded-lg hover:bg-kewo-navy-light transition-colors text-sm font-medium"
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <button
              onClick={openCreate}
              className="bg-kewo-navy text-white px-4 py-2 rounded-lg hover:bg-kewo-navy-light transition-colors text-sm font-medium"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Client
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Featured
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{project.title}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {project.client || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {project.category || '—'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {project.featured ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          Featured
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => openEdit(project)}
                        className="text-kewo-navy hover:text-kewo-navy-light text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
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
              <div className="shrink-0 border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h2>

                <button
                  onClick={closePanel}
                  className="text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
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
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Video URL</label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) =>
                        setFormData({ ...formData, video_url: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="web, mobile, design"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Order Index</label>
                    <input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order_index: Number(e.target.value),
                        })
                      }
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="shrink-0 border-t px-6 py-4 flex gap-3 bg-white">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>

                  <button
                    type="button"
                    onClick={closePanel}
                    className="px-4 border rounded-lg hover:bg-gray-50"
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