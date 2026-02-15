import { betterAuth } from 'better-auth'

export const getAuth = (env: { TURSO_DATABASE_URL: string; GOOGLE_ID?: string; GOOGLE_SECRET?: string }) => {
  return betterAuth({
    database: {
      provider: 'sqlite',
      url: env.TURSO_DATABASE_URL,
    },
    socialProviders: {
      telegram: {},
      ...(env.GOOGLE_ID && env.GOOGLE_SECRET ? {
        google: { 
          clientId: env.GOOGLE_ID, 
          clientSecret: env.GOOGLE_SECRET 
        }
      } : {}),
    },
  })
}