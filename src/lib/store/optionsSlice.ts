import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type OptionsSlice = {
  keepExtraCounters: boolean
  choosePlayerOnReset: boolean
  skipChoosePlayerView: boolean
  toggleKeepExtraCounters: () => void
  toggleChoosePlayerOnReset: () => void
  toggleSkipChoosePlayerView: () => void
}

export const createOptionsSlice: StateCreator<
  BoundState,
  [],
  [],
  OptionsSlice
> = set => ({
  keepExtraCounters: false,
  choosePlayerOnReset: true,
  skipChoosePlayerView: false,
  toggleKeepExtraCounters: () =>
    set(({ keepExtraCounters }) => ({ keepExtraCounters: !keepExtraCounters })),
  toggleChoosePlayerOnReset: () =>
    set(({ choosePlayerOnReset }) => ({
      choosePlayerOnReset: !choosePlayerOnReset,
    })),
  toggleSkipChoosePlayerView: () =>
    set(({ skipChoosePlayerView }) => ({
      skipChoosePlayerView: !skipChoosePlayerView,
    })),
})
