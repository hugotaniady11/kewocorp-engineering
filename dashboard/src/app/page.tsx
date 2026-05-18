import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Kewo Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage your projects and services</p>
        <div className="flex gap-3 justify-center">
          <Link 
            href="/sign-in" 
            className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700"
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="border px-5 py-2 rounded hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}