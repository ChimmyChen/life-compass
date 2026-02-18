import type { AssessmentQuestion } from '@/types/philosophy.types'

export const assessmentQuestions: AssessmentQuestion[] = [
  // 智慧 (wisdom)
  {
    id: 'w1',
    dimension: 'wisdom',
    text: '面对一个复杂问题时，你更倾向于？',
    options: [
      { value: 1, label: '快速找到可行方案', description: '效率优先' },
      { value: 3, label: '花时间理解问题本质', description: '先理解再行动' },
      { value: 5, label: '深入研究底层原理', description: '追根溯源' },
    ],
  },
  {
    id: 'w2',
    dimension: 'wisdom',
    text: '你如何看待"不知道"这件事？',
    options: [
      { value: 1, label: '让我焦虑，想尽快找到答案' },
      { value: 3, label: '可以接受，但会持续关注' },
      { value: 5, label: '觉得很好，未知是探索的起点' },
    ],
  },
  // 慈悲 (compassion)
  {
    id: 'c1',
    dimension: 'compassion',
    text: '看到陌生人遇到困难时，你的第一反应是？',
    options: [
      { value: 1, label: '注意到但不太会主动帮忙' },
      { value: 3, label: '如果方便会伸出援手' },
      { value: 5, label: '内心会被触动，想办法帮助' },
    ],
  },
  {
    id: 'c2',
    dimension: 'compassion',
    text: '当朋友做了你不认同的决定时？',
    options: [
      { value: 1, label: '直接指出问题所在' },
      { value: 3, label: '表达关心，适当提醒' },
      { value: 5, label: '先理解他的处境和感受' },
    ],
  },
  // 自由 (freedom)
  {
    id: 'f1',
    dimension: 'freedom',
    text: '你如何看待规则和约束？',
    options: [
      { value: 1, label: '规则让我安心，提供方向' },
      { value: 3, label: '合理的规则可以接受' },
      { value: 5, label: '更喜欢自己定义规则' },
    ],
  },
  {
    id: 'f2',
    dimension: 'freedom',
    text: '如果经济不是问题，你会选择？',
    options: [
      { value: 1, label: '稳定的工作和生活' },
      { value: 3, label: '有一定自由度的职业' },
      { value: 5, label: '完全按自己的节奏生活' },
    ],
  },
  // 成长 (growth)
  {
    id: 'g1',
    dimension: 'growth',
    text: '面对失败时，你通常会？',
    options: [
      { value: 1, label: '感到沮丧，需要时间恢复' },
      { value: 3, label: '接受现实，总结经验' },
      { value: 5, label: '兴奋地分析原因，期待下次' },
    ],
  },
  {
    id: 'g2',
    dimension: 'growth',
    text: '你对学习新技能的态度是？',
    options: [
      { value: 1, label: '需要时才学，够用就好' },
      { value: 3, label: '保持学习习惯，稳步提升' },
      { value: 5, label: '热爱学习本身，享受突破的过程' },
    ],
  },
  // 贡献 (contribution)
  {
    id: 'co1',
    dimension: 'contribution',
    text: '什么样的工作最让你有成就感？',
    options: [
      { value: 1, label: '个人能力得到认可' },
      { value: 3, label: '团队一起完成了目标' },
      { value: 5, label: '我的工作对他人产生了积极影响' },
    ],
  },
  {
    id: 'co2',
    dimension: 'contribution',
    text: '你理想中的人生遗产是？',
    options: [
      { value: 1, label: '过好自己的一生就够了' },
      { value: 3, label: '希望被身边的人记住' },
      { value: 5, label: '希望为世界留下一些改变' },
    ],
  },
  // 和谐 (harmony)
  {
    id: 'h1',
    dimension: 'harmony',
    text: '你如何处理内心的冲突和矛盾？',
    options: [
      { value: 1, label: '压下去，专注于眼前的事' },
      { value: 3, label: '找人倾诉或写日记' },
      { value: 5, label: '静下来觉察，与之和平共处' },
    ],
  },
  {
    id: 'h2',
    dimension: 'harmony',
    text: '你更向往哪种生活状态？',
    options: [
      { value: 1, label: '充实忙碌，每天都有新挑战' },
      { value: 3, label: '忙闲有度，张弛有节' },
      { value: 5, label: '内心平静，与世界和谐共处' },
    ],
  },
  // 真实 (authenticity)
  {
    id: 'a1',
    dimension: 'authenticity',
    text: '在社交场合中，你通常会？',
    options: [
      { value: 1, label: '根据场合调整自己的表现' },
      { value: 3, label: '大部分时候做自己' },
      { value: 5, label: '始终忠于自己，不在意他人看法' },
    ],
  },
  {
    id: 'a2',
    dimension: 'authenticity',
    text: '当内心想法与主流观点不同时？',
    options: [
      { value: 1, label: '倾向于保持沉默' },
      { value: 3, label: '看情况决定是否表达' },
      { value: 5, label: '会真诚地表达自己的观点' },
    ],
  },
  // 心流 (flow)
  {
    id: 'fl1',
    dimension: 'flow',
    text: '你多久会体验到"忘记时间"的状态？',
    options: [
      { value: 1, label: '很少，大部分时间在应付任务' },
      { value: 3, label: '偶尔，做某些事情时会沉浸' },
      { value: 5, label: '经常，我知道什么能让我进入心流' },
    ],
  },
  {
    id: 'fl2',
    dimension: 'flow',
    text: '你更看重工作中的什么？',
    options: [
      { value: 1, label: '稳定的收入和保障' },
      { value: 3, label: '成长空间和发展前景' },
      { value: 5, label: '能让我全身心投入的热爱' },
    ],
  },
  // 游戏观 (gameview) — 有限思维 vs 无限思维
  {
    id: 'gv1',
    dimension: 'gameview',
    text: '你怎么看待人生中的"赢"？',
    options: [
      { value: 1, label: '达成明确的目标就是赢' },
      { value: 3, label: '赢不赢不重要，关键是有收获' },
      { value: 5, label: '没有终点，一直在路上就很好' },
    ],
  },
  {
    id: 'gv2',
    dimension: 'gameview',
    text: '面对竞争，你的第一反应是？',
    options: [
      { value: 1, label: '分析对手，制定策略去赢' },
      { value: 3, label: '做好自己，结果顺其自然' },
      { value: 5, label: '不太在意输赢，更关注自己是否在成长' },
    ],
  },
]
