import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JourneyPhase, JourneyStep, Insight } from '@/types/journey.types'

interface JourneyState {
  currentPhase: JourneyPhase
  currentStep: JourneyStep | null
  completedSteps: JourneyStep[]
  insights: Insight[]
  startedAt: string | null

  setPhase: (phase: JourneyPhase) => void
  setStep: (step: JourneyStep) => void
  completeStep: (step: JourneyStep) => void
  addInsight: (content: string, phase: JourneyPhase, step: JourneyStep) => void
  reset: () => void
}

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      currentPhase: 'welcome',
      currentStep: null,
      completedSteps: [],
      insights: [],
      startedAt: null,

      setPhase: (phase) =>
        set((state) => ({
          currentPhase: phase,
          startedAt: state.startedAt || new Date().toISOString(),
        })),

      setStep: (step) => set({ currentStep: step }),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      addInsight: (content, phase, step) =>
        set((state) => ({
          insights: [
            ...state.insights,
            {
              id: crypto.randomUUID(),
              content,
              phase,
              step,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      reset: () =>
        set({
          currentPhase: 'welcome',
          currentStep: null,
          completedSteps: [],
          insights: [],
          startedAt: null,
        }),
    }),
    { name: 'life-compass-journey' }
  )
)
