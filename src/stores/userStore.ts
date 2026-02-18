import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, ValueAssessment, ValueDimensions } from '@/types/user.types'

interface UserState {
  profile: UserProfile | null
  valueAssessment: ValueAssessment | null
  setProfile: (name: string) => void
  setValueAssessment: (dimensions: ValueDimensions, insights: string[]) => void
  reset: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      valueAssessment: null,

      setProfile: (name) =>
        set({
          profile: {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          },
        }),

      setValueAssessment: (dimensions, insights) =>
        set({
          valueAssessment: {
            dimensions,
            completedAt: new Date().toISOString(),
            insights,
          },
        }),

      reset: () => set({ profile: null, valueAssessment: null }),
    }),
    { name: 'life-compass-user' }
  )
)
