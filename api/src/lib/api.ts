const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'

type ApiSuccessResponse<T> = {
  data: T
}

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined | null>
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>
) {
  const url = new URL(`${API_BASE_URL}${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options

  const response = await fetch(buildUrl(path, params), {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.error || 'Something went wrong')
  }

  return (result as ApiSuccessResponse<T>).data
}