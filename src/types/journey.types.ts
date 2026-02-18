export type JourneyPhase = 'welcome' | 'dao' | 'shu' | 'qi'

export type DaoStep =
  | 'philosophy-intro'
  | 'value-assessment'
  | 'value-result'
  | 'self-awareness'
  | 'life-timeline'

export type ShuStep =
  | 'stanford-design'
  | 'infinite-game'
  | 'decision-tree'
  | 'trends'
  | 'path-explorer'

export type QiStep =
  | 'goal-setting'
  | 'action-planner'
  | 'milestone-tracker'
  | 'progress-dashboard'
  | 'reflection'

export type JourneyStep = DaoStep | ShuStep | QiStep

export interface Insight {
  id: string
  content: string
  phase: JourneyPhase
  step: JourneyStep
  createdAt: string
}

export interface JourneyState {
  currentPhase: JourneyPhase
  currentStep: JourneyStep | null
  completedSteps: JourneyStep[]
  insights: Insight[]
  startedAt: string | null
}

export const PHASE_INFO: Record<JourneyPhase, { name: string; icon: string; description: string }> = {
  welcome: { name: '启程', icon: '🌅', description: '开始你的人生探索之旅' },
  dao: { name: '道', icon: '☯', description: '认识自我，建立价值观根基' },
  shu: { name: '术', icon: '🧭', description: '掌握方法，探索人生方向' },
  qi: { name: '器', icon: '⚒', description: '付诸行动，制定具体计划' },
}
