import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { useUserStore } from '@/stores/userStore'
import type { ValueDimensions, ValueDimensionKey } from '@/types/user.types'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from 'recharts'
import { VALUE_DIMENSION_LABELS } from '@/types/user.types'

/* ====== 身份画像体系 ====== */
/* 不模仿 MBTI，而是基于用户的价值观光谱 + 游戏观，
   生成一个有诗意的、与 AI 时代结合的身份画像 */

interface Identity {
  title: string
  subtitle: string
  essence: string
  description: string
  gameNature: string  // 有限/无限游戏倾向的解读
  aiRelation: string  // 与 AI 的关系
  strengths: string[]
  directions: string[]
  philosophy: string
  element: string     // 自然元素隐喻
}

function deriveIdentity(d: ValueDimensions): Identity {
  // 找到最高的三个维度
  const entries = Object.entries(d) as [ValueDimensionKey, number][]
  const sorted = entries.filter(([k]) => k !== 'gameview').sort((a, b) => b[1] - a[1])
  const top1 = sorted[0][0]
  const top2 = sorted[1][0]
  const isInfinite = d.gameview >= 60

  // 核心驱动力判断
  const isCreator = d.flow + d.freedom + d.authenticity > d.compassion + d.contribution + d.harmony
  const isDeep = d.wisdom + d.flow > d.freedom + d.growth

  // 根据核心特质组合生成身份
  if (isCreator && isInfinite && !isDeep) {
    return {
      title: '无界造浪者',
      subtitle: 'Boundless Wave Maker',
      essence: '你是不被定义的创造力本身',
      description: '你不追求赢得某场比赛，而是不断创造新的游戏。在 AI 时代，你天然地把技术当作画笔，在无限的画布上自由挥洒。你的力量不在于击败谁，而在于持续地创造出别人没见过的东西。',
      gameNature: '你是天生的无限玩家 — 不在意终点，享受创造本身。每一次尝试都不是为了赢，而是为了看看还能做出什么。',
      aiRelation: '你会把 AI 当作共创伙伴，用它加速从灵感到现实的过程。你不怕 AI 替代你，因为你的价值在于提出问题，而不是回答问题。',
      strengths: ['跨界创新', '趋势直觉', '快速迭代'],
      directions: ['AI 产品创造者', '独立创作者', '创新实验室'],
      philosophy: '"天地不仁，以万物为刍狗" — 你理解这不是冷漠，而是最大的自由',
      element: '风',
    }
  }

  if (isCreator && isInfinite && isDeep) {
    return {
      title: '深渊织梦者',
      subtitle: 'Abyss Dream Weaver',
      essence: '你在深处创造，在沉默中改变世界',
      description: '你不追求广度，而是在一个领域潜入最深处。你相信真正的创造来自长期的沉浸和积累。AI 时代的喧嚣不会动摇你，因为你知道深度是最稀缺的资源。',
      gameNature: '你玩的是最长的无限游戏 — 在一个领域持续深耕，不是为了某个里程碑，而是因为探索本身就是意义。',
      aiRelation: '你会训练 AI 成为你领域内的专属助手，用它处理表层工作，自己专注于只有人类直觉才能触及的深层创造。',
      strengths: ['极致专注', '深度洞察', '原创思维'],
      directions: ['前沿研究者', '技术艺术家', '领域专家型创业'],
      philosophy: '"一花一世界，一叶一菩提" — 你在微观中看见宏观',
      element: '水',
    }
  }

  if (isCreator && !isInfinite) {
    return {
      title: '破局执剑者',
      subtitle: 'Pattern Breaker',
      essence: '你为了赢而创造，为了改变而战斗',
      description: '你有明确的目标和强烈的驱动力。你不是漫无目的地探索，而是看准方向全力出击。在 AI 时代，你会迅速掌握最强的工具，用它们达成你的目标。',
      gameNature: '你是目标明确的玩家 — 你知道自己要什么，也知道怎么拿到。这种清晰的意志力是你最大的武器。',
      aiRelation: '你会把 AI 当作最锋利的工具，快速学习、快速部署。你关注的是结果和效率，AI 是你实现目标的加速器。',
      strengths: ['目标驱动', '执行力强', '竞争意识'],
      directions: ['AI 赋能创业', '增长黑客', '战略咨询'],
      philosophy: '"知其不可而为之" — 你的力量来自不服输的意志',
      element: '火',
    }
  }

  if (!isCreator && isInfinite && (top1 === 'compassion' || top2 === 'compassion')) {
    return {
      title: '万物共鸣者',
      subtitle: 'Universal Resonator',
      essence: '你听见了别人听不见的声音',
      description: '你对他人的感受有超乎寻常的敏感度，而且你不急于"解决"问题，而是先真正地理解。在 AI 替代了很多技能的时代，你的共情力和陪伴力反而变得更加珍贵。',
      gameNature: '你不在意谁赢谁输，你在意的是每个人都能被看见。你玩的不是竞争的游戏，而是连接的游戏。',
      aiRelation: '你会用 AI 扩大你关怀的半径 — 让技术帮你触达更多需要帮助的人，但核心的人际温度永远由你亲自传递。',
      strengths: ['深度共情', '倾听能力', '疗愈力量'],
      directions: ['AI 心理健康', '生命教练', '社会创新'],
      philosophy: '"上善若水，水善利万物而不争" — 你的柔软就是你的力量',
      element: '水',
    }
  }

  if (!isCreator && isInfinite) {
    return {
      title: '静水深流者',
      subtitle: 'Still Water Runner',
      essence: '你在平静中蕴含改变世界的力量',
      description: '你不追求轰轰烈烈，而是在日复一日的坚持中创造深远的影响。你相信真正的改变是缓慢的、持续的、不可逆的。AI 时代的浮躁与你无关，你有自己的节奏。',
      gameNature: '你是最有耐心的无限玩家 — 你不急于证明什么，因为你知道时间会证明一切。',
      aiRelation: '你会谨慎而智慧地使用 AI，让它服务于你长期守护的价值，而不是被技术的浪潮裹挟。',
      strengths: ['长期主义', '稳定可靠', '价值坚守'],
      directions: ['教育创新', '可持续发展', '文化传承'],
      philosophy: '"道生一，一生二，二生三，三生万物" — 你理解万物生长需要时间',
      element: '土',
    }
  }

  if (!isCreator && !isInfinite && (top1 === 'wisdom' || top2 === 'wisdom')) {
    return {
      title: '秩序编织者',
      subtitle: 'Order Architect',
      essence: '你用智慧为混乱的世界建立秩序',
      description: '你有清晰的头脑和强烈的责任感。你不满足于空想，而是要把想法变成可执行的系统。在 AI 时代，你是那个能把技术和人文需求桥接起来的人。',
      gameNature: '你喜欢有规则的游戏，但你的目标不是赢，而是让规则变得更公平、更合理。',
      aiRelation: '你会系统性地学习和部署 AI，用它构建更高效、更公平的系统。你关注的是 AI 如何服务于更大的秩序。',
      strengths: ['系统思维', '逻辑严谨', '责任担当'],
      directions: ['AI 治理', '技术管理', '制度设计'],
      philosophy: '"格物致知，诚意正心" — 你相信秩序是文明的基石',
      element: '金',
    }
  }

  // 默认：务实行动者
  return {
    title: '大地行者',
    subtitle: 'Earth Walker',
    essence: '你用双脚丈量世界，用双手改变现实',
    description: '你不空谈理想，而是脚踏实地地做事。你相信行动比思考更重要，结果比过程更真实。在 AI 时代，你会快速适应，因为你的核心能力是"把事情做成"。',
    gameNature: '你是务实的玩家 — 你关注的是眼前能做什么，而不是遥远的未来。这种脚踏实地的力量让你在任何时代都不会迷失。',
    aiRelation: '你会把 AI 当作提升效率的实用工具，不神化也不恐惧，用最务实的方式让它为你服务。',
    strengths: ['执行力', '适应力', '务实精神'],
    directions: ['运营管理', '项目落地', '实业创新'],
    philosophy: '"千里之行，始于足下" — 你知道一切伟大都始于第一步',
    element: '土',
  }
}

const elementEmoji: Record<string, string> = {
  '风': '🌬️', '水': '💧', '火': '🔥', '土': '🌍', '金': '⚡',
}

/* ====== 组件 ====== */

export function IdentityResult() {
  const navigate = useNavigate()
  const assessment = useUserStore((s) => s.valueAssessment)
  const profile = useUserStore((s) => s.profile)

  const identity = useMemo(() => {
    if (!assessment) return null
    return deriveIdentity(assessment.dimensions)
  }, [assessment])

  const radarData = useMemo(() => {
    if (!assessment) return []
    return (Object.entries(assessment.dimensions) as [ValueDimensionKey, number][]).map(
      ([key, value]) => ({
        dimension: VALUE_DIMENSION_LABELS[key].name,
        value,
        fullMark: 100,
      })
    )
  }, [assessment])

  if (!assessment || !identity) {
    navigate('/dao/assessment')
    return null
  }

  return (
    <div className="space-y-8">
      {/* Identity reveal */}
      <FadeIn>
        <div className="text-center space-y-5">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-[28px]
                       bg-gradient-to-br from-primary/15 to-accent/15 shadow-glow"
          >
            <span className="text-4xl">{elementEmoji[identity.element]}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-text-muted mb-1">{profile?.name}，你是</p>
            <h2 className="text-3xl font-bold text-text-heading">{identity.title}</h2>
            <p className="text-primary font-medium mt-1">{identity.subtitle}</p>
          </motion.div>
        </div>
      </FadeIn>

      {/* Essence */}
      <FadeIn delay={0.7}>
        <Card variant="glass" padding="lg">
          <p className="text-lg text-text-heading text-center font-medium leading-relaxed">
            "{identity.essence}"
          </p>
        </Card>
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.8}>
        <Card variant="default" padding="lg">
          <p className="text-text-main leading-[1.8] text-[15px]">
            {identity.description}
          </p>
        </Card>
      </FadeIn>

      {/* Game nature */}
      <FadeIn delay={0.9}>
        <Card variant="elevated" padding="lg" className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">♾️</span>
            <h3 className="font-semibold text-text-heading">你的游戏方式</h3>
          </div>
          <p className="text-sm text-text-main leading-relaxed">{identity.gameNature}</p>
        </Card>
      </FadeIn>

      {/* Radar */}
      <FadeIn delay={1.0}>
        <Card variant="default" padding="md">
          <h3 className="font-semibold text-text-heading text-center mb-2">价值观光谱</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--color-mist-dark)" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: 'var(--color-text-main)', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </FadeIn>

      {/* AI relation */}
      <FadeIn delay={1.1}>
        <Card variant="elevated" padding="lg" className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <h3 className="font-semibold text-text-heading">你与 AI 的关系</h3>
          </div>
          <p className="text-sm text-text-main leading-relaxed">{identity.aiRelation}</p>
        </Card>
      </FadeIn>

      {/* Strengths + Directions */}
      <FadeIn delay={1.2}>
        <div className="grid grid-cols-2 gap-4">
          <Card variant="default" padding="md" className="space-y-3">
            <h3 className="font-semibold text-text-heading text-sm">核心优势</h3>
            <div className="flex flex-wrap gap-1.5">
              {identity.strengths.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary-dark">
                  {s}
                </span>
              ))}
            </div>
          </Card>
          <Card variant="default" padding="md" className="space-y-3">
            <h3 className="font-semibold text-text-heading text-sm">适合方向</h3>
            <div className="flex flex-wrap gap-1.5">
              {identity.directions.map((d) => (
                <span key={d} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                  {d}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </FadeIn>

      {/* Philosophy */}
      <FadeIn delay={1.3}>
        <Card variant="glass" padding="md">
          <p className="text-sm text-text-light italic text-center leading-relaxed">
            {identity.philosophy}
          </p>
        </Card>
      </FadeIn>

      {/* Actions */}
      <FadeIn delay={1.4}>
        <div className="text-center pt-4 space-y-3">
          <p className="text-sm text-text-muted">
            这是此刻的你。人在变，世界在变，随时可以重新探索。
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              重新开始
            </Button>
            <Button variant="ghost" onClick={() => navigate('/shu/trends')}>
              回看时代趋势
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
