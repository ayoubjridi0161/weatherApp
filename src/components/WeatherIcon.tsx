import { cn } from '@/utils/cn'
import Image from 'next/image'
import React from 'react'

type Props = {
    icon: string | number
    imageAlt :  string
}

export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & Props) {
  return (
    <div {...props} className={cn('relative h-20 w-20 ',props.className)}>
      <Image src={`https://openweathermap.org/img/wn/${props.icon}@4x.png`} className='absolute h-full w-full' alt={props.imageAlt} width={100} height={100} />
    </div>
  )
}