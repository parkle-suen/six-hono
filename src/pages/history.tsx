import { FC } from 'hono/jsx'

export const HistoryPage: FC = () => (
  <div class="p-4 space-y-4">
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-4">
        <h2 class="card-title text-base mb-3">最新开奖</h2>
        <div class="flex justify-center gap-2 mb-2">
          {[5, 12, 23, 34, 45].map((num) => (
            <div class="badge badge-lg badge-primary">{num}</div>
          ))}
        </div>
        <p class="text-center text-sm text-base-content/60">期号: 2026041</p>
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-lg font-bold">历史开奖</h2>
      {Array.from({ length: 10 }).map((_, i) => (
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4">
            <div class="flex justify-between items-center">
              <span class="font-semibold">期号: 20260{40 - i}</span>
              <span class="text-xs text-base-content/60">
                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
              </span>
            </div>
            <div class="flex justify-center gap-2 mt-3">
              {[5 + i, 12 + i, 23 + i, 34 + i, 45 + i].map((num) => (
                <div class="badge badge-primary">{num}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
