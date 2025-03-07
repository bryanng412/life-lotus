import { useBoundStore } from '@/lib/store/boundStore'
import { CounterName } from '@/lib/store/playersSlice'

const Counter = ({
  id,
  name,
  value,
}: {
  id: number
  name: CounterName
  value: number
}) => {
  const { updatePlayerCounter } = useBoundStore()

  return (
    <div className="relative flex size-full items-center justify-center border-1 text-8xl select-none">
      {value}
      <div className="absolute flex size-full flex-col">
        <button
          className="bg-primary size-full cursor-pointer opacity-0 active:opacity-5"
          onClick={() => updatePlayerCounter(id, name, 1)}
        />
        <button
          className="bg-primary size-full cursor-pointer opacity-0 active:opacity-5"
          onClick={() => updatePlayerCounter(id, name, -1)}
        />
      </div>
    </div>
  )
}

export default Counter
