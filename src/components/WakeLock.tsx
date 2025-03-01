import { useEffect } from 'react'
import useWakeLock from 'react-use-wake-lock'

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
