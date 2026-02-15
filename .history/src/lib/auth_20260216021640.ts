import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  database: {
    provider: 'libsql',
    url: process.env.TURSO_DATABASE_URL!,
  },
  socialProviders: {
    telegram: {
      clientId: '', // TMA 用 bot token 或 initData 验证
    },
    google: { clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! },
    // 加 apple 等
  },
  session: { strategy: 'jwt' },
})