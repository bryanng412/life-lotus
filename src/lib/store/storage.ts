import { getPlayerColors } from '@/lib/utils'
import { produce } from 'immer'
import { isArray, mergeWith } from 'lodash'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { StateStorage } from 'zustand/middleware'
import { BoundState, STORE_NAME } from './boundStore'

type PartialBoundState = { state: Partial<BoundState> }

const urlKeys: Array<keyof BoundState> = ['view', 'numPlayers', 'players']

const getSearchParams = () => {
  return new URL(location.href).searchParams
}

const validateColors = (state: PartialBoundState) =>
  produce(state, draftState => {
    const colors = getPlayerColors().map(({ value }) => value)
    draftState.state.playerColors ||= []
    draftState.state.numPlayers ||= 4

    while (draftState.state.playerColors.length < draftState.state.numPlayers) {
      draftState.state.playerColors.push(
        colors[draftState.state.playerColors.length]
      )
    }
  })

const mergeStorage = (local: PartialBoundState, params: PartialBoundState) =>
  mergeWith(local, params, (localValue, paramValue) => {
    if (isArray(localValue)) {
      return paramValue as PartialBoundState
    }
  })

export const persistentStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = getSearchParams()
    const localStorageItems = JSON.parse(
      localStorage.getItem(key) as string
    ) as string

    if (searchParams.size > 0) {
      const compressedSearchParams = searchParams.get(key) as string
      const searchParamsItems = decompressFromEncodedURIComponent(
        compressedSearchParams
      )

      if (localStorageItems !== 'null') {
        const parsedLocalStorage = JSON.parse(
          localStorageItems
        ) as PartialBoundState
        const parsedSearchParams = JSON.parse(
          searchParamsItems
        ) as PartialBoundState
        const mergedStorage = validateColors(
          mergeStorage(parsedLocalStorage, parsedSearchParams)
        )

        console.log({ parsedLocalStorage, parsedSearchParams, mergedStorage })
        return JSON.stringify(mergedStorage)
      }

      return JSON.stringify(
        validateColors(JSON.parse(searchParamsItems) as PartialBoundState)
      )
    } else {
      return localStorageItems
    }
  },
  setItem: (key, newValue): void => {
    localStorage.setItem(key, JSON.stringify(newValue))
  },
  removeItem: (key): void => {
    localStorage.removeItem(key)
  },
}

const buildURLSuffix = (params: BoundState, version = 0) => {
  const searchParams = new URLSearchParams()
  const state = Object.fromEntries(urlKeys.map(key => [key, params[key]]))

  const storeParams = {
    state,
    version,
  }
  const compressedParams = compressToEncodedURIComponent(
    JSON.stringify(storeParams)
  )

  searchParams.set(STORE_NAME, compressedParams)
  return searchParams.toString()
}

export const buildShareableUrl = (params: BoundState, version?: number) => {
  return `${window.location.origin}?${buildURLSuffix(params, version)}`
}
