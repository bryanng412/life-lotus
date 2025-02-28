import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum View {
  GameSetup = 'GameSetup',
  LifeCounter = 'LifeCounter',
  ChoosePlayer = 'ChoosePlayer',
}

export type ViewSlice = {
  view: View
  previousView: View | null
  setView: (v: View) => void
}

export const createViewSlice: StateCreator<
  BoundState,
  [],
  [],
  ViewSlice
> = set => ({
  view: View.GameSetup,
  previousView: null,
  setView: v => set(({ view }) => ({ view: v, previousView: view })),
})
