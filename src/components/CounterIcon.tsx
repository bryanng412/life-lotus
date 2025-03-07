import BlackIcon from '@/assets/black.svg?react'
import BlueIcon from '@/assets/blue.svg?react'
import ColorlessIcon from '@/assets/colorless.svg?react'
import GreenIcon from '@/assets/green.svg?react'
import PhyrexianIcon from '@/assets/phyrexian.svg?react'
import RedIcon from '@/assets/red.svg?react'
import WhiteIcon from '@/assets/white.svg?react'
import { CounterName } from '@/lib/store/playersSlice'
import { Apple, Banana, Cherry, Citrus, Grape, Heart } from 'lucide-react'
import { ComponentProps } from 'react'

const CounterIcon = ({
  counterName,
  ...props
}: ComponentProps<'svg'> & { counterName: CounterName }) => {
  if (counterName === CounterName.life) {
    return <Heart size={32} {...props} />
  } else if (counterName === CounterName.apple) {
    return <Apple size={32} {...props} />
  } else if (counterName === CounterName.banana) {
    return <Banana size={32} {...props} />
  } else if (counterName === CounterName.grape) {
    return <Grape size={32} {...props} />
  } else if (counterName === CounterName.citrus) {
    return <Citrus size={32} {...props} />
  } else if (counterName === CounterName.cherry) {
    return <Cherry size={32} {...props} />
  } else if (counterName === CounterName.black) {
    return <BlackIcon width={24} height="auto" {...props} />
  } else if (counterName === CounterName.blue) {
    return <BlueIcon width={24} height="auto" {...props} />
  } else if (counterName === CounterName.red) {
    return <RedIcon width={24} height="auto" {...props} />
  } else if (counterName === CounterName.white) {
    return <WhiteIcon width={24} height="auto" {...props} />
  } else if (counterName === CounterName.green) {
    return <GreenIcon width={24} height="auto" {...props} />
  } else if (counterName === CounterName.colorless) {
    return <ColorlessIcon width={24} height="auto" {...props} />
  } else {
    return <PhyrexianIcon width={24} height="auto" {...props} />
  }
}

export default CounterIcon
