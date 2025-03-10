import PhyrexianIcon from '@/assets/phyrexian.svg?react'
import { CounterName } from '@/lib/store/playersSlice'
import {
  Banana,
  Beef,
  CakeSlice,
  Cherry,
  Grape,
  Heart,
  IceCreamCone,
  Pizza,
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
  } else if (counterName === CounterName.pizza) {
    return <Pizza size={size} {...props} />
  } else if (counterName === CounterName.banana) {
    return <Banana size={size} {...props} />
  } else if (counterName === CounterName.grape) {
    return <Grape size={size} {...props} />
  } else if (counterName === CounterName.cake) {
    return <CakeSlice size={size} {...props} />
  } else if (counterName === CounterName.cherry) {
    return <Cherry size={size} {...props} />
  } else if (counterName === CounterName.icecream) {
    return <IceCreamCone size={size} {...props} />
  } else if (counterName === CounterName.beef) {
    return <Beef size={size} {...props} />
  } else {
    return <PhyrexianIcon width={size + 4} height={size + 4} {...props} />
  }
}

export default CounterIcon
