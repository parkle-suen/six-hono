import { FC } from 'hono/jsx'

export const RankPage: FC = () => (
  <div class="p-4 space-y-4">
    <div class="tabs tabs-boxed">
      <a class="tab tab-active">7天</a>
      <a class="tab">15天</a>
      <a class="tab">30天</a>
    </div>

    <div class="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body p-4">
            <div class="flex items-center gap-3">
              <div class={`text-2xl font-bold ${i < 3 ? 'text-primary' : 'text-base-content/40'}`}>
                {i + 1}
              </div>
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <span>{String.fromCharCode(65 + i)}</span>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">专家{i + 1}</h3>
                <p class="text-xs text-base-content/60">胜率: {(90 - i * 3)}%</p>
              </div>
              <div class="text-right">
                <div class="text-primary font-bold">{(90 - i * 3)}%</div>
                <div class="text-xs text-base-content/60">{10 - i}连胜</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
