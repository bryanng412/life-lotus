import ChoosePlayer from '@/components/views/ChoosePlayer'
import GameSetup from '@/components/views/GameSetup'
import LifeCounter from '@/components/views/LifeCounter'
import WakeLock from '@/components/WakeLock'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { useEffect } from 'react'

function App() {
  const { view } = useBoundStore()
  let ViewComponent

  switch (view) {
    case View.GameSetup:
      ViewComponent = GameSetup
      break
    case View.ChoosePlayer:
      ViewComponent = ChoosePlayer
      break
    case View.LifeCounter:
      ViewComponent = LifeCounter
      break
    default:
      ViewComponent = GameSetup
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.search) {
      url.search = ''
      window.history.replaceState({}, document.title, url.pathname)
    }
  }, [])

  return (
    <>
      <ViewComponent />
      <WakeLock />
    </>
  )
}

export default App
