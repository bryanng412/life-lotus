import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum View {
  GameSetup = 'GameSetup',
  LifeCounter = 'LifeCounter',
  ChoosePlayer = 'ChoosePlayer',
}

export type ViewSlice = {
  view: View
  setView: (v: View) => void
}

export const createViewSlice: StateCreator<
  BoundState,
  [],
  [],
  ViewSlice
> = set => ({
  view: View.GameSetup,
  setView: v => set({ view: v }),
})
