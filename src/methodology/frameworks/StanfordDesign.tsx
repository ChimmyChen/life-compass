import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { useJourneyStore } from '@/stores/journeyStore'
import { useNavigate } from 'react-router-dom'

const designSteps = [
  {
    id: 'empathize',
    name: '共情自己',
    icon: '🌱',
    prompt: '此刻，你对自己的生活状态满意吗？',
    hint: '不需要完美的答案，只需要诚实地感受',
    placeholder: '写下你真实的感受...',
  },
  {
    id: 'pain',
    name: '觉察困扰',
    icon: '🔍',
    prompt: '如果可以改变一件事，你最想改变什么？',
    hint: '可以是工作、关系、生活方式，任何让你不安的事',
    placeholder: '那件让你反复想起的事...',
  },
  {
    id: 'dream',
    name: '自由想象',
    icon: '✨',
    prompt: '如果没有任何限制，你最想过什么样的生活？',
    hint: '忘掉现实约束，让内心自由地说话',
    placeholder: '在那个世界里，你在做什么...',
  },
  {
    id: 'energy',
    name: '能量来源',
    icon: '⚡',
    prompt: '什么事情让你做起来忘记时间？',
    hint: '回忆那些让你全身心投入的时刻',
    placeholder: '那些让你进入心流的事...',
  },
  {
    id: 'fear',
    name: '直面恐惧',
    icon: '🌊',
    prompt: '什么在阻止你去追求想要的生活？',
    hint: '恐惧被看见的时候，就失去了一半力量',
    placeholder: '你害怕的是...',
  },
]

export function StanfordDesign() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const { completeStep } = useJourneyStore()

  const current = designSteps[step]
  const currentAnswer = answers[current.id] || ''

  const handleNext = () => {
    if (step < designSteps.length - 1) {
      setStep(step + 1)
    } else {
      completeStep('stanford-design')
      navigate('/shu/summary')
    }
  }

  return (
    <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col">
      {/* Progress */}
      <Progress
        value={step + 1}
        max={designSteps.length}
        label={`${step + 1} / ${designSteps.length}`}
        className="mb-12"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            >
              <span className="text-5xl">{current.icon}</span>
            </motion.div>

            {/* Question */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-text-heading leading-relaxed">
                {current.prompt}
              </h2>
              <p className="text-sm text-text-muted">{current.hint}</p>
            </div>

            {/* Answer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <textarea
                value={currentAnswer}
                onChange={(e) => setAnswers({ ...answers, [current.id]: e.target.value })}
                placeholder={current.placeholder}
                rows={4}
                className="w-full px-5 py-4 rounded-[16px] bg-white/50 backdrop-blur-sm
                           border border-white/40 text-text-main placeholder:text-text-muted/60
                           focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/25
                           resize-none transition-all text-[15px] leading-relaxed"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button
          variant="ghost"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          上一步
        </Button>
        <Button onClick={handleNext} disabled={!currentAnswer.trim()}>
          {step === designSteps.length - 1 ? '继续' : '下一步'}
        </Button>
      </div>
    </div>
  )
}
