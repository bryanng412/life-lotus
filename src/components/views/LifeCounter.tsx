import LogoButton from '@/components/LogoButton'
import OptionsDialog from '@/components/OptionsDialog'
import PlayerBox from '@/components/PlayerBox'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn } from '@/lib/utils'

const LifeCounter = () => {
  const { players } = useBoundStore()
  const numPlayers = players.length

  const logoButtonPlacement = numPlayers === 2 ? 'middle' : 'bottom-right'
  const logoButtonClassName = numPlayers === 2 ? '' : 'rotate-90'

  const relativeWrapperClassName = cn(
    'relative',
    // rotate first box 180 degrees
    numPlayers === 2 && 'w-full first:[&>:first-child]:rotate-180',

    // rotate odd boxes 90 degrees, even boxes -90 degrees
    numPlayers === 3 && 'w-1/2 odd:[&>:first-child]:rotate-90 even:-rotate-90',
    // second box is rotated, make width 100% height.
    numPlayers === 3 &&
      '[&:nth-child(2)]:[&>:first-child]:w-[100vh] [&:nth-child(2)]:[&>:first-child]:-translate-x-3/4 ',

    // make all boxes 50% width, rotate odd boxes 90 degrees, rotate even boxes -90 degrees
    (numPlayers === 4 || numPlayers === 6) &&
      'w-1/2 odd:[&>:first-child]:rotate-90 even:[&>:first-child]:-rotate-90',

    // rotate first and third box 90 degrees, second and fourth box -90 degrees
    // don't rotate last box, make it full width and 33% height
    numPlayers === 5 &&
      'w-1/2 first:[&>:first-child]:rotate-90 [&:nth-child(3)]:[&>:first-child]:rotate-90 even:[&>:first-child]:-rotate-90',
    numPlayers === 5 &&
      'last:w-full last:[&>:first-child]:w-[100vw] last:[&>:first-child]:h-[33vh]'
  )
  const absoluteWrapperClassName = cn(
    'absolute flex justify-evenly items-center',
    // make both boxes 50% height, 100% width
    numPlayers === 2 && 'h-[50vh] w-[100vw]',

    // first and third boxes are rotated, so make width 50% height and height 50% width
    // second box is handled in the relative wrapper
    numPlayers === 3 &&
      'w-[50vh] h-[50vw] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2',

    // all boxes are rotated, so make width 50% height and height 50% width
    (numPlayers === 4 || numPlayers === 6) &&
      'top-[50%] left-[50%] h-[50vw] w-[50vh] -translate-x-1/2 -translate-y-1/2',

    // first 4 boxes are rotated, so make width 33.5% height and height 50% width
    // last box is handled in the relative wrapper
    numPlayers === 5 &&
      'top-[50%] left-[50%] h-[50vw] w-[33.5vh] -translate-x-1/2 -translate-y-1/2',

    // override width to be 33% of height
    numPlayers === 6 && 'w-[33.33vh]'
  )

  return (
    <div className="bg-muted flex h-screen w-screen flex-wrap overflow-hidden">
      {players.map(({ id }, i) => (
        <div key={id} className={relativeWrapperClassName}>
          <PlayerBox id={id} playerBoxClassName={absoluteWrapperClassName} />
          {((numPlayers === 2 && i === 1) || (numPlayers !== 2 && i === 0)) && (
            <OptionsDialog>
              <LogoButton
                placement={logoButtonPlacement}
                className={logoButtonClassName}
              />
            </OptionsDialog>
          )}
        </div>
      ))}
    </div>
  )
}

export default LifeCounter
