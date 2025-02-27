import { useWakeLock } from '@/hooks/useWakeLock'
import { useEffect } from 'react'

const WakeLock = () => {
  const { isLocked, request, release } = useWakeLock()
  useEffect(() => {
    if (!isLocked) {
      request()
    }
    return release
  }, [request, release, isLocked])

  return <></>
}

export default WakeLock
