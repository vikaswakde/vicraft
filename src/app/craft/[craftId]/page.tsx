'use client'

import { useParams } from 'next/navigation'
import FeedbackButton from '@/crafts/FeedbackButton'
import GooeyMenu from '@/crafts/GooeyMenu'
import RadialMenu from '@/crafts/RadialMenu'
// Import other craft components as needed

const crafts = {
  'feedback-button': FeedbackButton,
  'gooey-menu': GooeyMenu,
  'radial-menu': RadialMenu,
  // Add other crafts here
}

export default function CraftPage() {
  const params = useParams()
  const craftId = params.craftId as string

  const CraftComponent = crafts[craftId as keyof typeof crafts]

  if (!CraftComponent) {
    return <div>Craft not found</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <CraftComponent />
    </div>
  )
}