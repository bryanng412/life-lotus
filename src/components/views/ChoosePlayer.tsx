import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { throttle } from 'lodash'
import { ArrowLeft, Circle } from 'lucide-react'
import React, { Touch, useState } from 'react'
import { Button } from '../ui/button'

const ChoosePlayer = () => {
  const { setView, previousView } = useBoundStore()
  const [touchPoints, setTouchPoints] = useState<Touch[]>([])

  const handleTouch: React.TouchEventHandler = event => {
    event.preventDefault()
    // const sharedTouchPoints = Array.from(event.touches).filter(t =>
    //   touchPoints.some(({ identifier }) => t.identifier === identifier)
    // )
    // const uniqueTouchPoints = Array.from(event.touches).filter(
    //   t => !touchPoints.some(({ identifier }) => t.identifier === identifier)
    // )
    // const newTouchPoints = [...sharedTouchPoints, ...uniqueTouchPoints].slice(
    //   0,
    //   numPlayers
    // )

    // setTouchPoints(newTouchPoints)
    setTouchPoints(Array.from(event.touches))
  }
  const throttledHandleTouch = throttle(handleTouch, 100)

  const handleTouchCancel: React.TouchEventHandler = () => {
    setTouchPoints([])
  }

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  return (
    <div className="bg-muted relative h-screen w-screen">
      <div
        onTouchStart={throttledHandleTouch}
        onTouchMove={throttledHandleTouch}
        onTouchEnd={throttledHandleTouch}
        onTouchCancel={handleTouchCancel}
        className="bg-muted absolute top-0 left-0 h-screen w-screen bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"
      />
      {touchPoints.map((touch, i) => (
        <Circle
          key={`circle-${i}`}
          size={80}
          className="absolute -translate-x-[40px] -translate-y-[40px] transform"
          style={{
            top: `${Math.round(touch.clientY)}px`,
            left: `${Math.round(touch.clientX)}px`,
          }}
        />
      ))}
      <p>Active touch points</p>
      {touchPoints.map((touch, i) => (
        <div key={i}>
          ID: {touch.identifier}, X: {touch.clientX}, Y: {touch.clientY}
        </div>
      ))}
      {touchPoints.length === 0 && (
        <>
          <Button
            size="lg"
            onClick={onBackClick}
            className="bg-border [&>svg]:stroke-muted-foreground hover:bg-muted absolute top-4 left-4 hover:opacity-90 active:scale-[.98]"
          >
            <ArrowLeft />
          </Button>
          <div className="absolute top-1/4 left-1/2 flex -translate-x-1/2 transform flex-col items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-bold select-none">
              Choose a Player
            </h1>
            <p className="text-center select-none">
              Each player holds a finger on the screen. After three seconds, one
              is chosen to go first!
            </p>
            <div className="align-center flex justify-center gap-2">
              <Button
                size="lg"
                className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground select-none hover:opacity-90 active:scale-[.98]"
              >
                Skip
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChoosePlayer
