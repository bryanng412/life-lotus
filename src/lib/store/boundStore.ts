import merge from 'lodash/merge'
import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createViewSlice, ViewSlice } from './viewSlice'

export type BoundState = ViewSlice

export const useBoundStoreBase = create<BoundState>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((...args) => ({
          ...createViewSlice(...args),
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
