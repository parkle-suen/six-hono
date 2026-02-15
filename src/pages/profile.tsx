import { FC } from 'hono/jsx'

export const ProfilePage: FC = () => (
  <div class="p-4 space-y-4">
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-6 text-center">
        <div class="avatar placeholder mb-3 mx-auto">
          <div class="bg-neutral text-neutral-content rounded-full w-20">
            <span>U</span>
          </div>
        </div>
        <h2 class="card-title text-xl justify-center">用户名</h2>
        <p class="text-sm text-base-content/60">ID: 123456789</p>
        <div class="divider my-2"></div>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-primary">10</div>
            <div class="text-xs text-base-content/60">预测</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-success">8</div>
            <div class="text-xs text-base-content/60">命中</div>
          </div>
          <div>
            <div class="text-2xl font-bold">80%</div>
            <div class="text-xs text-base-content/60">胜率</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-4">
        <div class="flex justify-between items-center">
          <span class="font-semibold">积分余额</span>
          <span class="text-2xl font-bold text-primary">1000 ⭐</span>
        </div>
        <button class="btn btn-primary w-full mt-3">
          充值
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <h2 class="text-lg font-bold">我的预测</h2>
      {Array.from({ length: 3 }).map((_, i) => (
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold text-sm">期号: 2026042</p>
                <div class="flex gap-1 mt-2">
                  {[5 + i * 2, 12 + i, 23, 34 - i, 45 - i * 2].map((num) => (
                    <div class="badge badge-primary badge-sm">{num}</div>
                  ))}
                </div>
              </div>
              <span class={`badge ${i === 0 ? 'badge-success' : 'badge-warning'}`}>
                {i === 0 ? '中奖' : '待开奖'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div class="space-y-2">
      <h2 class="text-lg font-bold">购买记录</h2>
      {Array.from({ length: 3 }).map((_, i) => (
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold text-sm">购买了专家{i + 1}的预测</p>
                <p class="text-xs text-base-content/60">期号: 2026042</p>
              </div>
              <span class="text-primary font-bold">10 ⭐</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
