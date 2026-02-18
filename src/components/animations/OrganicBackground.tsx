import { motion } from 'framer-motion'

const blobs = [
  {
    size: 'w-[500px] h-[500px]',
    color: 'bg-primary/[0.07]',
    position: 'top-[-10%] left-[-8%]',
    duration: 22,
    delay: 0,
  },
  {
    size: 'w-[400px] h-[400px]',
    color: 'bg-accent/[0.06]',
    position: 'top-[30%] right-[-5%]',
    duration: 28,
    delay: 2,
  },
  {
    size: 'w-[350px] h-[350px]',
    color: 'bg-secondary/[0.05]',
    position: 'bottom-[-5%] left-[20%]',
    duration: 25,
    delay: 4,
  },
  {
    size: 'w-[250px] h-[250px]',
    color: 'bg-primary-light/[0.08]',
    position: 'top-[60%] left-[-3%]',
    duration: 20,
    delay: 1,
  },
  {
    size: 'w-[300px] h-[300px]',
    color: 'bg-sage/[0.12]',
    position: 'top-[10%] right-[25%]',
    duration: 30,
    delay: 3,
  },
]

export function OrganicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.color} ${blob.position} blur-3xl`}
          style={{
            animation: `blob-morph ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: blob.delay * 0.3 }}
        />
      ))}

      {/* 小型浮动粒子 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary/[0.15]"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-drift ${12 + i * 3}s ease-in-out ${i * 1.5}s infinite`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
        />
      ))}

      {/* SVG 波浪线条 */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-[0.04]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="currentColor"
          className="text-primary"
          style={{ animation: 'wave-flow 8s ease-in-out infinite' }}
        />
        <path
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,70 1440,80 L1440,120 L0,120 Z"
          fill="currentColor"
          className="text-secondary"
          style={{ animation: 'wave-flow 12s ease-in-out 2s infinite' }}
        />
      </svg>
    </div>
  )
}
