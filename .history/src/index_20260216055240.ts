import { Hono } from 'hono'
import { html } from 'hono/html'
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
  return c.html(html`${Layout({ children: HomePage() })}`)
})

app.get('/rank', (c) => {
  return c.html(html`${Layout({ children: RankPage(), title: '排行榜' })}`)
})

app.get('/combo', (c) => {
  return c.html(html`${Layout({ children: ComboPage(), title: '神组合' })}`)
})

app.get('/history', (c) => {
  return c.html(html`${Layout({ children: HistoryPage(), title: '历史数据' })}`)
})

app.get('/profile', (c) => {
  return c.html(html`${Layout({ children: ProfilePage(), title: '我的' })}`)
})

export default app
