import logo from '@/assets/logo.webp'
import CarouselSelector from '@/components/CarouselSelector'
import { useBoundStore } from '@/lib/store/boundStore'
import { NumPlayers, StartingLife } from '@/lib/store/gameInfoSlice'

const NumPlayersOptions: NumPlayers[] = [6, 5, 4, 3, 2]
const StartingLifeOptions: StartingLife[] = [40, 30, 20]

const GameSetup = () => {
  const { startingLife, numPlayers, setStartingLife, setNumPlayers } =
    useBoundStore()

  const startingNumPlayersIndex = NumPlayersOptions.indexOf(numPlayers)
  const startingLifeIndex = StartingLifeOptions.indexOf(startingLife)

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-zinc-400 pt-[5vh]">
      <img
        src={logo}
        alt="logo"
        className="l-[150px] md:l-[225px] lg:l-[250px] mb-2 w-[150px] md:w-[225px] lg:w-[250px]"
      />
      <div className="mt-16 flex w-[100%] items-center justify-center gap-4">
        <CarouselSelector
          slides={NumPlayersOptions}
          onSelect={setNumPlayers}
          startIndex={startingNumPlayersIndex}
          label="Players"
        />
        <CarouselSelector
          slides={StartingLifeOptions}
          onSelect={setStartingLife}
          startIndex={startingLifeIndex}
          label="Starting Life"
        />
      </div>
    </div>
  )
}

export default GameSetup
