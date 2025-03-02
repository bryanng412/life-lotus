import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { ArrowLeft } from 'lucide-react'
import React, { Touch, useEffect, useRef } from 'react'
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
  const { setView, previousView, numPlayers } = useBoundStore()
  // const [touchPoints, setTouchPoints] = useState<Touch[]>([])]
  const touchPoints = useRef<Touch[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleTouch: React.TouchEventHandler = event => {
    const sharedTouchPoints = Array.from(event.touches).filter(t =>
      touchPoints.current.some(({ identifier }) => t.identifier === identifier)
    )
    const uniqueTouchPoints = Array.from(event.touches).filter(
      t =>
        !touchPoints.current.some(
          ({ identifier }) => t.identifier === identifier
        )
    )
    const newTouchPoints = [...sharedTouchPoints, ...uniqueTouchPoints].slice(
      0,
      numPlayers
    )

    touchPoints.current = newTouchPoints
  }

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      touchPoints.current.map(touch => {
        ctx.arc(touch.clientX, touch.clientY, CircleRadius, 0, Math.PI * 2)
        ctx.strokeStyle = CircleColors[touch.identifier]
        ctx.lineWidth = 5
        ctx.stroke()
      })

      ctx.closePath()
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="bg-muted relative h-screen w-screen overflow-hidden">
      <div
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouch}
        className="bg-muted absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"
      />
      <canvas ref={canvasRef} />
      {touchPoints.current.length === 0 && (
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
