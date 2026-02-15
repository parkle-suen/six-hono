import { FC } from 'hono/jsx'

export const ComboPage: FC = () => (
  <div class="p-4 space-y-4">
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>神组合：多个高胜率专家共同推荐的号码组合</span>
    </div>

    <div class="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4">
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-bold text-lg">神组合 #{i + 1}</h3>
              <span class="badge badge-success">推荐度 {95 - i * 3}%</span>
            </div>
            
            <div class="flex gap-2 my-3">
              {[5 + i, 12 + i, 23 + i, 34 + i, 45 + i].map((num) => (
                <div class="badge badge-lg badge-primary">{num}</div>
              ))}
            </div>

            <div class="divider my-2"></div>

            <div class="space-y-2">
              <p class="text-sm font-semibold">推荐专家:</p>
              <div class="flex flex-wrap gap-2">
                {['专家A', '专家B', '专家C'].slice(0, 3 - i % 2).map((expert, j) => (
                  <span class="badge badge-outline">{expert}</span>
                ))}
              </div>
            </div>

            <div class="flex justify-between items-center mt-3 text-sm">
              <span class="text-base-content/60">期号: 2026042</span>
              <span class="text-primary font-bold">15 ⭐</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
