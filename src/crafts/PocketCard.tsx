import { cn } from '@/app/lib/utils'
import React from 'react'
import { GeistSans } from 'geist/font/sans'

const PocketCard = () => {
  return (
    <div className={cn(
      "w-72 min-h-[26rem] h-[26rem] rounded-xl",
      "shadow-[0_1px_1px_rgba(0,0,0,0.05), 0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
      "p-4 flex flex-col bg-red-500",
      GeistSans.className
    )}>
      <h2 className="text-2xl font-bold">Pocket Card</h2>
    
    </div>
  )
}

export default PocketCard