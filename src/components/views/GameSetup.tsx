import logo from '@/assets/logo.webp'
import CarouselSelector from '@/components/CarouselSelector'
import { useBoundStore } from '@/lib/store/boundStore'
import { NumPlayers, StartingLife } from '@/lib/store/gameInfoSlice'
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
    <div className="flex h-screen w-screen flex-col items-center gap-20 bg-zinc-400 pt-[5vh]">
      <img
        src={logo}
        alt="logo"
        className="l-[150px] md:l-[225px] lg:l-[250px] w-[150px] md:w-[225px] lg:w-[250px]"
      />
      <div className="flex w-[100%] items-center justify-center gap-4">
        <CarouselSelector
          slides={NumPlayersOptions}
          onSelect={setNumPlayers}
          startIndex={initNumPlayersIndex}
          label="Players"
        />
        <CarouselSelector
          slides={StartingLifeOptions}
          onSelect={setStartingLife}
          startIndex={initLifeIndex}
          label="Starting Life"
        />
      </div>
    </div>
  )
}

export default GameSetup
