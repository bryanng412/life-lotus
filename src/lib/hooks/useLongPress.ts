import { useCallback, useEffect, useRef, useState } from 'react'

interface UseLongPressOptions {
  onPress: () => void
  onLongPress: () => void
  longPressDelay?: number
  interval?: number
}

export const useLongPress = ({
  onPress,
  onLongPress,
  longPressDelay = 500,
  interval = 500,
}: UseLongPressOptions) => {
  const [isPressed, setIsPressed] = useState(false)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasLongPressedRef = useRef(false)
  const pressedTargetRef = useRef<EventTarget | null>(null)
  const activeTouchPointsRef = useRef<Set<number>>(new Set())
  const isTouchEventRef = useRef(false)

  const cleanup = useCallback(() => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsPressed(false)
    hasLongPressedRef.current = false
    pressedTargetRef.current = null
    activeTouchPointsRef.current.clear()
    isTouchEventRef.current = false
  }, [])

  const updateTouchPoints = useCallback((touches: React.TouchList) => {
    const currentPoints = new Set<number>()
    Array.from(touches).forEach(touch => {
      currentPoints.add(touch.identifier)
    })
    activeTouchPointsRef.current = currentPoints
  }, [])

  const startLongPress = useCallback(() => {
    hasLongPressedRef.current = true
    onLongPress()
    intervalRef.current = setInterval(onLongPress, interval)
  }, [interval, onLongPress])

  const handlePressStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // Handle touch events
      if ('touches' in event) {
        event.preventDefault()
        isTouchEventRef.current = true
        updateTouchPoints(event.touches)
      } else if (isTouchEventRef.current) {
        return
      }

      // If we're already pressing a different target, ignore this press
      if (
        pressedTargetRef.current &&
        pressedTargetRef.current !== event.target
      ) {
        return
      }

      setIsPressed(true)
      hasLongPressedRef.current = false
      pressedTargetRef.current = event.target

      // Start long press timer
      pressTimerRef.current = setTimeout(startLongPress, longPressDelay)
    },
    [longPressDelay, startLongPress, updateTouchPoints]
  )

  const handlePressEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // Only handle press end if this is the same target we started pressing
      if (pressedTargetRef.current !== event.target) {
        return
      }

      // For touch events, track removed touch points
      if ('changedTouches' in event) {
        Array.from(event.changedTouches).forEach(touch => {
          activeTouchPointsRef.current.delete(touch.identifier)
        })

        // Only cleanup if all touch points are released
        if (activeTouchPointsRef.current.size > 0) {
          return
        }
      } else if (isTouchEventRef.current) {
        return
      }

      cleanup()
      if (!hasLongPressedRef.current) {
        onPress()
      }
    },
    [cleanup, onPress]
  )

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      updateTouchPoints(event.touches)
    },
    [updateTouchPoints]
  )

  const handleCancel = useCallback(() => {
    cleanup()
  }, [cleanup])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    isPressed,
    onMouseDown: handlePressStart,
    onTouchStart: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: cleanup,
    onTouchEnd: handlePressEnd,
    onTouchMove: handleTouchMove,
    onTouchCancel: handleCancel,
    onContextMenu: handleCancel,
  }
}
