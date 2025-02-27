import merge from 'lodash/merge'
import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createGameInfoSlice, GameInfoSlice } from './gameInfoSlice'
import { createPlayersSlice, PlayersSlice } from './playersSlice'
import { createViewSlice, ViewSlice } from './viewSlice'

export type BoundState = ViewSlice & GameInfoSlice & PlayersSlice

export const useBoundStoreBase = create<BoundState>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((...args) => ({
          ...createViewSlice(...args),
          ...createGameInfoSlice(...args),
          ...createPlayersSlice(...args),
        })),
        {
          name: 'jeweled-lotus-store',
          merge: (persistedState, currentState) =>
            merge(currentState, persistedState),
        }
      )
    )
  )
)

export const useBoundStore = createTrackedSelector(useBoundStoreBase)
