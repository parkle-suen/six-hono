import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/try', (c) => {
  return c.text('Try Hono!')
})

app.get('/try2', (c) => {
  return c.text('Try Hono 2!')
})

export default app
