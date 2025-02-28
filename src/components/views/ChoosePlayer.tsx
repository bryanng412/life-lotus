import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

const ChoosePlayer = () => {
  const { setView, previousView } = useBoundStore()
  const onBackClick = () => {
    if (previousView) {
      setView(previousView)
    } else {
      setView(View.GameSetup)
    }
  }

  return (
    <div className="bg-muted relative h-screen w-screen">
      <div className="bg-muted absolute top-0 left-0 h-screen w-screen bg-[linear-gradient(to_right,var(--color-muted-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-muted-foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      <Button
        size="lg"
        onClick={onBackClick}
        className="bg-primary-foreground [&>svg]:stroke-muted-foreground hover:bg-primary-foreground absolute top-4 left-4 hover:opacity-90 active:scale-[.98]"
      >
        <ArrowLeft />
      </Button>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3">
        <h1 className="text-center text-3xl font-bold">Choose a Player</h1>
        <p className="text-center">
          Each player holds a finger on the screen. After 3 seconds, one is
          chosen to go first!
        </p>
        <div className="align-center flex justify-center gap-2">
          <Button
            size="lg"
            className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90 active:scale-[.98]"
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChoosePlayer
