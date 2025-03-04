import { PlayerTouch } from '@/components/views/ChoosePlayer'
import { Circle } from 'lucide-react'
import { motion } from 'motion/react'

const MotionCircle = motion.create(Circle)
const CircleColors = [
  'oklch(0.646 0.222 41.116)',
  'oklch(0.6 0.118 184.704)',
  'oklch(0.398 0.07 227.392)',
  'oklch(0.828 0.189 84.429)',
  'oklch(0.769 0.188 70.08)',
  'oklch(0.627 0.265 303.9)',
]
const CircleDiameter = 140

const ChooseCircles = ({
  touches,
  numPlayers,
}: {
  touches: PlayerTouch[]
  numPlayers: number
}) => {
  const variants = {
    normal: {
      scale: 1,
    },
    pulsing: {
      scale: [1, 1.25, 1],
      transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return touches.map(({ id, x, y }) => (
    <MotionCircle
      size={CircleDiameter}
      key={id}
      initial={{ scale: 0 }}
      variants={variants}
      animate={touches.length === numPlayers ? 'pulsing' : 'normal'}
      style={{
        color: CircleColors[id],
        position: 'absolute',
        x: x - CircleDiameter / 2,
        y: y - CircleDiameter / 2,
      }}
    />
  ))
}

export default ChooseCircles
