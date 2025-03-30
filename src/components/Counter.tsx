import CounterIcon from '@/components/CounterIcon'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'
import { cn } from '@/lib/utils'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { useInterval } from 'react-interval-hook'

const LONG_PRESS_DURATION = 550

const Counter = ({ name, value }: { name: CounterName; value: number }) => {
  const [incButtonActive, setIncButtonActive] = useState(false)
  const [decButtonActive, setDecButtonActive] = useState(false)
  const { updatePlayerCounter, numPlayers } = useBoundStore()
  const { id } = usePlayerBoxContext()
  const { start: incStart, stop: incStop } = useInterval(
    () => updatePlayerCounter(id, name, 10),
    LONG_PRESS_DURATION,
    {
      autoStart: false,
    }
  )
  const { start: decStart, stop: decStop } = useInterval(
    () => updatePlayerCounter(id, name, -10),
    LONG_PRESS_DURATION,
    {
      autoStart: false,
    }
  )

  const incrementBind = useDrag(({ first, last, canceled, elapsedTime }) => {
    if (first) {
      setIncButtonActive(() => true)
      incStart()
    }

    if (last || canceled) {
      if (elapsedTime < LONG_PRESS_DURATION) {
        updatePlayerCounter(id, name, 1)
      }
      incStop()
      setIncButtonActive(() => false)
    }
  })

  const decrementBind = useDrag(({ first, last, canceled, elapsedTime }) => {
    if (first) {
      setDecButtonActive(() => true)
      decStart()
    }

    if (last || canceled) {
      if (elapsedTime < LONG_PRESS_DURATION) {
        updatePlayerCounter(id, name, -1)
      }
      decStop()
      setDecButtonActive(() => false)
    }
  })

  return (
    <div className="relative flex size-full flex-col items-center justify-center not-first:border-l-1 md:justify-evenly">
      <p className={cn('text-7xl md:text-9xl', numPlayers === 2 && 'text-9xl')}>
        {value}
      </p>
      <CounterIcon className="mt-4 md:mt-0 md:size-10" counterName={name} />
      <div className="absolute flex size-full flex-col">
        <button
          {...incrementBind()}
          className={cn(
            'bg-primary size-full cursor-pointer touch-none opacity-0',
            incButtonActive && 'opacity-8'
          )}
        />
        <button
          {...decrementBind()}
          className={cn(
            'bg-primary size-full cursor-pointer touch-none opacity-0',
            decButtonActive && 'opacity-8'
          )}
        />
      </div>
    </div>
  )
}

export default Counter
