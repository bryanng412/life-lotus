import logo from '@/assets/logo.webp'
import CarouselSelector from '@/components/CarouselSelector'
import OptionsDialog from '@/components/OptionsDialog'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { NumPlayers, StartingLife } from '@/lib/store/gameInfoSlice'
import { View } from '@/lib/store/viewSlice'
import { Download, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const NumPlayersOptions: NumPlayers[] = [6, 5, 4, 3, 2]
const StartingLifeOptions: StartingLife[] = [40, 30, 20]

const GameSetup = () => {
  const {
    startingLife,
    numPlayers,
    setStartingLife,
    setNumPlayers,
    setPlayers,
    setView,
  } = useBoundStore()
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const numPlayersIndex = NumPlayersOptions.indexOf(numPlayers)
  const lifeIndex = StartingLifeOptions.indexOf(startingLife)
  const [initNumPlayersIndex] = useState(numPlayersIndex)
  const [initLifeIndex] = useState(lifeIndex)

  useEffect(() => {
    const handleInstall = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstall)
    }
  }, [])

  const installAppOnClick = async () => {
    if (installEvent) {
      await installEvent.prompt()
      const choiceResult = await installEvent.userChoice
      if (choiceResult.outcome === 'accepted') {
        setInstallEvent(null)
      }
    }
  }

  const startGameOnClick = () => {
    setPlayers(numPlayers)
    setView(View.ChoosePlayer)
  }

  return (
    <div className="bg-muted flex h-dvh w-screen flex-col items-center gap-18 pt-[5vh] md:gap-21">
      <img
        src={logo}
        alt="logo"
        className="l-[150px] md:l-[225px] lg:l-[250px] w-[150px] md:w-[225px] lg:w-[250px]"
      />
      <div className="flex w-[100%] items-center justify-center gap-2">
        <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-18 md:gap-20">
          <CarouselSelector
            slides={NumPlayersOptions}
            onSelect={setNumPlayers}
            startIndex={initNumPlayersIndex}
          />
          <p className="text-lg font-medium md:text-xl">Players</p>
        </div>
        <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-18 md:gap-20">
          <CarouselSelector
            slides={StartingLifeOptions}
            onSelect={setStartingLife}
            startIndex={initLifeIndex}
          />
          <p className="text-lg font-medium md:text-xl">Starting Life</p>
        </div>
      </div>
      <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-4">
        <Button
          size="xxl"
          className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground md:padding-20 hover:opacity-90 active:scale-[.98]"
          onClick={startGameOnClick}
        >
          Start Game
        </Button>
        {installEvent && (
          <Button
            size="xxl"
            className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90 active:scale-[.98]"
            onClick={() => void installAppOnClick()}
          >
            Install App
            <Download className="size-7" />
          </Button>
        )}
        <OptionsDialog>
          <Button
            size="xl"
            className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90 active:scale-[.98]"
          >
            <Settings />
          </Button>
        </OptionsDialog>
      </div>
    </div>
  )
}

export default GameSetup
