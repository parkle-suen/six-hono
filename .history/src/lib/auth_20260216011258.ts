import { betterAuth } from 'better-auth'
import { google, apple, telegram } from 'better-auth/social'

export const auth = betterAuth({
  database: { /* Turso/LibSQL 配置 */ },
  socialProviders: {
    google: google({ clientId: '...', clientSecret: '...' }),
    apple: apple({ clientId: '...', clientSecret: '...' }),
    telegram: telegram({ botToken: '...' })   // TMA 专用
  },
  session: { strategy: 'jwt' }   // 或 cookie
})