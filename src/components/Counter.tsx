import CounterIcon from '@/components/CounterIcon'
import { useLongPress } from '@/lib/hooks/useLongPress'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'
import { cn } from '@/lib/utils'

const Counter = ({ name, value }: { name: CounterName; value: number }) => {
  const { updatePlayerCounter, numPlayers } = useBoundStore()
  const { id } = usePlayerBoxContext()

  const incrementProps = useLongPress({
    onPress: () => updatePlayerCounter(id, name, 1),
    onLongPress: () => updatePlayerCounter(id, name, 10),
  })

  const decrementProps = useLongPress({
    onPress: () => updatePlayerCounter(id, name, -1),
    onLongPress: () => updatePlayerCounter(id, name, -10),
  })

  return (
    <div className="relative flex size-full flex-col items-center justify-center not-first:border-l-1 md:justify-evenly">
      <p className={cn('text-7xl md:text-9xl', numPlayers === 2 && 'text-9xl')}>
        {value}
      </p>
      <CounterIcon className="mt-4 md:mt-0" counterName={name} />
      <div className="absolute flex size-full flex-col">
        <button
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            incrementProps.isPressed && 'opacity-8'
          )}
          {...incrementProps}
        />
        <button
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            decrementProps.isPressed && 'opacity-8'
          )}
          {...decrementProps}
        />
      </div>
    </div>
  )
}

export default Counter
