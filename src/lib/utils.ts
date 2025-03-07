import { CounterName, Player } from '@/lib/store/playersSlice'
import { clsx, type ClassValue } from 'clsx'
import { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlayer(players: Player[], id: number) {
  const index = players.findIndex(p => p.id === id)
  return index !== -1 ? players[index] : null
}

export function getCountersAndIndex(
  players: Player[],
  id: number,
  counterName: CounterName
) {
  const player = getPlayer(players, id)
  if (!player)
    return {
      counters: null,
      index: -1,
    }

  return {
    counters: player.counters,
    index: player.counters.findIndex(c => c.name === counterName),
  }
}

type WritingModeStyles = { [childIndex: number]: CSSProperties }

export function getWritingModeStyles(numPlayers: number): WritingModeStyles {
  if (numPlayers === 3) {
    return {
      0: { writingMode: 'sideways-rl' },
      1: { writingMode: 'sideways-lr' },
    }
  } else if (numPlayers === 4) {
    return {
      0: { writingMode: 'sideways-rl' },
      1: { writingMode: 'sideways-lr' },
      2: { writingMode: 'sideways-rl' },
      3: { writingMode: 'sideways-lr' },
    }
  } else if (numPlayers === 5) {
    return {
      0: { writingMode: 'sideways-rl' },
      1: { writingMode: 'sideways-lr' },
      2: { writingMode: 'sideways-rl' },
      3: { writingMode: 'sideways-lr' },
    }
  } else if (numPlayers === 6) {
    return {
      0: { writingMode: 'sideways-rl' },
      1: { writingMode: 'sideways-lr' },
      2: { writingMode: 'sideways-rl' },
      3: { writingMode: 'sideways-lr' },
      4: { writingMode: 'sideways-rl' },
      5: { writingMode: 'sideways-lr' },
    }
  }
  return {}
}
