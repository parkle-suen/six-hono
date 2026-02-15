import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { auth } from './lib/auth'
import { Layout } from './layout'
import { HomePage } from './pages/HomePage' // 你自己实现页面
import { RankPage } from './pages/RankPage'
import { ProfilePage } from './pages/ProfilePage'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { Home, Trophy, User } from 'lucide-react' // Lucide 图标

const app = new Hono()

app.use(jsxRenderer(({ children }) => <Layout>{children}</Layout>))

app.route('/api/auth', auth.handler)

const protected = auth.protect()

app.get('/', async (c) => c.render(<HomePage />))

app.get('/rank', protected, (c) => c.render(<RankPage />, { layout: false }))

app.get('/profile', protected, (c) => c.render(<ProfilePage />, { layout: false }))

// 示例支付 API（运行时区分平台）
app.post('/api/pay', protected, zValidator('json', z.object({ type: z.enum(['stars', 'ton']) })), async (c) => {
  const { type } = c.req.valid('json')
  const isTMA = c.req.header('x-telegram-webapp') // 或从 initData 判断
  if (isTMA && type !== 'stars') return c.json({ error: 'TMA 只支持 Stars' })
  // 处理支付...
  return c.json({ success: true })
})

// BottomBar（全局保留）
const BottomBar = () => (
  <div class="btm-nav bg-base-200">
    <button hx-get="/" hx-target="#content" hx-push-url="true" hx-indicator=".htmx-indicator">
      <Home class="h-5 w-5" />
      <span>首页</span>
    </button>
    <button hx-get="/rank" hx-target="#content" hx-push-url="true" hx-indicator=".htmx-indicator">
      <Trophy class="h-5 w-5" />
      <span>排行</span>
    </button>
    <button hx-get="/profile" hx-target="#content" hx-push-url="true" hx-indicator=".htmx-indicator">
      <User class="h-5 w-5" />
      <span>我的</span>
    </button>
  </div>
)

// 在 Layout 中调用 <BottomBar />（或直接放 layout.tsx）

export default app