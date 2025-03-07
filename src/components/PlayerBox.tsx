import Counter from '@/components/Counter'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn } from '@/lib/utils'

const PlayerBox = ({
  id,
  playerBoxClassName,
}: {
  id: number
  playerBoxClassName: string
}) => {
  const { players } = useBoundStore()
  const player = players.filter(p => p.id === id)[0]
  const className = cn(playerBoxClassName, 'bg-primary-foreground rounded-md')

  return (
    <div className={className}>
      {player.counters.map(({ name, value }, i) => (
        <Counter key={i} id={id} name={name} value={value} />
      ))}
    </div>
  )
}

export default PlayerBox
