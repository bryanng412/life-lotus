import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useBoundStore } from '@/lib/store/boundStore'
import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'
import { Button } from './ui/button'

const ResetGameDialog: FC<{ onClose: () => void; children: ReactNode }> = ({
  onClose,
  children,
}) => {
  const {
    numPlayers,
    keepExtraCounters,
    toggleKeepExtraCounters,
    resetCounters,
  } = useBoundStore()
  const contentClassName = cn('sm:max-w-[425px]', numPlayers > 2 && 'rotate-90')
  const onResetClick = () => {
    resetCounters()
    onClose()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={contentClassName} onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Reset Game</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="keep-counters"
              checked={keepExtraCounters}
              onCheckedChange={toggleKeepExtraCounters}
            />
            <Label htmlFor="keep-counters">Keep Counters</Label>
          </div>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="select-none"
              onClick={onResetClick}
            >
              Reset Game
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResetGameDialog
