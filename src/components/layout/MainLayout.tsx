import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { StepNavigator } from './StepNavigator'
import { OrganicBackground } from '../animations/OrganicBackground'

interface MainLayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  if (!showSidebar) {
    return (
      <>
        <OrganicBackground />
        <main className="relative z-10 min-h-screen flex items-center justify-center">
          {children}
        </main>
      </>
    )
  }

  return (
    <>
      <OrganicBackground />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-10">
            <StepNavigator />
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
