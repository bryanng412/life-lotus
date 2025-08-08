import LogoButton from '@/components/LogoButton'
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

    // rotate first box 90 degrees, second box -90 degrees
    numPlayers === 3 &&
      'w-1/2 first:[&>:first-child]:rotate-90 even:[&>:first-child]:-rotate-90',
    // make last box full width and 50% height
    numPlayers === 3 &&
      'last:w-full last:[&>:first-child]:w-[100vw] last:[&>:first-child]:[height:50dvh]',

    // make all boxes 50% width, rotate odd boxes 90 degrees, rotate even boxes -90 degrees
    (numPlayers === 4 || numPlayers === 6) &&
      'w-1/2 odd:[&>:first-child]:rotate-90 even:[&>:first-child]:-rotate-90',

    // rotate first and third box 90 degrees, second and fourth box -90 degrees
    // don't rotate last box, make it full width and 33% height
    numPlayers === 5 &&
      'w-1/2 first:[&>:first-child]:rotate-90 [&:nth-child(3)]:[&>:first-child]:rotate-90 even:[&>:first-child]:-rotate-90',
    numPlayers === 5 &&
      'last:w-full last:[&>:first-child]:w-[100vw] last:[&>:first-child]:[height:33dvh]'
  )
  const absoluteWrapperClassName = cn(
    'absolute flex justify-evenly items-center',
    // make both boxes 50% height, 100% width
    numPlayers === 2 && '[height:50dvh] w-[100vw]',

    // first and second boxes are rotated, so make width 50% height and height 50% width
    // third box is handled in the relative wrapper
    numPlayers === 3 &&
      'top-[50%] left-[50%] h-[50vw] [width:50dvh] -translate-x-1/2 -translate-y-1/2',

    // all boxes are rotated, so make width 50% height and height 50% width
    (numPlayers === 4 || numPlayers === 6) &&
      'top-[50%] left-[50%] h-[50vw] [width:50dvh] -translate-x-1/2 -translate-y-1/2',

    // first 4 boxes are rotated, so make width 33.5% height and height 50% width
    // last box is handled in the relative wrapper
    numPlayers === 5 &&
      'top-[50%] left-[50%] h-[50vw] [width:33.5dvh] -translate-x-1/2 -translate-y-1/2',

    // override width to be 33% of height
    numPlayers === 6 && '[width:33.33dvh]'
  )

  return (
    <div className="bg-muted flex h-dvh w-screen flex-wrap overflow-hidden">
      {players.map(({ id }, i) => (
        <div key={id} className={relativeWrapperClassName}>
          <PlayerBox id={id} playerBoxClassName={absoluteWrapperClassName} />
          {((numPlayers === 2 && i === 1) || (numPlayers !== 2 && i === 0)) && (
            <LogoButton
              placement={logoButtonPlacement}
              className={logoButtonClassName}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default LifeCounter
