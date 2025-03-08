import { Button } from '@/components/ui/button'
import { ChevronsUp, CirclePlus, Palette } from 'lucide-react'

const PlayerSettings = ({ hideSettings }: { hideSettings: () => void }) => {
  return (
    <div className="bg-muted relative size-full">
      <div className="flex size-full items-center justify-evenly">
        <Button>
          <Palette />
        </Button>
        <Button>
          <CirclePlus />
        </Button>
      </div>
      <Button
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        onClick={hideSettings}
      >
        <ChevronsUp />
      </Button>
    </div>
  )
}

export default PlayerSettings
