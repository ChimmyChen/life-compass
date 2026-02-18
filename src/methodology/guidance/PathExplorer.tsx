import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { useUserStore } from '@/stores/userStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useNavigate } from 'react-router-dom'
import { VALUE_DIMENSION_LABELS } from '@/types/user.types'
import type { ValueDimensionKey } from '@/types/user.types'

interface PathOption {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  alignedValues: ValueDimensionKey[]
  opportunities: string[]
}

const allPaths: PathOption[] = [
  {
    id: 'creator',
    title: '创造者之路',
    description: '用创造力和技术构建新事物，在 AI 时代成为工具的驾驭者而非被替代者。',
    icon: '🎨',
    tags: ['创业', '产品', '设计', '开发'],
    alignedValues: ['flow', 'freedom', 'authenticity'],
    opportunities: ['AI 产品开发', '独立创作者经济', '数字艺术与设计'],
  },
  {
    id: 'healer',
    title: '疗愈者之路',
    description: '帮助他人成长和疗愈，在人与人的连接中找到意义。',
    icon: '🌿',
    tags: ['心理咨询', '教育', '健康', '社工'],
    alignedValues: ['compassion', 'contribution', 'harmony'],
    opportunities: ['心理健康服务', '生命教练', '整合医学'],
  },
  {
    id: 'explorer',
    title: '探索者之路',
    description: '不断学习和探索未知领域，在知识的边界寻找突破。',
    icon: '🔭',
    tags: ['研究', '学术', '科技', '创新'],
    alignedValues: ['wisdom', 'growth', 'freedom'],
    opportunities: ['AI 研究', '跨学科创新', '前沿科技探索'],
  },
  {
    id: 'connector',
    title: '连接者之路',
    description: '搭建桥梁，连接人与人、文化与文化、想法与想法。',
    icon: '🌐',
    tags: ['社区', '传媒', '国际', '平台'],
    alignedValues: ['contribution', 'harmony', 'compassion'],
    opportunities: ['社区建设', '跨文化交流', '平台运营'],
  },
  {
    id: 'craftsman',
    title: '匠人之路',
    description: '在一个领域深耕细作，追求极致的专业和品质。',
    icon: '⚒️',
    tags: ['专业技能', '手艺', '精益', '深度'],
    alignedValues: ['flow', 'growth', 'authenticity'],
    opportunities: ['高端专业服务', '传统技艺创新', 'AI 辅助精细化工作'],
  },
]

export function PathExplorer() {
  const assessment = useUserStore((s) => s.valueAssessment)
  const navigate = useNavigate()
  const { completeStep } = useJourneyStore()

  // Sort paths by alignment with user's values
  const sortedPaths = [...allPaths].sort((a, b) => {
    if (!assessment) return 0
    const scoreA = a.alignedValues.reduce((sum, v) => sum + (assessment.dimensions[v] || 0), 0)
    const scoreB = b.alignedValues.reduce((sum, v) => sum + (assessment.dimensions[v] || 0), 0)
    return scoreB - scoreA
  })

  const handleContinue = () => {
    completeStep('path-explorer')
    navigate('/result/identity')
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-heading mb-2">人生方向探索</h2>
          <p className="text-text-light">
            基于你的价值观，这些方向可能与你产生共鸣
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="space-y-4">
        {sortedPaths.map((path, i) => (
          <StaggerItem key={path.id}>
            <Card variant="interactive" padding="lg" className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{path.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-heading text-lg">{path.title}</h3>
                    {i === 0 && assessment && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        最匹配
                      </span>
                    )}
                  </div>
                  <p className="text-text-main text-sm leading-relaxed">{path.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {path.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-cream-dark/60 text-text-light">
                    {tag}
                  </span>
                ))}
              </div>

              {assessment && (
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>契合价值：</span>
                  {path.alignedValues.map((v) => (
                    <span key={v} className="px-2 py-0.5 rounded-full bg-primary/5 text-primary">
                      {VALUE_DIMENSION_LABELS[v].name}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-text-heading mb-1.5">时代机遇：</p>
                <div className="flex flex-wrap gap-1.5">
                  {path.opportunities.map((opp) => (
                    <span key={opp} className="text-xs px-2.5 py-1 rounded-full bg-sage/40 text-text-main">
                      {opp}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn delay={0.5}>
        <div className="text-center pt-4">
          <p className="text-sm text-text-muted mb-4">
            了解这些方向后，让我们揭晓你的 AI 时代身份
          </p>
          <Button onClick={handleContinue} size="lg">
            生成我的身份画像
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
