import { clsx, type ClassValue } from 'clsx'
import { Touch } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyTouch({ identifier, pageX, pageY }: Touch) {
  return { identifier, pageX, pageY }
}

export function ongoingTouchIndexById(
  touchPoints: ReturnType<typeof copyTouch>[],
  idToFind: number
): number {
  for (let i = 0; i < touchPoints.length; i++) {
    const id = touchPoints[i].identifier

    if (id === idToFind) {
      return i
    }
  }
  return -1 // not found
}
