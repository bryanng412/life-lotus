import { Button } from '@/components/ui/button'
import { ChevronsUp, CirclePlus, Paintbrush } from 'lucide-react'
import { useCallback, useState } from 'react'
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
    <div className="bg-primary-foreground relative size-full pb-2">
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
              <Paintbrush className="mb-2 size-14" />
              <p>Colors</p>
            </button>
            <button
              onClick={showCountersSetting}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <CirclePlus className="mb-2 size-14" />
              <p>Counters</p>
            </button>
          </div>
          <Button
            className="bg-muted text-muted-foreground hover:bg-primary-foreground absolute bottom-2 left-1/2 -translate-x-1/2 shadow-none"
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
