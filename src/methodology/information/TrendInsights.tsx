import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'

const trends = [
  {
    id: 'ai-workforce',
    category: '人工智能',
    title: 'AI 正在重塑所有行业',
    description: '生成式 AI 不再只是工具，而是协作伙伴。重复性脑力劳动正在被替代，但创造力、判断力和人际连接的价值在上升。',
    signal: '2025 年全球 AI 市场规模突破 2000 亿美元，70% 的企业已在使用 AI 工具',
    opportunity: '学会与 AI 协作的人，生产力将是不会的人的 10 倍',
    icon: '🤖',
    color: 'from-primary/10 to-mist/30',
  },
  {
    id: 'remote-global',
    category: '工作方式',
    title: '地理边界正在消失',
    description: '远程工作和数字游民不再是小众选择。全球化协作让个人可以为任何地方的公司工作，也可以在任何地方生活。',
    signal: '全球远程工作者超过 3500 万，数字游民签证已在 50+ 国家推出',
    opportunity: '你的竞争对手和合作伙伴都在全球范围内，但机会也是',
    icon: '🌍',
    color: 'from-accent/10 to-sage/30',
  },
  {
    id: 'creator-economy',
    category: '个体崛起',
    title: '一个人就是一家公司',
    description: 'AI 工具让个人可以完成过去需要团队才能做的事。独立创作者、solo founder、自由职业者正在成为主流。',
    signal: '全球创作者经济规模超过 1500 亿美元，AI 让内容创作成本降低 90%',
    opportunity: '找到你的独特视角 + AI 杠杆 = 不可替代的个人品牌',
    icon: '🚀',
    color: 'from-secondary/10 to-lavender/30',
  },
  {
    id: 'meaning-crisis',
    category: '精神需求',
    title: '意义感成为稀缺资源',
    description: '物质丰裕但精神空虚的时代，心理健康、冥想、哲学、灵性探索的需求爆发式增长。能帮助他人找到意义的人，将越来越被需要。',
    signal: '全球心理健康市场年增长 15%，冥想 App 用户超过 5 亿',
    opportunity: '东方智慧 + 现代科技 = 新时代的精神引导',
    icon: '🧘',
    color: 'from-sand/20 to-cream-dark/30',
  },
  {
    id: 'longevity',
    category: '生命科学',
    title: '人生可能有 100 年',
    description: '随着医学进步，我们这一代人很可能活到 100 岁。这意味着你不需要在 25 岁就决定一辈子做什么，你有多次重新开始的机会。',
    signal: '抗衰老研究投资 5 年增长 400%，百岁老人数量每 10 年翻一番',
    opportunity: '人生不是一条直线，而是多段旅程的组合',
    icon: '🧬',
    color: 'from-primary-light/10 to-blush/30',
  },
]

export function TrendInsights() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-heading mb-2">时代脉搏</h2>
          <p className="text-text-light">
            在做选择之前，先看看这个世界正在发生什么
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card variant="glass" padding="sm">
          <p className="text-sm text-text-light leading-relaxed text-center">
            以下趋势基于全球科技、经济和社会发展的综合分析。
            <span className="text-primary font-medium">了解大势，才能顺势而为。</span>
          </p>
        </Card>
      </FadeIn>

      <StaggerChildren className="space-y-4">
        {trends.map((trend) => (
          <StaggerItem key={trend.id}>
            <Card variant="default" padding="md" className="space-y-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${trend.color}`}>
                <span>{trend.icon}</span>
                <span className="text-xs font-medium text-text-heading">{trend.category}</span>
              </div>

              <h3 className="font-semibold text-text-heading text-lg">{trend.title}</h3>
              <p className="text-sm text-text-main leading-relaxed">{trend.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-cream/60 rounded-[12px] p-3">
                  <p className="text-xs font-medium text-text-muted mb-1">信号</p>
                  <p className="text-xs text-text-light leading-relaxed">{trend.signal}</p>
                </div>
                <div className="bg-primary/5 rounded-[12px] p-3">
                  <p className="text-xs font-medium text-primary mb-1">机会</p>
                  <p className="text-xs text-text-light leading-relaxed">{trend.opportunity}</p>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn delay={0.5}>
        <div className="text-center pt-4">
          <p className="text-sm text-text-muted mb-4">
            了解了时代趋势，现在看看哪些方向适合你
          </p>
          <Button onClick={() => navigate('/shu/paths')} size="lg">
            探索适合我的方向
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
