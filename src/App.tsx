import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { PageTransition } from '@/components/animations/PageTransition'
import { Welcome } from '@/core/philosophy/Welcome'
import { PhilosophyIntro } from '@/core/philosophy/PhilosophyIntro'
import { ValueAssessment } from '@/core/philosophy/ValueAssessment'
import { ValueResult } from '@/core/philosophy/ValueResult'
import { StanfordDesign } from '@/methodology/frameworks/StanfordDesign'
import { DesignSummary } from '@/methodology/frameworks/DesignSummary'
import { TrendInsights } from '@/methodology/information/TrendInsights'
import { PathExplorer } from '@/methodology/guidance/PathExplorer'
import { IdentityResult } from '@/core/philosophy/IdentityResult'

function AppContent() {
  return (
    <Routes>
      {/* 启程 */}
      <Route path="/" element={
        <MainLayout showSidebar={false}>
          <PageTransition pageKey="welcome"><Welcome /></PageTransition>
        </MainLayout>
      } />

      {/* 道 — 认识自我 */}
      <Route path="/dao/philosophy" element={
        <MainLayout><PageTransition pageKey="philosophy"><PhilosophyIntro /></PageTransition></MainLayout>
      } />
      <Route path="/dao/assessment" element={
        <MainLayout><PageTransition pageKey="assessment"><ValueAssessment /></PageTransition></MainLayout>
      } />
      <Route path="/dao/result" element={
        <MainLayout><PageTransition pageKey="result"><ValueResult /></PageTransition></MainLayout>
      } />

      {/* 术 — 探索方向 */}
      <Route path="/shu/design" element={
        <MainLayout><PageTransition pageKey="design"><StanfordDesign /></PageTransition></MainLayout>
      } />
      <Route path="/shu/summary" element={
        <MainLayout><PageTransition pageKey="summary"><DesignSummary /></PageTransition></MainLayout>
      } />
      <Route path="/shu/trends" element={
        <MainLayout><PageTransition pageKey="trends"><TrendInsights /></PageTransition></MainLayout>
      } />
      <Route path="/shu/paths" element={
        <MainLayout><PageTransition pageKey="paths"><PathExplorer /></PageTransition></MainLayout>
      } />

      {/* 结果 — AI 身份 */}
      <Route path="/result/identity" element={
        <MainLayout><PageTransition pageKey="identity"><IdentityResult /></PageTransition></MainLayout>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
