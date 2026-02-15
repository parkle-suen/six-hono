import { Home, Trophy, User } from 'lucide-react'

export const BottomBar = () => (
  <div class="btm-nav bg-base-200">
    <button hx-get="/" hx-target="#content" hx-push-url="true" hx-indicator=".htmx-indicator">
      <Home class="h-5 w-5" />
      <span>首页</span>
    </button>
    <button hx-get="/rank" hx-target="#content" hx-push-url="true">
      <Trophy class="h-5 w-5" />
      <span>排行</span>
    </button>
    <button hx-get="/profile" hx-target="#content" hx-push-url="true">
      <User class="h-5 w-5" />
      <span>我的</span>
    </button>
  </div>
)