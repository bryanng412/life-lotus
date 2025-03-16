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

export function getPlayerColors() {
  return [
    {
      name: 'Ocean',
      value: 'oklch(32.92% 0.0673 240.03)',
    },
    {
      name: 'Teal',
      value: 'oklch(63.74% 0.1083 208.47)',
    },
    {
      name: 'Powder',
      value: 'oklch(77.11% 0.0619 271.45)',
    },
    {
      name: 'Smoky Plum',
      value: 'oklch(54.36% 0.0452 335.6)',
    },
    {
      name: 'Raspberry',
      value: 'oklch(45.85% 0.1837 4.87)',
    },
    {
      name: 'Coral',
      value: 'oklch(65.23% 0.1147 15.86)',
    },
    {
      name: 'Pink Peach',
      value: 'oklch(86.97% 0.0702 15.33)',
    },
    {
      name: 'Tea Green',
      value: 'oklch(84.79% 0.0558 130.21)',
    },
  ]
}
