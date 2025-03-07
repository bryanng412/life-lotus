import Counter from '@/components/Counter'
import { useBoundStore } from '@/lib/store/boundStore'
import { CSSProperties } from 'react'

const PlayerBox = ({
  id,
  playerBoxStyles,
}: {
  id: number
  playerBoxStyles: CSSProperties
}) => {
  const { players } = useBoundStore()
  const player = players.filter(p => p.id === id)[0]

  return (
    <div
      className="bg-primary-foreground flex size-full rounded-md"
      style={playerBoxStyles}
    >
      {player.counters.map(({ name, value }, i) => (
        <Counter key={i} id={id} name={name} value={value} />
      ))}
    </div>
  )
}

export default PlayerBox
