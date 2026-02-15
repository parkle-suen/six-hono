// src/index.tsx
import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { auth } from './lib/auth'                  // ← Better Auth 配置（后面会给）
import { Layout } from './layout'                  // ← 你的 Layout 文件
import { HomePage } from './pages/HomePage'
import { RankPage } from './pages/RankPage'
import { ProfilePage } from './pages/ProfilePage'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Hono 应用
const app = new Hono()

// 全局 JSX 渲染器（所有路由默认用 Layout）
app.use(jsxRenderer(({ children, title = '预测' }) => {
  return <Layout title={title}>{children}</Layout>
}))

// 挂载 Better Auth（所有 /api/auth/* 路由）
app.route('/api/auth', auth.handler)

// 示例：Zod 校验中间件（所有 POST/PUT 用）
const bodyValidator = (schema: z.ZodSchema) => zValidator('json', schema)

// 示例：需要登录的路由保护
const protectedRoute = auth.protect()   // Better Auth 提供的中间件

// 首页（全页渲染，带 Layout）
app.get('/', async (c) => {
  const user = c.get('user')   // Better Auth 自动注入
  return c.render(<HomePage user={user} />)
})

// HTMX 片段路由（不带 Layout，只返回内容）
app.get('/rank', protectedRoute, async (c) => {
  return c.render(<RankPage />, { layout: false })
})

app.get('/profile', protectedRoute, async (c) => {
  return c.render(<ProfilePage />, { layout: false })
})

// 示例 API：收款逻辑（根据平台区分）
app.post('/api/withdraw', protectedRoute, bodyValidator(z.object({
  amount: z.number(),
  type: z.enum(['stars', 'ton', 'solana', 'base'])
})), async (c) => {
  const { amount, type } = c.req.valid('json')
  const isTMA = !!window.Telegram?.WebApp   // 服务端无法直接检测，用前端传或 initData 验证

  if (isTMA && type !== 'stars') {
    return c.json({ error: 'TMA 只支持 Stars' })
  }

  // 这里处理不同收款逻辑...
  return c.json({ success: true })
})

// BottomBar 组件（直接内联，也可单独文件）
const BottomBar = ({ user }: { user?: any }) => (
  <div class="btm-nav bt m-nav-active bg-base-200">
    <button hx-get="/" hx-target="#content" hx-push-url="true">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      <span class="btm-nav-label">首页</span>
    </button>
    <button hx-get="/rank" hx-target="#content" hx-push-url="true">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      <span class="btm-nav-label">排行</span>
    </button>
    <button hx-get="/profile" hx-target="#content" hx-push-url="true">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      <span class="btm-nav-label">我的</span>
    </button>
  </div>
)

// 导出（Cloudflare Workers 用）
export default app