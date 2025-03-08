import { Button } from '@/components/ui/button'
import { ChevronsUp, CirclePlus, Paintbrush } from 'lucide-react'

const PlayerSettings = ({ hideSettings }: { hideSettings: () => void }) => {
  return (
    <div className="bg-muted relative size-full">
      <div className="flex size-full items-center justify-evenly">
        <button className="flex size-[20%] cursor-pointer items-center justify-center">
          <Paintbrush className="size-full" />
        </button>
        <button className="flex size-[20%] cursor-pointer items-center justify-center">
          <CirclePlus className="size-full" />
        </button>
      </div>
      <Button
        className="bg-primary-foreground text-muted-foreground hover:bg-muted absolute bottom-4 left-1/2 -translate-x-1/2 shadow-none"
        onClick={hideSettings}
      >
        <ChevronsUp />
      </Button>
    </div>
  )
}

export default PlayerSettings
