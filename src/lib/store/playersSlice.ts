import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum CounterName {
  life = 'life',
  poison = 'poison',
}

export type Counter = {
  name: CounterName
  value: number
}

export type Player = {
  id: number
  counters: Counter[]
}

export type PlayersSlice = {
  players: Player[]
  addPlayer: () => void
  addCounterToPlayer: (playerId: number, counterName: CounterName) => void
  removeCounterFromPlayer: (playerId: number, counterName: CounterName) => void
  //increment counter
  //decrement counter
  //reset counters
}

export const createPlayersSlice: StateCreator<
  BoundState,
  [],
  [],
  PlayersSlice
> = (set, get) => ({
  players: [],
  addPlayer: () => {
    const id = get().players.length
    const startingLife = get().startingLife

    const newPlayer: Player = {
      id,
      counters: [
        {
          name: CounterName.life,
          value: startingLife,
        },
      ],
    }

    set(state => {
      state.players.push(newPlayer)
      return state
    })
  },
  addCounterToPlayer: (playerId, counterName) => {
    const newCounter: Counter = {
      name: counterName,
      value: 0,
    }

    set(state => {
      const index = state.players.findIndex(p => p.id === playerId)
      if (index !== -1) state.players[index].counters.push(newCounter)

      return state
    })
  },
  removeCounterFromPlayer: (id, counterName) => {
    set(state => {
      const playerIndex = state.players.findIndex(p => p.id === id)
      if (playerIndex !== -1) {
        const counterIndex = state.players[playerIndex].counters.findIndex(
          c => c.name === counterName
        )
        if (counterIndex !== -1) {
          state.players[playerIndex].counters.splice(counterIndex, 1)
        }
      }

      return state
    })
  },
})
