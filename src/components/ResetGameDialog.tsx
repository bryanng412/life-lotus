import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { FC, ReactNode } from 'react'
import { Button } from './ui/button'

const ResetGameDialog: FC<{ onClose: () => void; children: ReactNode }> = ({
  onClose,
  children,
}) => {
  const {
    numPlayers,
    keepExtraCounters,
    choosePlayerOnReset,
    toggleKeepExtraCounters,
    toggleChoosePlayerOnReset,
    resetCounters,
    setView,
  } = useBoundStore()
  const contentClassName = cn('sm:max-w-[425px]', numPlayers > 2 && 'rotate-90')
  const onResetClick = () => {
    if (choosePlayerOnReset) {
      setView(View.ChoosePlayer)
    }
    resetCounters()
    onClose()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={contentClassName} onClose={onClose}>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Reset Game</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <div className="mt-4 flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-2">
            <Switch
              id="rechoose-players"
              checked={choosePlayerOnReset}
              onCheckedChange={toggleChoosePlayerOnReset}
            />
            <Label htmlFor="rechoose-players">Rechoose Starting Player</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="keep-counters"
              checked={keepExtraCounters}
              onCheckedChange={toggleKeepExtraCounters}
            />
            <Label htmlFor="keep-counters">Keep Counters</Label>
          </div>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onResetClick}>
              Reset Game
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResetGameDialog
