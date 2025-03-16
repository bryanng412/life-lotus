import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type OptionsSlice = {
  keepExtraCounters: boolean
  skipChoosePlayerView: boolean
  toggleKeepExtraCounters: () => void
  toggleSkipChoosePlayerView: () => void
}

export const createOptionsSlice: StateCreator<
  BoundState,
  [],
  [],
  OptionsSlice
> = set => ({
  keepExtraCounters: false,
  skipChoosePlayerView: false,
  toggleKeepExtraCounters: () =>
    set(({ keepExtraCounters }) => ({ keepExtraCounters: !keepExtraCounters })),
  toggleSkipChoosePlayerView: () =>
    set(({ skipChoosePlayerView }) => ({
      skipChoosePlayerView: !skipChoosePlayerView,
    })),
})
