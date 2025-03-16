import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { useState } from 'react'

const EndGameButton = () => {
  const { setView } = useBoundStore()
  const endGameOnClick = () => setView(View.GameSetup)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col items-center justify-center"
    >
      <CollapsibleTrigger asChild>
        <Button>End Game</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <p>Are you sure?</p>
          <div className="flex items-center justify-center space-x-2">
            <Button onClick={() => setIsOpen(false)}>No</Button>
            <Button onClick={endGameOnClick} variant="destructive">
              Yes
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default EndGameButton
