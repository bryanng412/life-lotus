import PhyrexianIcon from '@/assets/phyrexian.svg?react'
import { CounterName } from '@/lib/store/playersSlice'
import {
  Apple,
  Banana,
  Carrot,
  Cherry,
  Citrus,
  Grape,
  Heart,
} from 'lucide-react'
import { ComponentProps } from 'react'

const CounterIcon = ({
  counterName,
  size = 28,
  ...props
}: ComponentProps<'svg'> & {
  counterName: CounterName
  size?: number
}) => {
  if (counterName === CounterName.life) {
    return <Heart size={size} {...props} />
  } else if (counterName === CounterName.apple) {
    return <Apple size={size} {...props} />
  } else if (counterName === CounterName.banana) {
    return <Banana size={size} {...props} />
  } else if (counterName === CounterName.grape) {
    return <Grape size={size} {...props} />
  } else if (counterName === CounterName.citrus) {
    return <Citrus size={size} {...props} />
  } else if (counterName === CounterName.cherry) {
    return <Cherry size={size} {...props} />
  } else if (counterName === CounterName.carrot) {
    return <Carrot size={size} {...props} />
  } else {
    return <PhyrexianIcon width={24} height="auto" {...props} />
  }
}

export default CounterIcon
