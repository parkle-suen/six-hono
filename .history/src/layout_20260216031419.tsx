import { FC } from 'hono/jsx'
import { GlobalProgress } from './components/GlobalProgress'
import { BottomBar } from './components/BottomBar'

interface LayoutProps {
  children: any
  title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title = 'Prediction' }) => (
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <title>{title}</title>

      {/* Tailwind + DaisyUI CDN（生产可替换本地） */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@5.5.18/dist/full.min.css" rel="stylesheet" />

      {/* HTMX + Alpine */}
      <script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.min.js"></script>
      <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

      {/* Telegram + TMA SDK */}
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
      <script type="module" src="https://unpkg.com/@tma.js/sdk@3.1.6/dist/sdk.esm.js"></script>

      {/* tsParticles */}
      <script src="https://cdn.jsdelivr.net/npm/tsparticles@3.9.1/tsparticles.bundle.min.js"></script>

      {/* TonConnect */}
      <script src="https://unpkg.com/@tonconnect/ui@2.4.1/dist/tonconnect-ui.min.js"></script>
    </head>
    <body class="bg-base-100 min-h-screen">
      <div id="tsparticles" class="fixed inset-0 -z-10" />

      <div class="flex flex-col h-screen max-w-[480px] mx-auto">
        <GlobalProgress />
        <main id="content" class="flex-1 overflow-auto">{children}</main>
        <BottomBar /> {/* 永久保留 */}
      </div>

      <script type="module">
        tsParticles.load("tsparticles", { particles: { number: { value: 80 } } });
        if (window.Telegram?.WebApp) {
          Telegram.WebApp.ready();
          Telegram.WebApp.expand();
        }
      </script>
    </body>
  </html>
)