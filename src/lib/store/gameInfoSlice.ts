import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type StartingLife = 20 | 30 | 40
export type NumPlayers = 2 | 3 | 4 | 5 | 6

export type GameInfoSlice = {
  startingLife: StartingLife
  numPlayers: NumPlayers
  setStartingLife: (life: StartingLife) => void
  setNumPlayers: (n: NumPlayers) => void
}

export const createGameInfoSlice: StateCreator<
  BoundState,
  [],
  [],
  GameInfoSlice
> = set => ({
  startingLife: 40,
  numPlayers: 4,
  setStartingLife: life => set({ startingLife: life }),
  setNumPlayers: n => set({ numPlayers: n }),
})
