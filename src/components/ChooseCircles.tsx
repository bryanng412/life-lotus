import { PlayerTouch } from '@/components/views/ChoosePlayer'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { isEqual } from 'lodash'
import { Circle } from 'lucide-react'
import { AnimationDefinition, motion, Variants } from 'motion/react'
import { useCallback, useState } from 'react'

const MotionCircle = motion.create(Circle)
const CircleDiameter = 140

type CircleTouch = {
  chosen?: boolean
  hidden?: boolean
} & PlayerTouch

const animationVariants: Variants = {
  normal: {
    scale: 1,
  },
  hidden: {
    scale: 0,
  },
  chosen: {
    scale: 2,
  },
  pulsing: {
    scale: [1, 1.3, 1, 1.3, 1, 1.3, 1],
    transition: {
      delay: 0.5,
      duration: 2.75,
      ease: 'easeInOut',
    },
  },
}

const ChooseCircles = ({
  touches,
  numPlayers,
}: {
  touches: PlayerTouch[]
  numPlayers: number
}) => {
  const { setView, playerColors } = useBoundStore()
  const [circles, setCircles] = useState<CircleTouch[]>(touches)
  const syncCirclesToTouches = useCallback(() => setCircles(touches), [touches])
  if (!isEqual(touches, circles) && !circles.some(c => c.chosen)) {
    syncCirclesToTouches()
  }

  const onAnimationCompleted = (animation: AnimationDefinition) => {
    if (
      animation === 'pulsing' &&
      !circles.some(c => c.chosen) &&
      circles.length === numPlayers
    ) {
      const randomIndex = Math.floor(Math.random() * circles.length)
      const newCircles = circles.map((c, i) =>
        i === randomIndex ? { ...c, chosen: true } : { ...c, hidden: true }
      )
      setCircles(newCircles)
      setTimeout(() => setView(View.LifeCounter), 1000)
    }
  }

  return (
    <>
      {circles.map(({ id, x, y, chosen, hidden }) => {
        let animate = 'normal'
        if (chosen) {
          animate = 'chosen'
        } else if (hidden) {
          animate = 'hidden'
        } else if (circles.length === numPlayers) {
          animate = 'pulsing'
        }

        return (
          <MotionCircle
            size={CircleDiameter}
            key={id}
            initial={{ scale: 0 }}
            variants={animationVariants}
            animate={animate}
            style={{
              color: playerColors[id],
              position: 'absolute',
              x: x - CircleDiameter / 2,
              y: y - CircleDiameter / 2,
            }}
            onAnimationComplete={onAnimationCompleted}
          />
        )
      })}
    </>
  )
}

export default ChooseCircles
