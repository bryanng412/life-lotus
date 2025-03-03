import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { copyTouch, ongoingTouchIndexById } from '@/lib/utils'
import { ArrowLeft, Circle } from 'lucide-react'
import { TouchEventHandler, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

const CircleColors = [
  'oklch(0.646 0.222 41.116)',
  'oklch(0.6 0.118 184.704)',
  'oklch(0.398 0.07 227.392)',
  'oklch(0.828 0.189 84.429)',
  'oklch(0.769 0.188 70.08)',
  'oklch(0.627 0.265 303.9)',
]

const CircleRadius = 50

const ChoosePlayer = () => {
  const { setView, previousView } = useBoundStore()
  const [showCopy, setShowCopy] = useState(true)
  // const touchPoints = useRef<ReturnType<typeof copyTouch>[]>([])
  const [touchPoints, setTouchPoints] = useState<
    ReturnType<typeof copyTouch>[]
  >([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleStart: TouchEventHandler = event => {
    setShowCopy(() => false)
    // if (!canvasRef.current) return
    // const canvas = canvasRef.current

    // const ctx = canvas.getContext('2d')
    // if (!ctx) return

    const touches = event.changedTouches
    // for (let i = 0; i < touches.length; i++) {
    //   touchPoints.current.push(copyTouch(touches[i]))
    // }
    setTouchPoints(Array.from(touches).map(copyTouch))
  }

  const handleMove: TouchEventHandler = event => {
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const index = ongoingTouchIndexById(touchPoints, touches[i].identifier)

      if (index >= 0) {
        setTouchPoints(oldTouchPoints => {
          const oldTouchPointsCopy = oldTouchPoints.slice()
          oldTouchPointsCopy.splice(index, 1, copyTouch(touches[i]))
          return oldTouchPointsCopy
        })
      }
    }
  }

  const handleEnd: TouchEventHandler = event => {
    event.preventDefault()
    setShowCopy(() => true)

    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const index = ongoingTouchIndexById(touchPoints, touches[i].identifier)

      if (index >= 0) {
        setTouchPoints(oldTouchPoints => {
          const oldTouchPointsCopy = oldTouchPoints.slice()
          oldTouchPointsCopy.splice(index, 1)
          return oldTouchPointsCopy
        })
      }
    }
  }

  const handleCancel: TouchEventHandler = event => {
    event.preventDefault()
    setShowCopy(() => true)

    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const index = ongoingTouchIndexById(touchPoints, touches[i].identifier)
      touchPoints.splice(index, 1)
    }
  }

  //resize canvas to be size of window
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  return (
    <div className="bg-muted relative h-screen w-screen overflow-hidden">
      <div
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleCancel}
        className="bg-muted absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"
      />
      {touchPoints.map(({ identifier, pageX, pageY }) => (
        <Circle
          key={identifier}
          size={CircleRadius * 2}
          style={{
            position: 'absolute',
            left: pageX - CircleRadius,
            top: pageY - CircleRadius,
            color: CircleColors[identifier],
          }}
        />
      ))}
      {/* <canvas
        className="absolute"
        ref={canvasRef}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleCancel}
      /> */}
      {showCopy && (
        <>
          <Button
            size="lg"
            onClick={onBackClick}
            className="bg-border text-muted-foreground hover:bg-muted absolute top-4 left-4 hover:opacity-90 active:scale-[.98]"
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
