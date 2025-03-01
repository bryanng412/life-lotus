import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { ArrowLeft, Circle } from 'lucide-react'
import { motion } from 'motion/react'
import React, { Touch, useRef, useState } from 'react'
import { Button } from '../ui/button'

const CIRCLE_DIAMETER = 140

const CircleColors = [
  'oklch(0.646 0.222 41.116)',
  'oklch(0.6 0.118 184.704)',
  'oklch(0.398 0.07 227.392)',
  'oklch(0.828 0.189 84.429)',
  'oklch(0.769 0.188 70.08)',
  'oklch(0.627 0.265 303.9)',
]

const MotionCircle = motion.create(Circle)

const ChoosePlayer = () => {
  const { setView, previousView, numPlayers } = useBoundStore()
  const [touchPoints, setTouchPoints] = useState<Touch[]>([])
  const animationFrame = useRef<number | null>(null)

  const handleTouch: React.TouchEventHandler = event => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }

    const sharedTouchPoints = Array.from(event.touches).filter(t =>
      touchPoints.some(({ identifier }) => t.identifier === identifier)
    )
    const uniqueTouchPoints = Array.from(event.touches).filter(
      t => !touchPoints.some(({ identifier }) => t.identifier === identifier)
    )
    const newTouchPoints = [...sharedTouchPoints, ...uniqueTouchPoints].slice(
      0,
      numPlayers
    )

    animationFrame.current = requestAnimationFrame(() => {
      setTouchPoints(newTouchPoints)
    })
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
      <div
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouch}
        className="bg-muted absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"
      />
      {touchPoints.map(touch => (
        <motion.div
          key={`circle-${touch.identifier}`}
          initial={{
            x: touch.clientX - CIRCLE_DIAMETER / 2,
            y: touch.clientY - CIRCLE_DIAMETER / 2,
          }}
          transition={{ type: 'spring', duration: 0.05 }}
          animate={{
            x: touch.clientX,
            y: touch.clientY,
          }}
          style={{
            position: 'absolute',
            zIndex: 99,
          }}
        >
          <div
            style={{
              transform: `translate(-${CIRCLE_DIAMETER / 2}px, -${CIRCLE_DIAMETER / 2}px)`,
            }}
          >
            <MotionCircle
              color={CircleColors[touch.identifier]}
              size={CIRCLE_DIAMETER}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          </div>
        </motion.div>
      ))}
      {touchPoints.length === 0 && (
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
