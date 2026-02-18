import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'glass' | 'interactive'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  default: 'bg-white/70 shadow-soft',
  elevated: 'bg-white/80 shadow-medium',
  glass: 'bg-white/40 backdrop-blur-md border border-white/50',
  interactive: 'bg-white/70 shadow-soft hover:shadow-medium hover:bg-white/80 cursor-pointer',
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}: CardProps) {
  const baseClass = `
    rounded-[20px] transition-all duration-300
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${className}
  `

  if (variant === 'interactive') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={baseClass}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={baseClass}>{children}</div>
}
