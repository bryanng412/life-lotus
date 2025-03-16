import { Button } from '@/components/ui/button'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { getPlayerColors } from '@/lib/utils'
import { CheckCircle, X } from 'lucide-react'

const PlayerColorSettings = ({ onClose }: { onClose: () => void }) => {
  const colors = getPlayerColors()
  const { id } = usePlayerBoxContext()
  const { players, updatePlayerColor } = useBoundStore()
  const currentColor = players[id].color
  const currentColorIndex = colors.findIndex(c => c.value === currentColor)

  return (
    <div className="relative mt-4 grid size-full grid-cols-4 grid-rows-2 gap-4 p-4 pb-18 md:grid-rows-3 md:pt-16">
      {colors.map(({ value }, i) => (
        <button
          key={i}
          onClick={() => updatePlayerColor(id, value)}
          className="border-muted-foreground flex cursor-pointer items-center justify-center rounded-md border-1"
          style={{ backgroundColor: value }}
        >
          {currentColorIndex === i && <CheckCircle size={32} />}
        </button>
      ))}
      <Button
        className="bg-muted text-foreground hover:bg-primary-foreground absolute bottom-4 left-1/2 -translate-x-1/2 shadow-none"
        onClick={onClose}
      >
        <X />
      </Button>
    </div>
  )
}

export default PlayerColorSettings
