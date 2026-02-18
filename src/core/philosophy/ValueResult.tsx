import { useNavigate } from 'react-router-dom'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from 'recharts'
import { useUserStore } from '@/stores/userStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { VALUE_DIMENSION_LABELS } from '@/types/user.types'
import type { ValueDimensionKey } from '@/types/user.types'

export function ValueResult() {
  const navigate = useNavigate()
  const assessment = useUserStore((s) => s.valueAssessment)
  const profile = useUserStore((s) => s.profile)
  const { completeStep, setPhase } = useJourneyStore()

  if (!assessment) {
    navigate('/dao/assessment')
    return null
  }

  const radarData = (Object.entries(assessment.dimensions) as [ValueDimensionKey, number][]).map(
    ([key, value]) => ({
      dimension: VALUE_DIMENSION_LABELS[key].name,
      value,
      fullMark: 100,
    })
  )

  const handleContinue = () => {
    completeStep('value-result')
    setPhase('shu')
    navigate('/shu/design')
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-heading mb-2">
            {profile?.name}，这是你的价值观罗盘
          </h2>
          <p className="text-text-light">
            每个维度反映了你内心深处的倾向和追求
          </p>
        </div>
      </FadeIn>

      {/* Radar Chart */}
      <FadeIn delay={0.2}>
        <Card variant="glass" padding="lg">
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="#C5DFE8" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#4A5568', fontSize: 13 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#A0AEC0', fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="价值观"
                dataKey="value"
                stroke="#7BA7BC"
                fill="#7BA7BC"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </FadeIn>

      {/* Dimension details */}
      <StaggerChildren className="grid grid-cols-2 gap-3">
        {(Object.entries(assessment.dimensions) as [ValueDimensionKey, number][]).map(
          ([key, value]) => (
            <StaggerItem key={key}>
              <Card variant="default" padding="sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-heading">
                    {VALUE_DIMENSION_LABELS[key].name}
                  </span>
                  <span className="text-sm text-primary font-semibold">{value}</span>
                </div>
                <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-light to-primary rounded-full transition-all duration-700"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1.5">
                  {VALUE_DIMENSION_LABELS[key].description}
                </p>
              </Card>
            </StaggerItem>
          )
        )}
      </StaggerChildren>

      {/* Insights */}
      {assessment.insights.length > 0 && (
        <FadeIn delay={0.4}>
          <Card variant="elevated" padding="lg">
            <h3 className="font-semibold text-text-heading mb-4">洞察与启示</h3>
            <ul className="space-y-3">
              {assessment.insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2 text-text-main">
                  <span className="text-primary mt-0.5 shrink-0">✦</span>
                  <span className="leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      )}

      {/* Continue */}
      <FadeIn delay={0.6}>
        <div className="text-center pt-4">
          <p className="text-sm text-text-muted mb-4">
            价值观是你的根基，接下来让我们用方法论探索具体方向
          </p>
          <Button onClick={handleContinue} size="lg">
            进入「术」的层面
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
