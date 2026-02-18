import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export function Progress({ value, max = 100, label, showPercentage = false, className = '' }: ProgressProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm text-text-light">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-light to-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}
