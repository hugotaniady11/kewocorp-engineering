import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <Link
          href="/dashboard/projects"
          className="border rounded-lg p-5 bg-white hover:shadow-sm transition-shadow"
        >
          <p className="font-medium">Projects</p>
          <p className="text-sm text-gray-500 mt-1">Manage your projects</p>
        </Link>

        <Link
          href="/dashboard/services"
          className="border rounded-lg p-5 bg-white hover:shadow-sm transition-shadow"
        >
          <p className="font-medium">Services</p>
          <p className="text-sm text-gray-500 mt-1">Manage your services</p>
        </Link>
      </div>
    </div>
  )
}