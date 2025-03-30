import CounterIcon from '@/components/CounterIcon'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'
import { cn } from '@/lib/utils'

const Counter = ({ name, value }: { name: CounterName; value: number }) => {
  const { updatePlayerCounter, numPlayers } = useBoundStore()
  const { id } = usePlayerBoxContext()
  const increment = () => updatePlayerCounter(id, name, 1)
  const decrement = () => updatePlayerCounter(id, name, -1)

  return (
    <div className="relative flex size-full flex-col items-center justify-center not-first:border-l-1 md:justify-evenly">
      <p className={cn('text-7xl md:text-9xl', numPlayers === 2 && 'text-9xl')}>
        {value}
      </p>
      <CounterIcon className="mt-4 md:mt-0" counterName={name} />
      <div className="absolute flex size-full flex-col">
        <button
          onClick={increment}
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            'active:opacity-8'
          )}
        />
        <button
          onClick={decrement}
          className={cn(
            'bg-primary size-full cursor-pointer opacity-0',
            'active:opacity-8'
          )}
        />
      </div>
    </div>
  )
}

export default Counter
