import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const routeOrder = [
  { path: '/', label: '启程', phase: 'welcome' as const },
  { path: '/dao/philosophy', label: '四大智慧', phase: 'dao' as const },
  { path: '/dao/assessment', label: '价值观评估', phase: 'dao' as const },
  { path: '/dao/result', label: '评估结果', phase: 'dao' as const },
  { path: '/shu/design', label: '人生设计', phase: 'shu' as const },
  { path: '/shu/summary', label: '总结', phase: 'shu' as const },
  { path: '/shu/trends', label: '时代趋势', phase: 'shu' as const },
  { path: '/shu/paths', label: '方向探索', phase: 'shu' as const },
  { path: '/result/identity', label: 'AI 身份', phase: 'result' as const },
]

const phaseColors = {
  welcome: 'bg-text-muted/20',
  dao: 'bg-primary/15',
  shu: 'bg-accent/15',
  result: 'bg-secondary/15',
}

export function StepNavigator() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = routeOrder.findIndex((r) => r.path === location.pathname)
  if (currentIndex <= 0) return null

  const prevRoute = currentIndex > 0 ? routeOrder[currentIndex - 1] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex items-center justify-between"
    >
      {prevRoute && (
        <motion.button
          onClick={() => navigate(prevRoute.path)}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm
                     text-text-light text-sm hover:bg-white/70 transition-all cursor-pointer
                     border border-white/40"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>返回{prevRoute.label}</span>
        </motion.button>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        {routeOrder.slice(1).map((route, i) => {
          const isActive = route.path === location.pathname
          const isPast = i + 1 < currentIndex
          return (
            <motion.button
              key={route.path}
              onClick={() => isPast && navigate(route.path)}
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${isActive ? 'w-6' : 'w-1.5'}
                ${isActive ? phaseColors[route.phase] : ''}
                ${isPast ? 'bg-primary/30 cursor-pointer hover:bg-primary/50' : ''}
                ${!isActive && !isPast ? 'bg-text-muted/15' : ''}
              `}
              whileHover={isPast ? { scale: 1.5 } : undefined}
              title={isPast || isActive ? route.label : undefined}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
