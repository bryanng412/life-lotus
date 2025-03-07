import LogoButton from '@/components/LogoButton'
import OptionsDialog from '@/components/OptionsDialog'
import PlayerBox from '@/components/PlayerBox'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn, getWritingModeStyles } from '@/lib/utils'

const LifeCounter = () => {
  const { players } = useBoundStore()
  const numPlayers = players.length

  const gridClassName = cn(
    'h-screen w-screen bg-muted grid gap-0.5 relative',
    numPlayers === 2 &&
      'grid-cols-1 grid-rows-2 [&>div:first-child]:rotate-180',
    numPlayers === 3 &&
      'grid-cols-2 grid-rows-3 [&>div:nth-child(-n+2)]:row-span-2 [&>div:last-child]:col-span-2',
    numPlayers === 4 && 'grid-cols-2 grid-rows-2',
    numPlayers === 5 && 'grid-cols-2 grid-rows-3 [&>div:last-child]:col-span-2',
    numPlayers === 6 && 'grid-cols-2 grid-rows-3'
  )
  const writingModeStyles = getWritingModeStyles(numPlayers)
  const logoButtonPlacement = numPlayers === 2 ? 'middle' : 'bottom-right'

  return (
    <div className={gridClassName}>
      {players.map(({ id }, i) => (
        <div key={id} className="relative">
          <PlayerBox id={id} playerBoxStyles={writingModeStyles[i]} />
          {((numPlayers === 2 && i === 1) || (numPlayers !== 2 && i === 0)) && (
            <OptionsDialog>
              <LogoButton placement={logoButtonPlacement} />
            </OptionsDialog>
          )}
        </div>
      ))}
    </div>
  )
}

export default LifeCounter
