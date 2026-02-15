import { db } from './db'
import { schema } from './schema'

export async function initDatabase() {
  try {
    const statements = schema.split(';').filter(s => s.trim())
    for (const statement of statements) {
      if (statement.trim()) {
        await db.execute(statement)
      }
    }
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}
