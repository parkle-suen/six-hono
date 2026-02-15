import { FC } from 'hono/jsx'

export const HomePage: FC = () => (
  <div class="p-4 space-y-4">
    <div class="carousel rounded-box w-full h-40">
      <div class="carousel-item w-full">
        <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="广告1" class="w-full object-cover" />
      </div>
      <div class="carousel-item w-full">
        <img src="https://img.daisyui.com/images/stock/photo-1565018442519-bc4b44169191.webp" alt="广告2" class="w-full object-cover" />
      </div>
      <div class="carousel-item w-full">
        <img src="https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp" alt="广告3" class="w-full object-cover" />
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-3">高胜率专家</h2>
      <div class="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div class="card bg-base-200 shadow-sm">
            <div class="card-body p-3 text-center">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <span>{String.fromCharCode(65 + i)}</span>
                </div>
              </div>
              <p class="text-xs font-medium">专家{i + 1}</p>
              <p class="text-xs text-primary font-bold">{(90 - i * 2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-4">
        <h2 class="card-title text-base mb-2">上期号码</h2>
        <div class="flex justify-center gap-2">
          {[5, 12, 23, 34, 45].map((num) => (
            <div class="badge badge-lg badge-primary">{num}</div>
          ))}
        </div>
        <p class="text-xs text-center text-base-content/60 mt-2">期号: 2026041</p>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-3">最新预测</h2>
      <div class="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div class="card bg-base-200 shadow-sm">
            <div class="card-body p-4">
              <div class="flex items-start gap-3">
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{String.fromCharCode(65 + i)}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <h3 class="font-semibold text-sm">专家{i + 1}</h3>
                    <span class="badge badge-sm badge-success">{(90 - i * 2)}%胜率</span>
                  </div>
                  <div class="flex gap-1 my-2">
                    {[5 + i * 3, 12 + i * 2, 23 + i, 34 - i, 45 - i * 2].map((num) => (
                      <div class="badge badge-primary badge-sm">{num}</div>
                    ))}
                  </div>
                  <div class="flex justify-between items-center text-xs text-base-content/60">
                    <span>期号: 2026042</span>
                    <span class="text-primary font-bold">10 ⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div class="text-center mt-4">
        <button class="btn btn-sm btn-outline w-full" hx-get="/api/posts?offset=5" hx-target="#posts-list" hx-swap="beforeend">
          加载更多
        </button>
      </div>
    </div>
  </div>
)
