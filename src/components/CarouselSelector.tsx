import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { NumPlayers, StartingLife } from '@/lib/store/gameInfoSlice'
import { useEffect, useState } from 'react'

const CarouselSelector = ({
  slides,
  onSelect,
  // label,
  startIndex = 0,
  loop = false,
}: {
  slides: NumPlayers[] | StartingLife[]
  onSelect: (value: NumPlayers & StartingLife) => void
  label: string
  startIndex?: number
  loop?: boolean
}) => {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      const slideIndex = api.selectedScrollSnap()
      onSelect(slides[slideIndex] as NumPlayers & StartingLife)
    })
  }, [api, onSelect, slides])

  useEffect(() => {
    if (!api) {
      return
    }

    api.scrollTo(startIndex, true)
  }, [api, startIndex])

  return (
    <Carousel
      opts={{
        align: 'start',
        loop,
        dragFree: false,
      }}
      orientation="vertical"
      className="w-full max-w-xs"
      setApi={setApi}
    >
      <CarouselContent className="-mt-1 h-[200px] duration-300 ease-in-out">
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center text-6xl font-semibold select-none"
          >
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselSelector
