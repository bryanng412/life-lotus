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
      value: 'oklch(54.3% 0.0917 207.64)',
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
      value: 'oklch(40.63% 0.162 4.7)',
    },
    {
      name: 'Coral',
      value: 'oklch(65.23% 0.1147 15.86)',
    },
    {
      name: 'Pink Peach',
      value: 'oklch(91.74% 0.0425 16.16)',
    },
    {
      name: 'Tea Green',
      value: 'oklch(86.27% 0.0498 130.23)',
    },
  ]
}
