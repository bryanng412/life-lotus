import DragCircle from '@/components/DragCircle'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const ChoosePlayer = () => {
  const { setView, previousView } = useBoundStore()
  const [touchPoints] = useState([])

  // const handleStart: TouchEventHandler = event => {
  //   setTouchPoints(
  //     Array.from(event.touches).map(touch => ({
  //       id: touch.identifier,
  //       initialX: touch.pageX,
  //       initialY: touch.pageY,
  //     }))
  //   )
  // }

  // const handleEnd: TouchEventHandler = event => {
  //   setTouchPoints([])
  // }

  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  return (
    <div className="bg-muted relative h-screen w-screen overflow-hidden">
      <div className="bg-muted absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      <DragCircle />
      <DragCircle />
      <DragCircle />
      <DragCircle />
      {touchPoints.length === 0 && (
        <>
          <Button
            size="lg"
            onClick={onBackClick}
            className="bg-border text-muted-foreground hover:bg-muted absolute top-4 left-4 hover:opacity-90 active:scale-[.98]"
          >
            <ArrowLeft />
          </Button>
          <div className="absolute top-1/4 left-1/2 flex -translate-x-1/2 transform flex-col items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-bold select-none">
              Choose a Player
            </h1>
            <p className="text-center select-none">
              Each player holds a finger on the screen. After three seconds, one
              is chosen to go first!
            </p>
            <div className="align-center flex justify-center gap-2">
              <Button
                size="lg"
                className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground select-none hover:opacity-90 active:scale-[.98]"
              >
                Skip
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChoosePlayer
