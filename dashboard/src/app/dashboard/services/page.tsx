'use client'

import { useEffect, useState } from 'react'
import { getServices, createService, updateService, deleteService } from '@/services/services'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: '',
    published: false,
    order_index: 0,
  })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const data = await getServices()
      setServices(data.data)
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setEditingService(null)
    setFormData({
      title: '',
      slug: '',
      description: '',
      icon: '',
      published: false,
      order_index: 0,
    })
    setIsOpen(true)
  }

  function openEdit(service: any) {
    setEditingService(service)
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description || '',
      icon: service.icon || '',
      published: service.published,
      order_index: service.order_index,
    })
    setIsOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingService) {
        await updateService(editingService.id, formData)
      } else {
        await createService(formData)
      }
      await loadServices()
      setIsOpen(false)
    } catch {
      alert('Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this service?')) return
    try {
      await deleteService(id)
      setServices(services.filter(s => s.id !== id))
    } catch {
      alert('Failed to delete')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Services</h1>
          <button
            onClick={openCreate}
            className="bg-kewo-navy text-white px-4 py-2 rounded-lg hover:bg-kewo-navy-light transition-colors text-sm font-medium"
          >
            + New Service
          </button>
        </div>

        {services.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No services yet</p>
            <button
              onClick={openCreate}
              className="bg-kewo-navy text-white px-4 py-2 rounded-lg hover:bg-kewo-navy-light transition-colors text-sm font-medium"
            >
              Create your first service
            </button>
          </div>
        ) : (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Published</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{service.title}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{service.slug}</td>
                    <td className="px-6 py-4 text-center">
                      {service.published ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => openEdit(service)}
                        className="text-kewo-navy hover:text-kewo-navy-light text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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

      {/* Slide-over Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {editingService ? 'Edit Service' : 'New Service'}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon URL</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Order Index</label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kewo-navy"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">Published</span>
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-kewo-navy text-white py-2 rounded-lg hover:bg-kewo-navy-light disabled:opacity-50 font-medium"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}