import { Button } from '@/components/ui/button'
import { ChevronsUp, CirclePlus, Palette } from 'lucide-react'
import { useCallback, useState } from 'react'
import PlayerColorSettings from './PlayerColorSettings'
import PlayerCounterSettings from './PlayerCounterSettings'

const PlayerSettings = ({ hideSettings }: { hideSettings: () => void }) => {
  const [currentSetting, setCurrentSetting] = useState<
    'colors' | 'counters' | null
  >(null)

  const hideCurrentSetting = useCallback(() => {
    setCurrentSetting(null)
    hideSettings()
  }, [hideSettings])
  const showCountersSetting = useCallback(
    () => setCurrentSetting('counters'),
    []
  )
  const showColorsSetting = useCallback(() => setCurrentSetting('colors'), [])

  return (
    <div className="bg-muted relative size-full">
      {currentSetting === 'colors' && (
        <PlayerColorSettings onClose={hideCurrentSetting} />
      )}
      {currentSetting === 'counters' && (
        <PlayerCounterSettings onClose={hideCurrentSetting} />
      )}
      {currentSetting === null && (
        <>
          <div className="flex size-full items-center justify-evenly">
            <button
              onClick={showColorsSetting}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <Palette className="mb-2 size-14 md:size-18" />
              <p>Colors</p>
            </button>
            <button
              onClick={showCountersSetting}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <CirclePlus className="mb-2 size-14 md:size-18" />
              <p>Counters</p>
            </button>
          </div>
          <Button
            className="bg-muted text-foreground hover:bg-primary-foreground absolute bottom-2 left-1/2 -translate-x-1/2 shadow-none"
            onClick={hideSettings}
          >
            <ChevronsUp />
          </Button>
        </>
      )}
    </div>
  )
}

export default PlayerSettings
