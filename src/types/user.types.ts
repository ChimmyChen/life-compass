export interface UserProfile {
  id: string
  name: string
  createdAt: string
  lastUpdated: string
}

export interface ValueDimensions {
  wisdom: number       // 智慧追求
  compassion: number   // 慈悲心
  freedom: number      // 自由度
  growth: number       // 成长性
  contribution: number // 贡献感
  harmony: number      // 和谐感
  authenticity: number // 真实性
  flow: number         // 心流体验
  gameview: number     // 游戏观（有限思维 vs 无限思维）
}

export interface ValueAssessment {
  dimensions: ValueDimensions
  completedAt: string
  insights: string[]
}

export type ValueDimensionKey = keyof ValueDimensions

export const VALUE_DIMENSION_LABELS: Record<ValueDimensionKey, { name: string; description: string }> = {
  wisdom: { name: '智慧', description: '对知识、真理和深层理解的追求' },
  compassion: { name: '慈悲', description: '对他人苦难的感知和帮助的意愿' },
  freedom: { name: '自由', description: '对自主、独立和不受束缚的渴望' },
  growth: { name: '成长', description: '持续学习、进步和自我超越的动力' },
  contribution: { name: '贡献', description: '为他人和社会创造价值的使命感' },
  harmony: { name: '和谐', description: '追求内心平静和与环境的协调' },
  authenticity: { name: '真实', description: '忠于自我、表里如一的生活态度' },
  flow: { name: '心流', description: '沉浸于热爱之事时的忘我体验' },
  gameview: { name: '游戏观', description: '看待人生输赢和竞争的方式' },
}
