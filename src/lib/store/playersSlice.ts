import { getCountersAndIndex, getPlayer, getPlayerColors } from '@/lib/utils'
import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum CounterName {
  life = 'life',
  poison = 'poison',
  banana = 'banana',
  cherry = 'cherry',
  grape = 'grape',
  cake = 'cake',
  beef = 'beef',
  pizza = 'pizza',
  icecream = 'icecream',
}

export type Counter = {
  name: CounterName
  value: number
}

export type Player = {
  id: number
  color: string
  counters: Counter[]
}

export type PlayersSlice = {
  players: Player[]
  setPlayers: (numPlayers: number) => void
  addCounterToPlayer: (id: number, counterName: CounterName) => void
  removeCounterFromPlayer: (id: number, counterName: CounterName) => void
  updatePlayerCounter: (
    playerId: number,
    counterName: CounterName,
    change: 1 | 10 | -1 | -10
  ) => void
  resetCounters: (options?: { keepExtraCounters: boolean }) => void
  updatePlayerColor: (id: number, color: string) => void
}

export const createPlayersSlice: StateCreator<
  BoundState,
  [],
  [],
  PlayersSlice
> = (set, get) => ({
  players: [],
  setPlayers: numPlayers =>
    set({
      players: [...Array(numPlayers).keys()].map(id => ({
        id,
        color: getPlayerColors()[id].value,
        counters: [
          {
            name: CounterName.life,
            value: get().startingLife,
          },
        ],
      })),
    }),
  addCounterToPlayer: (id, counterName) => {
    const newCounter: Counter = {
      name: counterName,
      value: 0,
    }

    set(state => {
      const player = getPlayer(state.players, id)
      const playerHasCounter = player?.counters.some(
        c => c.name === counterName
      )

      if (player && !playerHasCounter) {
        player.counters.push(newCounter)
      }
      return state
    })
  },
  removeCounterFromPlayer: (id, counterName) => {
    set(state => {
      const { counters, index } = getCountersAndIndex(
        state.players,
        id,
        counterName
      )
      if (counters && index >= 0) {
        counters.splice(index, 1)
      }

      return state
    })
  },
  updatePlayerCounter: (id, counterName, change) => {
    set(state => {
      const { counters, index } = getCountersAndIndex(
        state.players,
        id,
        counterName
      )
      if (counters && index >= 0) {
        counters[index].value += change
      }

      return state
    })
  },
  resetCounters: ({ keepExtraCounters } = { keepExtraCounters: false }) => {
    const startingLife = get().startingLife
    set(state => {
      state.players.forEach(p => {
        if (!keepExtraCounters) {
          p.counters = [
            {
              name: CounterName.life,
              value: startingLife,
            },
          ]
        } else {
          p.counters.forEach(c => {
            if (c.name === CounterName.life) {
              c.value = startingLife
            } else {
              c.value = 0
            }
          })
        }
      })

      return state
    })
  },
  updatePlayerColor: (id, color) =>
    set(state => {
      const player = getPlayer(state.players, id)
      if (player) {
        player.color = color
      }

      return state
    }),
})
