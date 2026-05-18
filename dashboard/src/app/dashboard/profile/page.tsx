'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/api'
import { removeAuthToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({ username: '', email: '' })
  const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '' })

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await apiFetch('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      })
      alert('Profile updated')
    } catch {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await apiFetch('/auth/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
      })
      alert('Password changed')
      setPasswordData({ current_password: '', new_password: '' })
    } catch {
      alert('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md space-y-8">
      <h1 className="text-xl font-semibold">Profile</h1>

      {/* Update username/email */}
      <form onSubmit={handleUpdateProfile} className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="font-medium">Account Info</h2>

        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Change password */}
      <form onSubmit={handleChangePassword} className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="font-medium">Change Password</h2>

        <div>
          <label className="block text-sm mb-1">Current Password</label>
          <input
            type="password"
            value={passwordData.current_password}
            onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            value={passwordData.new_password}
            onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  )
}