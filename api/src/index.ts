import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { projectsRoute } from './routes/projects.route.js'
import { servicesRoute } from './routes/services.route.js'
import { authRoute } from './routes/auth.route.js'
const app = new Hono().basePath('/api')
const origins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:3001').split(',')

app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.route('/projects', projectsRoute)
app.route('/services', servicesRoute)
app.route('/auth', authRoute)

app.get('/health', (c) =>
  c.json({
    status: 'ok',
    mode: 'mock',
    timestamp: new Date().toISOString(),
  })
)

export default {
  port: Number(process.env.PORT ?? 4000),
  fetch: app.fetch,
}