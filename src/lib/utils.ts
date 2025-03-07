import { CounterName, Player } from '@/lib/store/playersSlice'
import { clsx, type ClassValue } from 'clsx'
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
