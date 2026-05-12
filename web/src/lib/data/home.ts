import { SERVICES_DATA, PROJECTS_DATA } from '../data'
import type { Service, Project } from '../types'

export async function getHomeData(): Promise<{
  services: Service[]
  featuredProjects: Project[]
}> {
  return {
    services: SERVICES_DATA as unknown as Service[],
    featuredProjects: PROJECTS_DATA
      .filter((p) => p.featured)
      .slice(0, 4) as unknown as Project[],
  }
}