import logo from '@/assets/logo.webp'
import CarouselSelector from '@/components/CarouselSelector'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { NumPlayers, StartingLife } from '@/lib/store/gameInfoSlice'
import { Settings } from 'lucide-react'
import { useState } from 'react'

const NumPlayersOptions: NumPlayers[] = [6, 5, 4, 3, 2]
const StartingLifeOptions: StartingLife[] = [40, 30, 20]

const GameSetup = () => {
  const { startingLife, numPlayers, setStartingLife, setNumPlayers } =
    useBoundStore()

  const numPlayersIndex = NumPlayersOptions.indexOf(numPlayers)
  const lifeIndex = StartingLifeOptions.indexOf(startingLife)
  const [initNumPlayersIndex] = useState(numPlayersIndex)
  const [initLifeIndex] = useState(lifeIndex)

  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center gap-18 pt-[5vh] md:gap-21">
      <img
        src={logo}
        alt="logo"
        className="l-[150px] md:l-[225px] lg:l-[250px] w-[150px] md:w-[225px] lg:w-[250px]"
      />
      <div className="flex w-[100%] items-center justify-center gap-4">
        <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-18 md:gap-20">
          <CarouselSelector
            slides={NumPlayersOptions}
            onSelect={setNumPlayers}
            startIndex={initNumPlayersIndex}
          />
          <p className="font-medium">Players</p>
        </div>
        <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-18 md:gap-20">
          <CarouselSelector
            slides={StartingLifeOptions}
            onSelect={setStartingLife}
            startIndex={initLifeIndex}
          />
          <p className="font-medium">Starting Life</p>
        </div>
      </div>
      <div className="flex w-[100%] max-w-[480px] flex-col items-center justify-center gap-4">
        <Button
          size="lg"
          className="bg-muted-foreground text-primary-foreground hover:bg-muted-foreground hover:opacity-90"
        >
          Start Game
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-muted-foreground [&>svg]:stroke-primary-foreground hover:bg-muted-foreground hover:opacity-90"
        >
          <Settings />
        </Button>
      </div>
    </div>
  )
}

export default GameSetup
