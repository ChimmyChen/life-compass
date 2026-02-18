import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { assessmentQuestions } from './questions'
import type { ValueDimensions, ValueDimensionKey } from '@/types/user.types'
import { VALUE_DIMENSION_LABELS } from '@/types/user.types'

export function ValueAssessment() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const navigate = useNavigate()
  const setValueAssessment = useUserStore((s) => s.setValueAssessment)
  const { setStep, completeStep } = useJourneyStore()

  const question = assessmentQuestions[currentIndex]
  const totalQuestions = assessmentQuestions.length
  const selectedValue = answers[question.id]

  const handleSelect = (value: number) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = () => {
    if (selectedValue === undefined) return

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Calculate dimensions
      const dimensions = calculateDimensions(answers)
      const insights = generateInsights(dimensions)
      setValueAssessment(dimensions, insights)
      completeStep('value-assessment')
      setStep('value-result')
      navigate('/dao/result')
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-heading mb-2">价值观探索</h2>
        <p className="text-text-light text-sm">
          没有对错之分，选择最贴近你内心的答案
        </p>
      </div>

      {/* Progress */}
      <Progress
        value={currentIndex + 1}
        max={totalQuestions}
        label={`第 ${currentIndex + 1} / ${totalQuestions} 题`}
        showPercentage
      />

      {/* Dimension indicator */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          {VALUE_DIMENSION_LABELS[question.dimension as ValueDimensionKey]?.name}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-6"
        >
          <h3 className="text-xl text-text-heading text-center font-medium leading-relaxed">
            {question.text}
          </h3>

          <div className="space-y-3">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  w-full text-left p-5 rounded-[16px] border-2 transition-all duration-300
                  cursor-pointer
                  ${
                    selectedValue === option.value
                      ? 'border-primary bg-primary/5 shadow-glow'
                      : 'border-transparent bg-white/60 hover:bg-white/80 hover:border-primary/20'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${selectedValue === option.value ? 'border-primary' : 'border-text-muted'}
                    `}
                  >
                    {selectedValue === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-primary"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-text-heading">{option.label}</p>
                    {option.description && (
                      <p className="text-sm text-text-muted mt-0.5">{option.description}</p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          上一题
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedValue === undefined}
        >
          {currentIndex === totalQuestions - 1 ? '查看结果' : '下一题'}
        </Button>
      </div>
    </div>
  )
}

function calculateDimensions(answers: Record<string, number>): ValueDimensions {
  const dimensionMap: Record<string, string[]> = {
    wisdom: ['w1', 'w2'],
    compassion: ['c1', 'c2'],
    freedom: ['f1', 'f2'],
    growth: ['g1', 'g2'],
    contribution: ['co1', 'co2'],
    harmony: ['h1', 'h2'],
    authenticity: ['a1', 'a2'],
    flow: ['fl1', 'fl2'],
    gameview: ['gv1', 'gv2'],
  }

  const dimensions: Record<string, number> = {}
  for (const [dim, questionIds] of Object.entries(dimensionMap)) {
    const values = questionIds.map((id) => answers[id] || 3)
    dimensions[dim] = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 20)
  }

  return dimensions as unknown as ValueDimensions
}

function generateInsights(dimensions: ValueDimensions): string[] {
  const insights: string[] = []
  const entries = Object.entries(dimensions) as [ValueDimensionKey, number][]
  const sorted = entries.sort((a, b) => b[1] - a[1])

  const top = sorted.slice(0, 3)
  const topNames = top.map(([k]) => VALUE_DIMENSION_LABELS[k].name)
  insights.push(`你最看重的价值是：${topNames.join('、')}`)

  if (dimensions.wisdom > 80 && dimensions.flow > 80) {
    insights.push('你是一个追求深度理解和沉浸体验的人，适合需要专注和创造力的领域')
  }
  if (dimensions.compassion > 80 && dimensions.contribution > 80) {
    insights.push('你有强烈的利他精神，在帮助他人的过程中能找到深层的满足感')
  }
  if (dimensions.freedom > 80 && dimensions.authenticity > 80) {
    insights.push('你渴望真实和自由，不愿被传统框架束缚，适合开创性的道路')
  }
  if (dimensions.harmony > 80 && dimensions.growth > 80) {
    insights.push('你追求内外平衡的成长，能在稳定中持续进步')
  }
  if (dimensions.gameview > 80) {
    insights.push('你天然倾向于长期主义，不执着于一时输赢，关注持续成长')
  } else if (dimensions.gameview < 40) {
    insights.push('你有很强的目标驱动力，善于在竞争中找到方向和动力')
  }

  return insights
}
