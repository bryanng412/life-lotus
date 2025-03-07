import ChoosePlayer from '@/components/views/ChoosePlayer'
import GameSetup from '@/components/views/GameSetup'
import LifeCounter from '@/components/views/LifeCounter'
import WakeLock from '@/components/WakeLock'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'

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

  return (
    <>
      <ViewComponent />
      <WakeLock />
    </>
  )
}

export default App
