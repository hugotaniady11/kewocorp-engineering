import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { PROJECTS_DATA } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') ?? '50', 10)

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('order_index')
      .limit(limit)

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch {
    // Fallback to static data
    let projects = PROJECTS_DATA
    if (category && category !== 'All') {
      projects = projects.filter((p) => p.category === category)
    }
    if (featured === 'true') {
      projects = projects.filter((p) => p.featured)
    }
    return NextResponse.json({ data: projects.slice(0, limit) })
  }
}
