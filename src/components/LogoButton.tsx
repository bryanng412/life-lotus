import logo from '@/assets/logo.webp'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const LogoButton = ({
  placement,
  className,
  ...props
}: ComponentProps<'button'> & { placement: 'bottom-right' | 'middle' }) => (
  <button
    className={cn(
      'bg-accent absolute z-1 size-[3.5rem] transform cursor-pointer rounded-full p-1',
      placement === 'bottom-right' &&
        'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
      placement === 'middle' &&
        'top-0 left-[50%] -translate-x-1/2 -translate-y-1/2',
      className
    )}
    {...props}
    aria-label="Open Options"
  >
    <img src={logo} alt="logo" />
  </button>
)

export default LogoButton
