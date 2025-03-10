import { Button } from '@/components/ui/button'
import { ChevronsUp, CirclePlus, Paintbrush } from 'lucide-react'

const PlayerSettings = ({ hideSettings }: { hideSettings: () => void }) => {
  return (
    <div className="bg-muted relative size-full pb-2">
      <div className="flex size-full items-center justify-evenly">
        <button className="flex cursor-pointer flex-col items-center justify-center">
          <Paintbrush className="mb-2 size-14" />
          <p>Colors</p>
        </button>
        <button className="flex cursor-pointer flex-col items-center justify-center">
          <CirclePlus className="mb-2 size-14" />
          <p>Counters</p>
        </button>
      </div>
      <Button
        className="bg-muted text-muted-foreground hover:bg-primary-foreground absolute bottom-2 left-1/2 -translate-x-1/2 shadow-none"
        onClick={hideSettings}
      >
        <ChevronsUp />
      </Button>
    </div>
  )
}

export default PlayerSettings
