import { createContext, use } from 'react'

export const PlayerBoxContext = createContext<{ id: number } | null>(null)

export const usePlayerBoxContext = () => use(PlayerBoxContext) || { id: 0 }
