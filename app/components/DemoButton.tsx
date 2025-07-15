'use client'

import { Play } from 'lucide-react'

interface DemoButtonProps {
  onDemo: () => void
}

export default function DemoButton({ onDemo }: DemoButtonProps) {
  return (
    <button
      onClick={onDemo}
      className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
    >
      <Play size={16} />
      Try Demo
    </button>
  )
}