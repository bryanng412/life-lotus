import Counter from '@/components/Counter'
import PlayerSettings from '@/components/PlayerSettings'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn } from '@/lib/utils'
import { Settings2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useCallback, useState } from 'react'

const PlayerBox = ({
  id,
  playerBoxClassName,
}: {
  id: number
  playerBoxClassName: string
}) => {
  const [showCounters, setShowCounters] = useState(true)
  const { players } = useBoundStore()
  const player = players.filter(p => p.id === id)[0]
  const className = cn(playerBoxClassName, 'bg-primary-foreground rounded-md')

  const hideSettings = useCallback(() => setShowCounters(true), [])
  const openSettings = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowCounters(false)
  }, [])

  return (
    <div className={className}>
      <PlayerSettings hideSettings={hideSettings} />
      <AnimatePresence initial={false}>
        {showCounters && (
          <motion.div
            className="bg-primary-foreground absolute size-full"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween' }}
          >
            {player.counters.map(({ name, value }, i) => (
              <Counter key={i} id={id} name={name} value={value} />
            ))}
            <button
              onClick={openSettings}
              className="bg-primary-foreground text-muted-foreground hover:bg-muted active:bg-muted absolute bottom-2 left-2 cursor-pointer rounded-md p-2 active:scale-[.98]"
            >
              <Settings2 size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlayerBox
