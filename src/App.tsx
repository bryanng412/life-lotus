import GameSetup from '@/components/views/GameSetup'
import WakeLock from '@/components/WakeLock'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import ChoosePlayer from './components/views/ChoosePlayer'

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
