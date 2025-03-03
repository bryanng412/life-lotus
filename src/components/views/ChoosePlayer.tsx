import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { copyTouch, ongoingTouchIndexById } from '@/lib/utils'
import { throttle } from 'lodash'
import { ArrowLeft } from 'lucide-react'
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
  const touchPoints = useRef<ReturnType<typeof copyTouch>[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)

  //resize canvas to be size of window
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctxRef.current = canvas.getContext('2d')
  }, [])

  const drawCircle = (x: number, y: number, color: string) => {
    const ctx = ctxRef.current
    if (!ctx) return

    ctx.beginPath()
    ctx.arc(x, y, CircleRadius, 0, Math.PI * 2)
    ctx.arc(x, y, CircleRadius - 5, 0, Math.PI * 2, true)
    ctx.fillStyle = color
    ctx.fill('evenodd')
    ctx.closePath()
  }

  const clearCanvas = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const ctx = ctxRef.current
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleStart: TouchEventHandler = event => {
    clearCanvas()
    setShowCopy(() => false)

    touchPoints.current = Array.from(event.touches).map(copyTouch)
    for (const t of touchPoints.current) {
      drawCircle(t.pageX, t.pageY, CircleColors[t.identifier])
    }
  }

  const handleMove: TouchEventHandler = event => {
    clearCanvas()

    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const index = ongoingTouchIndexById(
        touchPoints.current,
        touches[i].identifier
      )

      if (index >= 0) {
        touchPoints.current.splice(index, 1, copyTouch(touches[i]))
      }
    }

    for (const t of touchPoints.current) {
      drawCircle(t.pageX, t.pageY, CircleColors[t.identifier])
    }
  }

  const handleEnd: TouchEventHandler = event => {
    event.preventDefault()
    clearCanvas()
    setShowCopy(() => true)

    touchPoints.current = []
  }

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  return (
    <div className="bg-muted relative h-screen w-screen overflow-hidden">
      <div className="bg-muted absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      <canvas
        className="absolute"
        ref={canvasRef}
        onTouchStart={handleStart}
        onTouchMove={throttle(handleMove, 25)}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
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
