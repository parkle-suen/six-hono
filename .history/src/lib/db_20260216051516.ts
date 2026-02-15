import { createClient } from '@libsql/client'

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://six-hono-testlibsql.aws-ap-northeast-1.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
})