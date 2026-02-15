import { Hono } from 'hono'
import { Layout } from './layout'
import { HomePage } from './pages/home'
import { RankPage } from './pages/rank'
import { ComboPage } from './pages/combo'
import { HistoryPage } from './pages/history'
import { ProfilePage } from './pages/profile'

type Bindings = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
  TELEGRAM_BOT_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.html(<Layout><HomePage /></Layout>)
})

app.get('/rank', (c) => {
  return c.html(<Layout title="排行榜"><RankPage /></Layout>)
})

app.get('/combo', (c) => {
  return c.html(<Layout title="神组合"><ComboPage /></Layout>)
})

app.get('/history', (c) => {
  return c.html(<Layout title="历史数据"><HistoryPage /></Layout>)
})

app.get('/profile', (c) => {
  return c.html(<Layout title="我的"><ProfilePage /></Layout>)
})

export default app
