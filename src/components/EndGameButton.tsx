import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { View } from '@/lib/store/viewSlice'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const EndGameButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { setView } = useBoundStore()
  const toggleIsOpen = () => setIsOpen(open => !open)
  const endGameOnClick = () => setView(View.GameSetup)

  return (
    <>
      <Button onClick={toggleIsOpen}>End Game</Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 130 }}
            exit={{ maxHeight: 0 }}
            transition={{
              type: 'tween',
              ease: 'linear',
            }}
            className="mt-2 flex flex-col items-center justify-center space-y-2 overflow-hidden"
          >
            <p>Are you sure?</p>
            <div className="flex items-center justify-center space-x-3">
              <Button onClick={() => setIsOpen(false)}>No</Button>
              <Button onClick={endGameOnClick} variant="destructive">
                Yes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EndGameButton
