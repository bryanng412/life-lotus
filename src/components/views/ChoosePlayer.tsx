import ChooseCircles from '@/components/ChooseCircles'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { useGesture } from '@use-gesture/react'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export type PlayerTouch = { id: number; x: number; y: number }

const ChoosePlayer = () => {
  const { setView, previousView, numPlayers } = useBoundStore()
  const [touches, setTouches] = useState<PlayerTouch[]>([])

  const bind = useGesture(
    {
      onTouchStart: ({ event }) => {
        const newTouches = Array.from(event.touches)
          .slice(0, numPlayers)
          .map(touch => ({
            id: touch.identifier,
            x: touch.clientX,
            y: touch.clientY,
          }))
        setTouches(newTouches)
      },
      onTouchMove: ({ event }) => {
        const updatedTouches = Array.from(event.touches)
          .slice(0, numPlayers)
          .map(touch => ({
            id: touch.identifier,
            x: touch.clientX,
            y: touch.clientY,
          }))

        setTouches(prevTouches =>
          prevTouches.map(t => updatedTouches.find(ut => ut.id === t.id) || t)
        )
      },
      onTouchEnd: ({ event }) => {
        if (event.touches.length === 0) {
          setTouches([])
          return
        }

        const liftedTouchIds = new Set(
          Array.from(event.changedTouches).map(t => t.identifier)
        )

        setTouches(prevTouches =>
          prevTouches.filter(t => !liftedTouchIds.has(t.id))
        )
      },
      onTouchCancel: () => {
        setTouches([])
      },
    },
    { eventOptions: { passive: false } } // Ensures full control over touch events
  )

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  const onSkipClick = () => {
    setView(View.LifeCounter)
  }

  return (
    <div className="bg-muted relative h-screen w-screen overflow-hidden">
      {touches.length === 0 && (
        <>
          <Button
            size="lg"
            onClick={onBackClick}
            className="bg-border text-muted-foreground hover:bg-muted absolute top-4 left-4 z-99 hover:opacity-90 active:scale-[.98]"
          >
            <ArrowLeft />
          </Button>
          <div className="absolute top-1/4 left-1/2 flex -translate-x-1/2 transform flex-col items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-bold">Choose a Player</h1>
            <p className="text-center">
              Each player holds a finger on the screen. After three seconds, one
              is chosen to go first!
            </p>
          </div>
          <Button
            size="lg"
            className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground absolute bottom-1/8 left-1/2 z-99 -translate-x-1/2 transform hover:opacity-90 active:scale-[.98]"
            onClick={onSkipClick}
          >
            Skip
          </Button>
        </>
      )}
      <div
        {...bind()}
        className="bg-muted absolute top-0 left-0 h-screen w-screen touch-none overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"
      />
      <ChooseCircles touches={touches} numPlayers={numPlayers} />
    </div>
  )
}

export default ChoosePlayer
