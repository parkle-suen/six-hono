import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Layout } from './layout'
import { HomePage } from './pages/home'
import { RankPage } from './pages/rank'
import { ProfilePage } from './pages/profile'
import { PostPage } from './pages/post'
import { db } from './lib/db'

type Bindings = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(Layout({ children: HomePage({}) }))
})

app.get('/home', (c) => {
  return c.html(HomePage({}))
})

app.get('/rank', (c) => {
  return c.html(RankPage({}))
})

app.get('/profile', (c) => {
  return c.html(ProfilePage({}))
})

app.get('/post', (c) => {
  return c.html(PostPage({}))
})

app.post('/api/post', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { questionId, content } = body as { questionId: string; content: string }
    
    await db.execute({
      sql: 'INSERT INTO answers (question_id, user_id, content) VALUES (?, 1, ?)',
      args: [parseInt(questionId), content]
    })
    
    return c.html(
      `<div class="alert alert-success"><span>发布成功！</span></div>`
    )
  } catch (error) {
    return c.html(
      `<div class="alert alert-error"><span>发布失败，请重试</span></div>`
    )
  }
})

app.get('/api/questions', async (c) => {
  try {
    const result = await db.execute('SELECT * FROM questions ORDER BY date DESC LIMIT 10')
    const questions = result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      date: row.date
    }))
    
    if (questions.length === 0) {
      return c.html(
        '<div class="text-center py-8 text-base-content/50">暂无题目</div>'
      )
    }
    
    let html = '<div class="space-y-3">'
    for (const q of questions) {
      html += `<div class="card bg-base-100 shadow-sm"><div class="card-body p-4"><h3 class="font-medium">${q.title}</h3><p class="text-sm opacity-70">${q.date}</p></div></div>`
    }
    html += '</div>'
    return c.html(html)
  } catch (error) {
    return c.html(
      '<div class="alert alert-error"><span>加载失败</span></div>'
    )
  }
})

app.get('/api/answers', async (c) => {
  try {
    const result = await db.execute(`
      SELECT a.*, u.username 
      FROM answers a 
      JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC 
      LIMIT 20
    `)
    const answers = result.rows.map((row: any) => ({
      id: row.id,
      questionId: row.question_id,
      username: row.username,
      content: row.content,
      likes: row.likes
    }))
    
    if (answers.length === 0) {
      return c.html(
        '<div class="text-center py-8 text-base-content/50">暂无预测</div>'
      )
    }
    
    let html = '<div class="space-y-3">'
    for (const a of answers) {
      html += `<div class="card bg-base-100 shadow-sm"><div class="card-body p-4"><div class="flex justify-between items-start"><div><p class="font-medium">${a.username}</p><p class="text-sm mt-1">${a.content}</p></div><button class="btn btn-ghost btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg><span class="ml-1">${a.likes}</span></button></div></div></div>`
    }
    html += '</div>'
    return c.html(html)
  } catch (error) {
    return c.html(
      '<div class="alert alert-error"><span>加载失败</span></div>'
    )
  }
})

app.get('/api/rank', async (c) => {
  try {
    const result = await db.execute(`
      SELECT 
        username,
        score,
        accuracy,
        ROW_NUMBER() OVER (ORDER BY score DESC) as rank
      FROM users 
      ORDER BY score DESC 
      LIMIT 50
    `)
    const ranks = result.rows.map((row: any) => ({
      rank: row.rank,
      username: row.username,
      score: row.score,
      accuracy: row.accuracy
    }))
    
    if (ranks.length === 0) {
      return c.html(
        '<div class="text-center py-8 text-base-content/50">暂无排行数据</div>'
      )
    }
    
    let html = '<div class="overflow-x-auto"><table class="table table-zebra"><thead><tr><th>排名</th><th>用户</th><th>积分</th><th>准确率</th></tr></thead><tbody>'
    for (const r of ranks) {
      const badgeClass = r.rank === 1 ? 'badge-warning' : r.rank === 2 ? 'badge-secondary' : 'badge-accent'
      const rankDisplay = r.rank <= 3 ? `<span class="badge ${badgeClass}">#${r.rank}</span>` : `<span>#${r.rank}</span>`
      html += `<tr><td>${rankDisplay}</td><td>${r.username}</td><td>${r.score}</td><td>${r.accuracy}%</td></tr>`
    }
    html += '</tbody></table></div>'
    return c.html(html)
  } catch (error) {
    return c.html(
      '<div class="alert alert-error"><span>加载失败</span></div>'
    )
  }
})

export default app
