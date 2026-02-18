export interface PhilosophySource {
  id: string
  name: string
  tradition: 'stanford' | 'infinite-game' | 'buddhism' | 'taoism'
  description: string
  coreIdea: string
  keyQuote: string
}

export interface AssessmentQuestion {
  id: string
  dimension: string
  text: string
  options: AssessmentOption[]
}

export interface AssessmentOption {
  value: number
  label: string
  description?: string
}

export interface AssessmentAnswer {
  questionId: string
  value: number
}
