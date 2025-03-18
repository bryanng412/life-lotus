import merge from 'lodash/merge'
import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createGameInfoSlice, GameInfoSlice } from './gameInfoSlice'
import { createOptionsSlice, OptionsSlice } from './optionsSlice'
import { createPlayersSlice, PlayersSlice } from './playersSlice'
import { persistentStorage } from './storage'
import { createViewSlice, ViewSlice } from './viewSlice'

export type BoundState = ViewSlice & GameInfoSlice & PlayersSlice & OptionsSlice

export const STORE_NAME = 'jeweled-lotus-store'

export const useBoundStoreBase = create<BoundState>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((...args) => ({
          ...createViewSlice(...args),
          ...createGameInfoSlice(...args),
          ...createPlayersSlice(...args),
          ...createOptionsSlice(...args),
        })),
        {
          name: STORE_NAME,
          merge: (persistedState, currentState) =>
            merge(currentState, persistedState),
          storage: createJSONStorage(() => persistentStorage),
          onRehydrateStorage: () => {
            return state => {
              if (state) {
                localStorage.setItem(
                  STORE_NAME,
                  JSON.stringify(JSON.stringify({ state }))
                )
              }
            }
          },
        }
      )
    )
  )
)

export const useBoundStore = createTrackedSelector(useBoundStoreBase)
