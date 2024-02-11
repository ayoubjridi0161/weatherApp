import { cn } from '@/utils/cn'
import React from 'react'



const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('bg-white w-full border rounded-xl flex shadow-sm py-4',props.className)} />
  )
}
export default Container