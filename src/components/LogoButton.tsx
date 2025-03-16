import logo from '@/assets/logo.webp'
import OptionsDialog from '@/components/OptionsDialog'
import { cn } from '@/lib/utils'
import { RefreshCcw, Settings } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ComponentProps, useState } from 'react'

const LogoButton = ({
  placement,
  className,
  ...props
}: ComponentProps<'button'> & { placement: 'bottom-right' | 'middle' }) => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className={cn(
              'bg-accent absolute z-1 flex size-full h-8 w-32 transform items-center justify-between rounded-full',
              placement === 'bottom-right' &&
                'right-0 bottom-0 translate-x-1/2 translate-y-1/2 rotate-90',
              placement === 'middle' &&
                'left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
            initial={{ width: 105 }}
            animate={{ width: 200 }}
            exit={{ width: 105 }}
            transition={{ type: 'tween', ease: ['easeIn', 'easeOut'] }}
          >
            <button
              className={cn(
                'cursor-pointer rounded-full p-2',
                placement === 'bottom-right' && 'rotate-90'
              )}
            >
              <RefreshCcw size={34} />
            </button>
            <OptionsDialog>
              <button
                className={cn(
                  'cursor-pointer rounded-full p-2',
                  placement === 'bottom-right' && 'rotate-90'
                )}
              >
                <Settings size={34} />
              </button>
            </OptionsDialog>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleShow}
        className={cn(
          'bg-accent absolute z-1 size-[3.5rem] transform cursor-pointer rounded-full p-1',
          placement === 'bottom-right' &&
            'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
          placement === 'middle' &&
            'top-0 left-[50%] -translate-x-1/2 -translate-y-1/2',
          className
        )}
        {...props}
        aria-label="Reveal Options"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        >
          <img src={logo} alt="logo" />
        </motion.div>
      </button>
    </>
  )
}

export default LogoButton
