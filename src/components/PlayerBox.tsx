import Counter from '@/components/Counter'
import PlayerSettings from '@/components/PlayerSettings'
import { PlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn } from '@/lib/utils'
import { Settings2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useCallback, useRef, useState } from 'react'

const PlayerBox = ({
  id,
  playerBoxClassName,
}: {
  id: number
  playerBoxClassName: string
}) => {
  const [showCounters, setShowCounters] = useState(true)
  const { players, playerColors } = useBoundStore()
  const player = players.filter(p => p.id === id)[0]
  const className = cn(
    playerBoxClassName,
    'bg-primary-foreground rounded-md border-2'
  )
  const motionDivRef = useRef<HTMLDivElement>(null)

  const hideSettings = useCallback(() => setShowCounters(true), [])
  const openSettings = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowCounters(false)
  }, [])

  return (
    <PlayerBoxContext value={{ id }}>
      <div className={className}>
        <PlayerSettings hideSettings={hideSettings} />
        <AnimatePresence initial={false}>
          {showCounters && (
            <motion.div
              className="no-scrollbar absolute flex size-full overflow-x-scroll rounded-md"
              style={{ backgroundColor: playerColors[id] }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween' }}
              ref={motionDivRef}
            >
              {player.counters.map(({ name, value }, i) => (
                <Counter
                  key={`${name}-${i}`}
                  name={name}
                  value={value}
                  containerRef={motionDivRef}
                />
              ))}
              <button
                onClick={openSettings}
                className="text-foreground absolute bottom-1 left-1 cursor-pointer rounded-md p-2 active:scale-[.98]"
              >
                <Settings2 size={30} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PlayerBoxContext>
  )
}

export default PlayerBox
