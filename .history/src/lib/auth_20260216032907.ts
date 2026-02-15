import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  database: {
    provider: 'sqlite', // 或 libsql 适配
    url: process.env.TURSO_DATABASE_URL!,
  },
  socialProviders: {
    telegram: { /* 配置 */ },
    google: { clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! },
    // 其他
  },
})