import CounterIcon from '@/components/CounterIcon'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useInterval } from 'react-interval-hook'
import { useLongPress } from 'use-long-press'

const LONGPRESS_INTERVAL = 600

const Counter = ({ name, value }: { name: CounterName; value: number }) => {
  const { updatePlayerCounter } = useBoundStore()
  const { id } = usePlayerBoxContext()
  const [incButtonActive, setIncButtonActive] = useState(false)
  const [decButtonActive, setDecButtonActive] = useState(false)
  const { start: incIntervalStart, stop: incIntervalStop } = useInterval(
    () => updatePlayerCounter(id, name, 10),
    LONGPRESS_INTERVAL,
    {
      autoStart: false,
    }
  )
  const { start: decIntervalStart, stop: decIntervalStop } = useInterval(
    () => updatePlayerCounter(id, name, -10),
    LONGPRESS_INTERVAL,
    {
      autoStart: false,
    }
  )

  const addBind = useLongPress(incIntervalStart, {
    threshold: LONGPRESS_INTERVAL,
    onStart: () => setIncButtonActive(true),
    onFinish: () => {
      incIntervalStop()
      setIncButtonActive(false)
    },
    onCancel: () => {
      updatePlayerCounter(id, name, 1)
      incIntervalStop()
      setIncButtonActive(false)
    },
    cancelOnMovement: false,
    cancelOutsideElement: false,
  })
  const subtractBind = useLongPress(decIntervalStart, {
    threshold: LONGPRESS_INTERVAL,
    onStart: () => setDecButtonActive(true),
    onFinish: () => {
      decIntervalStop()
      setDecButtonActive(false)
    },
    onCancel: () => {
      updatePlayerCounter(id, name, -1)
      decIntervalStop()
      setDecButtonActive(false)
    },
    cancelOnMovement: false,
    cancelOutsideElement: false,
  })

  return (
    <div className="relative flex size-full flex-col items-center justify-evenly border-1">
      <p className="text-7xl select-none">{value}</p>
      <CounterIcon counterName={name} />
      <div className="absolute flex size-full flex-col">
        <button
          {...addBind()}
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            incButtonActive && 'opacity-5'
          )}
        />
        <button
          {...subtractBind()}
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            decButtonActive && 'opacity-5'
          )}
        />
      </div>
    </div>
  )
}

export default Counter
