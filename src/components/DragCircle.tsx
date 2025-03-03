import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { Circle } from 'lucide-react'

const CircleColors = [
  'oklch(0.646 0.222 41.116)',
  'oklch(0.6 0.118 184.704)',
  'oklch(0.398 0.07 227.392)',
  'oklch(0.828 0.189 84.429)',
  'oklch(0.769 0.188 70.08)',
  'oklch(0.627 0.265 303.9)',
]

const CircleRadius = 120
const AnimatedCircle = animated(Circle)

export type DragCircleProps = {
  id: number
  initialX: number
  initialY: number
}

const DragCircle = ({ id, initialX, initialY }: DragCircleProps) => {
  const [{ x, y }, api] = useSpring(() => ({ x: initialX, y: initialY }))

  const bind = useDrag(async ({ offset: [dx, dy] }) => {
    await Promise.all(api.start({ x: initialX + dx, y: initialY + dy }))
  })
  return (
    <AnimatedCircle
      {...bind()}
      style={{ x, y, touchAction: 'none', color: CircleColors[id] }}
      size={CircleRadius}
    />
  )
}

export default DragCircle
