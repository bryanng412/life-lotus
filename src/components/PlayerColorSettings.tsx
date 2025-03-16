import { Button } from '@/components/ui/button'
import { usePlayerBoxContext } from '@/lib/hooks/usePlayerBoxContext'
import { useBoundStore } from '@/lib/store/boundStore'
import { getPlayerColors } from '@/lib/utils'
import { CheckCircle, X } from 'lucide-react'

const PlayerColorSettings = ({ onClose }: { onClose: () => void }) => {
  const colors = getPlayerColors()
  const { id } = usePlayerBoxContext()
  const { updatePlayerColor, playerColors } = useBoundStore()
  const currentColor = playerColors[id]
  const currentColorIndex = colors.findIndex(c => c.value === currentColor)

  return (
    <div
      className="relative grid size-full grid-cols-4 grid-rows-2 gap-4 p-4 pt-8 pb-18 md:grid-rows-3 md:pt-16"
      style={{ backgroundColor: currentColor }}
    >
      {colors.map(({ value }, i) => (
        <button
          key={i}
          onClick={() => updatePlayerColor(id, value)}
          className="border-muted-foreground flex cursor-pointer items-center justify-center rounded-md border-1"
          style={{ backgroundColor: value }}
        >
          {currentColorIndex === i && <CheckCircle size={30} />}
        </button>
      ))}
      <Button
        className="bg-muted text-foreground hover:bg-primary-foreground absolute bottom-2 left-1/2 -translate-x-1/2 shadow-none"
        onClick={onClose}
      >
        <X />
      </Button>
    </div>
  )
}

export default PlayerColorSettings
