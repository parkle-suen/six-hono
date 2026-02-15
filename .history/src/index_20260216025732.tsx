import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { auth } from './lib/auth'
import { Layout } from './layout'
// 页面组件自行实现

const app = new Hono()

app.use(jsxRenderer(({ children }) => <Layout>{children}</Layout>))

app.route('/api/auth', auth.handler)

const protected = auth.protect()

app.get('/', (c) => c.render(<div>首页内容</div>))
// 其他路由同上

export default app