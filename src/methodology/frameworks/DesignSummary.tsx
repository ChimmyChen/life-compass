import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { useUserStore } from '@/stores/userStore'
import { VALUE_DIMENSION_LABELS } from '@/types/user.types'
import type { ValueDimensionKey } from '@/types/user.types'

export function DesignSummary() {
  const navigate = useNavigate()
  const assessment = useUserStore((s) => s.valueAssessment)
  const profile = useUserStore((s) => s.profile)

  const topValues = useMemo(() => {
    if (!assessment) return []
    return (Object.entries(assessment.dimensions) as [ValueDimensionKey, number][])
      .filter(([k]) => k !== 'gameview')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  }, [assessment])

  if (!assessment) {
    navigate('/dao/assessment')
    return null
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <FadeIn>
        <div className="text-center space-y-3">
          <motion.span
            className="text-5xl block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            🌿
          </motion.span>
          <h2 className="text-2xl font-semibold text-text-heading">
            {profile?.name}，你已经迈出了最重要的一步
          </h2>
          <p className="text-text-light leading-relaxed">
            你认识了自己的价值观，直面了内心的渴望和恐惧。<br/>
            这些是你的根，无论世界怎么变，根不会变。
          </p>
        </div>
      </FadeIn>

      {/* 核心发现 */}
      <FadeIn delay={0.3}>
        <Card variant="glass" padding="lg" className="space-y-4">
          <h3 className="font-semibold text-text-heading text-center">你的核心发现</h3>

          <div className="flex justify-center gap-3">
            {topValues.map(([key], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {VALUE_DIMENSION_LABELS[key].name}
              </motion.div>
            ))}
          </div>

          {assessment.insights.length > 0 && (
            <div className="space-y-2 pt-2">
              {assessment.insights.slice(0, 2).map((insight, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="text-sm text-text-main text-center leading-relaxed"
                >
                  {insight}
                </motion.p>
              ))}
            </div>
          )}
        </Card>
      </FadeIn>

      {/* 过渡引导 */}
      <FadeIn delay={1.0}>
        <Card variant="default" padding="lg" className="space-y-4">
          <p className="text-text-main leading-relaxed text-center">
            "道"的根基已经扎下。但光有根还不够 —
          </p>
          <p className="text-text-heading font-medium text-center leading-relaxed">
            这个世界正在发生什么？<br/>
            AI 正在重塑哪些行业？<br/>
            哪些机会正在涌现？
          </p>
          <p className="text-text-light text-sm text-center">
            接下来，让我们抬头看看这个时代的全景，<br/>
            然后找到属于你的位置。
          </p>
        </Card>
      </FadeIn>

      <FadeIn delay={1.2}>
        <div className="text-center">
          <Button onClick={() => navigate('/shu/trends')} size="lg">
            看看这个时代
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
