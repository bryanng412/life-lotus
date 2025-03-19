import EndGameButton from '@/components/EndGameButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTheme } from '@/lib/hooks/useTheme'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { cn } from '@/lib/utils'
import { Moon, Share2, Sun } from 'lucide-react'
import { FC, ReactNode, useState } from 'react'
import QRCodeShare from './QRCodeShare'

const OptionsDialog: FC<{
  onClose?: () => void
  children: ReactNode
}> = ({ onClose, children }) => {
  const [showQRCode, setShowQRCode] = useState(false)
  const { theme, setTheme } = useTheme()
  const { numPlayers, view } = useBoundStore()
  const openQRCode = () => setShowQRCode(true)
  const closeQRCode = () => setShowQRCode(false)
  const handleThemeOnClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const contentClassName = cn(
    'sm:max-w-[425px]',
    numPlayers > 2 && view === View.LifeCounter && 'rotate-90',
    showQRCode && 'rotate-0'
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={contentClassName} onClose={onClose}>
        {showQRCode && (
          <>
            <DialogHeader>
              <DialogTitle>Share Game Data</DialogTitle>
              <DialogDescription>
                Use the QR code or link to continue your game on another device!
              </DialogDescription>
            </DialogHeader>
            <QRCodeShare onBack={closeQRCode} />
          </>
        )}
        {!showQRCode && (
          <>
            <DialogHeader>
              <DialogTitle>Options</DialogTitle>
              <DialogDescription>
                Thanks for using Life Lotus!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  size="lg"
                  className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90"
                  onClick={handleThemeOnClick}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                {view === View.LifeCounter && (
                  <Button
                    size="lg"
                    className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90"
                    onClick={openQRCode}
                  >
                    <Share2 className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Share</span>
                  </Button>
                )}
              </div>
              {view === View.LifeCounter && <EndGameButton />}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default OptionsDialog
