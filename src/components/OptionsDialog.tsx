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
import { Moon, Sun } from 'lucide-react'
import { FC, ReactNode } from 'react'

const OptionsDialog: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme()
  const { view, setView } = useBoundStore()
  const handleThemeOnClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>Thanks for using Jeweled Lotus!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
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
              variant="destructive"
              onClick={() => setView(View.GameSetup)}
              className="select-none"
            >
              End Game
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OptionsDialog
