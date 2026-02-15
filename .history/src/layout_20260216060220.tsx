import { FC } from 'hono/jsx'
import { GlobalProgress } from './components/GlobalProgress'
import { BottomBar } from './components/BottomBar'

export const Layout: FC<{ children: any; title?: string }> = ({ children, title = '预测' }) => (
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <title>{title}</title>

      {/* Tailwind + DaisyUI */}
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@5.5.18/dist/full.min.css" rel="stylesheet" />
      <script dangerouslySetInnerHTML={{ __html: `
        tailwind.config = {
          theme: {
            extend: {}
          },
          plugins: []
        }
      ` }} />

      {/* HTMX + Alpine */}
      <script src="https://unpkg.com/htmx.org@2.0.4/dist/htmx.min.js"></script>
      <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

      {/* Telegram WebApp */}
      <script src="https://telegram.org/js/telegram-web-app.js"></script>

      {/* tsParticles */}
      <script src="https://cdn.jsdelivr.net/npm/tsparticles@3.9.1/tsparticles.bundle.min.js"></script>

      {/* TonConnect */}
      <script src="https://unpkg.com/@tonconnect/ui@2.4.1/dist/tonconnect-ui.min.js"></script>

      {/* Lucide */}
      <script src="https://unpkg.com/lucide@0.564.0/dist/umd/lucide.js"></script>
    </head>
    <body class="bg-base-100 min-h-screen">
      <div id="tsparticles" class="fixed inset-0 -z-10" />

      <div class="flex flex-col h-screen max-w-[480px] mx-auto">
        <GlobalProgress />
        <main id="content" class="flex-1 overflow-auto">{children}</main>
        <BottomBar />
      </div>

      <script type="module" dangerouslySetInnerHTML={{ __html: `
        tsParticles.load("tsparticles", { particles: { number: { value: 80 } } });
        if (window.Telegram?.WebApp) {
          Telegram.WebApp.ready();
          Telegram.WebApp.expand();
        }
      ` }} />
    </body>
  </html>
)