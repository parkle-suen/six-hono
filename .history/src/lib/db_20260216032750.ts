import { createClient, Client } from '@libsql/client'

let dbInstance: Client | null = null

export const getDb = (env: { TURSO_DATABASE_URL: string; TURSO_AUTH_TOKEN: string }) => {
  if (!dbInstance) {
    dbInstance = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    })
  }
  return dbInstance
}

export const db = createClient({
  url: 'file:local.db',
})