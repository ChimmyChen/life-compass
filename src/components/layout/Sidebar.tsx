import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useJourneyStore } from '@/stores/journeyStore'

const navItems = [
  {
    phase: 'dao',
    icon: '☯',
    name: '道 · 认识自我',
    description: '价值观与自我觉察',
    paths: ['/dao/philosophy', '/dao/assessment', '/dao/result'],
    firstPath: '/dao/philosophy',
  },
  {
    phase: 'shu',
    icon: '🧭',
    name: '术 · 探索方向',
    description: '方法论与时代趋势',
    paths: ['/shu/design', '/shu/summary', '/shu/trends', '/shu/paths'],
    firstPath: '/shu/design',
  },
  {
    phase: 'result',
    icon: '✦',
    name: 'AI 身份画像',
    description: '你的时代身份标签',
    paths: ['/result/identity'],
    firstPath: '/result/identity',
  },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { completedSteps } = useJourneyStore()

  const isAccessible = (phase: string) => {
    if (phase === 'dao') return true
    if (phase === 'shu') return completedSteps.includes('value-result')
    if (phase === 'result') return completedSteps.includes('path-explorer')
    return false
  }

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-white/30 backdrop-blur-md border-r border-white/40">
      <div className="p-6 border-b border-white/25">
        <h1 className="text-xl font-semibold text-text-heading tracking-wide">
          人生罗盘
        </h1>
        <p className="text-xs text-text-muted mt-1">Life Compass</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const accessible = isAccessible(item.phase)
          const active = item.paths.some((p) => location.pathname === p)

          return (
            <motion.button
              key={item.phase}
              onClick={() => accessible && navigate(item.firstPath)}
              disabled={!accessible}
              whileHover={accessible ? { x: 4 } : undefined}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] text-left
                transition-all duration-300 cursor-pointer
                ${active
                  ? 'bg-primary/10 text-primary-dark shadow-soft'
                  : accessible
                    ? 'text-text-main hover:bg-white/40'
                    : 'text-text-muted cursor-not-allowed opacity-40'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-text-muted leading-tight">{item.description}</div>
              </div>
            </motion.button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/25">
        <p className="text-xs text-text-muted text-center leading-relaxed">
          道生一，一生二<br/>二生三，三生万物
        </p>
      </div>
    </aside>
  )
}
