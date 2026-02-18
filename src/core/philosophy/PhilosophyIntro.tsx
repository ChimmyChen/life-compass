import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useJourneyStore } from '@/stores/journeyStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'

const philosophies = [
  {
    id: 'taoism',
    icon: '☯',
    name: '道家智慧',
    tradition: '老子 · 庄子',
    color: 'from-mist to-mist-dark',
    bgColor: 'bg-mist/30',
    coreIdea: '道法自然，无为而治',
    description:
      '道家教导我们顺应自然规律，不强求、不执着。在快速变化的时代，这种智慧帮助我们找到内心的宁静，在"无为"中发现最适合自己的道路。',
    keyQuote: '"上善若水，水善利万物而不争。"',
    insights: ['顺势而为，不逆流而上', '保持柔软，以柔克刚', '回归本真，减少不必要的欲望'],
  },
  {
    id: 'buddhism',
    icon: '🪷',
    name: '佛学智慧',
    tradition: '释迦牟尼 · 禅宗',
    color: 'from-lavender to-lavender-dark',
    bgColor: 'bg-lavender/30',
    coreIdea: '觉察当下，放下执念',
    description:
      '佛学强调觉察和正念，帮助我们看清事物的本质。通过放下对结果的执着，我们反而能更自由地探索人生的可能性。',
    keyQuote: '"一切有为法，如梦幻泡影，如露亦如电，应作如是观。"',
    insights: ['活在当下，不被过去和未来困扰', '接纳无常，拥抱变化', '慈悲为怀，利他即利己'],
  },
  {
    id: 'stanford',
    icon: '🎯',
    name: '人生设计',
    tradition: '斯坦福大学',
    color: 'from-sage to-sage-dark',
    bgColor: 'bg-sage/30',
    coreIdea: '用设计思维规划人生',
    description:
      '斯坦福人生设计课将设计思维应用于人生规划：共情自己、定义问题、构思方案、快速原型、迭代测试。人生不是找到"正确答案"，而是设计多个"美好版本"。',
    keyQuote: '"你无法设计你的人生，但你可以设计你的人生方式。"',
    insights: ['人生有多个美好版本', '重新定义问题比解决问题更重要', '小步快跑，快速试错'],
  },
  {
    id: 'infinite-game',
    icon: '♾️',
    name: '无限游戏',
    tradition: '詹姆斯·卡斯',
    color: 'from-sand to-sand-dark',
    bgColor: 'bg-sand/30',
    coreIdea: '从有限游戏到无限游戏',
    description:
      '有限游戏以取胜为目的，无限游戏以延续为目的。当我们把人生看作无限游戏，就不再执着于一时的输赢，而是关注持续成长和创造。',
    keyQuote: '"有限游戏的参与者在界限内游戏，无限游戏的参与者与界限游戏。"',
    insights: ['不追求赢，追求持续参与', '打破边界，创造新的可能', '关注过程，而非终点'],
  },
]

export function PhilosophyIntro() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setStep, completeStep } = useJourneyStore()

  const selected = philosophies.find((p) => p.id === selectedId)

  const handleContinue = () => {
    completeStep('philosophy-intro')
    setStep('value-assessment')
    navigate('/dao/assessment')
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-text-heading mb-2">四大智慧源泉</h2>
          <p className="text-text-light">
            这些思想将成为你人生罗盘的根基，点击了解每一种智慧
          </p>
        </div>
      </FadeIn>

      {/* Philosophy cards grid */}
      <StaggerChildren className="grid grid-cols-2 gap-4">
        {philosophies.map((phil) => (
          <StaggerItem key={phil.id}>
            <motion.div
              layoutId={`card-${phil.id}`}
              onClick={() => setSelectedId(phil.id)}
              className={`
                ${phil.bgColor} rounded-[20px] p-6 cursor-pointer
                border-2 transition-colors duration-300
                ${selectedId === phil.id ? 'border-primary/40' : 'border-transparent hover:border-primary/20'}
              `}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-3xl block mb-3">{phil.icon}</span>
              <h3 className="font-semibold text-text-heading mb-1">{phil.name}</h3>
              <p className="text-xs text-text-muted mb-2">{phil.tradition}</p>
              <p className="text-sm text-primary font-medium">{phil.coreIdea}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card variant="glass" padding="lg" className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selected.icon}</span>
                <div>
                  <h3 className="font-semibold text-text-heading">{selected.name}</h3>
                  <p className="text-xs text-text-muted">{selected.tradition}</p>
                </div>
              </div>

              <p className="text-text-main leading-relaxed">{selected.description}</p>

              <blockquote className="border-l-2 border-primary/30 pl-4 py-1 text-sm text-text-light italic">
                {selected.keyQuote}
              </blockquote>

              <div>
                <p className="text-sm font-medium text-text-heading mb-2">核心启示：</p>
                <ul className="space-y-1.5">
                  {selected.insights.map((insight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-text-light"
                    >
                      <span className="text-primary mt-0.5">·</span>
                      {insight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <FadeIn delay={0.6}>
        <div className="text-center pt-4">
          <p className="text-sm text-text-muted mb-4">
            了解这些智慧后，让我们开始探索你的内心世界
          </p>
          <Button onClick={handleContinue} size="lg">
            开始价值观评估
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
