import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FadeIn } from '@/components/animations/FadeIn'

const welcomeSteps = [
  {
    title: '欢迎来到人生罗盘',
    subtitle: '在变化的时代，找到不变的自己',
    content: '当世界飞速变化，AI 重塑一切，我们比任何时候都更需要回到内心，找到属于自己的方向。',
    quote: '"知人者智，自知者明" — 老子《道德经》',
  },
  {
    title: '道 · 术 · 器',
    subtitle: '三层智慧，层层递进',
    content: '我们将从"道"开始 — 认识你的核心价值观；再到"术" — 掌握方法论和信息；最后到"器" — 制定具体的行动计划。',
    quote: '"形而上者谓之道，形而下者谓之器" — 《易经》',
  },
  {
    title: '开始你的旅程',
    subtitle: '告诉我你的名字，让我们一起出发',
    content: '这段旅程没有标准答案，只有属于你的独特路径。每一步探索都是对自我的深入了解。',
    quote: '"千里之行，始于足下" — 老子《道德经》',
  },
]

export function Welcome() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const setProfile = useUserStore((s) => s.setProfile)
  const setPhase = useJourneyStore((s) => s.setPhase)
  const setStep_ = useJourneyStore((s) => s.setStep)

  const current = welcomeSteps[step]
  const isLastStep = step === welcomeSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      if (!name.trim()) return
      setProfile(name.trim())
      setPhase('dao')
      setStep_('philosophy-intro')
      navigate('/dao/philosophy')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mist/40 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blush/40 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-lavender/30 blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {welcomeSteps.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/40' : 'w-4 bg-text-muted/30'
              }`}
              layoutId={undefined}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            {/* Main content card */}
            <div className="bg-white/60 backdrop-blur-md rounded-[28px] p-10 shadow-medium border border-white/50">
              <FadeIn delay={0.1}>
                <h1 className="text-3xl font-semibold text-text-heading mb-3 leading-tight">
                  {current.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-primary text-sm font-medium mb-6">
                  {current.subtitle}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-text-light leading-relaxed mb-8">
                  {current.content}
                </p>
              </FadeIn>

              {/* Name input on last step */}
              {isLastStep && (
                <FadeIn delay={0.4}>
                  <div className="mb-8">
                    <Input
                      placeholder="请输入你的名字"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      className="text-center text-lg"
                    />
                  </div>
                </FadeIn>
              )}

              {/* Quote */}
              <FadeIn delay={isLastStep ? 0.5 : 0.4}>
                <p className="text-sm text-text-muted italic border-t border-cream-dark/50 pt-6">
                  {current.quote}
                </p>
              </FadeIn>
            </div>

            {/* Navigation */}
            <FadeIn delay={0.5} className="mt-8 flex justify-center gap-4">
              {step > 0 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  返回
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isLastStep && !name.trim()}
                size="lg"
              >
                {isLastStep ? '开始旅程' : '继续'}
              </Button>
            </FadeIn>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
