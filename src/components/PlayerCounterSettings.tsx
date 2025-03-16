import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'
import { X } from 'lucide-react'
import CounterIcon from './CounterIcon'

const icons = [
  CounterName.poison,
  CounterName.banana,
  CounterName.cherry,
  CounterName.grape,
  CounterName.beef,
  CounterName.cake,
  CounterName.pizza,
  CounterName.icecream,
]

const PlayerCounterSettings = ({ onClose }: { onClose: () => void }) => {
  const { id } = usePlayerBoxContext()
  const { players, addCounterToPlayer, removeCounterFromPlayer } =
    useBoundStore()
  const playerCounters = players.filter(p => p.id === id)[0].counters

  return (
    <div className="relative grid size-full grid-cols-4 grid-rows-2 gap-4 p-4 pt-8 pb-18 md:grid-rows-3 md:pt-16">
      {icons.map((counterName, i) => {
        const hasCounter = playerCounters.some(c => c.name === counterName)
        const onPressedChange = hasCounter
          ? () => removeCounterFromPlayer(id, counterName)
          : () => addCounterToPlayer(id, counterName)

        return (
          <Toggle
            key={i}
            pressed={hasCounter}
            onPressedChange={onPressedChange}
          >
            <CounterIcon counterName={counterName} className="size-full p-2" />
          </Toggle>
        )
      })}

      <Button
        className="bg-muted text-foreground hover:bg-primary-foreground absolute bottom-2 left-1/2 -translate-x-1/2 shadow-none"
        onClick={onClose}
      >
        <X />
      </Button>
    </div>
  )
}

export default PlayerCounterSettings
