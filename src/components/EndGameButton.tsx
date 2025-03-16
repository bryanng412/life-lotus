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
        <Button className="select-none">End Game</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <p className="select-none">Are you sure?</p>
          <div className="flex items-center justify-center space-x-2">
            <Button onClick={() => setIsOpen(false)} className="select-none">
              No
            </Button>
            <Button
              onClick={endGameOnClick}
              variant="destructive"
              className="select-none"
            >
              Yes
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default EndGameButton
